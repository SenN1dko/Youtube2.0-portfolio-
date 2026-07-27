import { join } from 'path'
import { mkdirSync } from 'fs'
import { resolveMaxQuality, QUALITY_LADDER } from './file.constants'

export async function probeVideo(inputPath: string) {
    const proc = Bun.spawn([
        'ffprobe', '-v', 'error',
        '-select_streams', 'v:0',
        '-show_entries', 'stream=height:format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=0',
        inputPath,
    ])
    const out = await new Response(proc.stdout).text()
    const exitCode = await proc.exited
    if (exitCode !== 0) throw new Error('ffprobe failed')

    const height = Number(out.match(/height=(\d+)/)?.[1]) || 0
    const duration = parseFloat(out.match(/duration=([\d.]+)/)?.[1] || '0') || 1

    return { height, duration, maxQuality: resolveMaxQuality(height) }
}

export async function processVideo(
    fileId: string,
    inputPath: string,
    outputDir: string,
    onProgress: (percent: number) => Promise<void>
) {
    // 1. Узнаем параметры исходного видео
    const { height: sourceHeight, duration: totalDuration } = await probeVideo(inputPath)

    // 2. Отбираем только те качества, которые НЕ превосходят оригинал
    // (например, если исходник 720p, мы делаем 720p, 480p, 360p, но НЕ 1080p)
    const targetQualities = QUALITY_LADDER.filter(q => sourceHeight >= q.height)
    
    // Если видео сосем маленькое (например, 240p), делаем хотя бы минимальное доступное качество
    if (targetQualities.length === 0) {
        targetQualities.push(QUALITY_LADDER[QUALITY_LADDER.length - 1])
    }

    const totalSteps = targetQualities.length

    // 3. Перебираем каждое качество по очереди
    for (let i = 0; i < totalSteps; i++) {
        const quality = targetQualities[i]
        
        // Папка для конкретного качества, например: uploads/videos/Q720 или uploads/videos/720p
        const targetDir = join(outputDir, quality.label)
        mkdirSync(targetDir, { recursive: true })

        const outputPath = join(targetDir, fileId)

        // Запускаем FFmpeg с масштабированием по высоте (-vf scale=-2:HEIGHT)
        // -2 автоматически высчитывает ширину с сохранением пропорций и кратностью 2 (требование H.264)
        const ffmpeg = Bun.spawn(
            [
                'ffmpeg', '-y',
                '-i', inputPath,
                '-vf', `scale=-2:${quality.height}`,
                '-vcodec', 'libx264',
                '-crf', '23',
                '-preset', 'veryfast',
                '-acodec', 'aac',
                '-movflags', '+faststart',
                '-progress', 'pipe:1',
                outputPath,
            ],
            {
                stderr: 'ignore',
                env: { ...process.env, FFREPORT: 'file=/dev/null:level=32' },
            }
        )

        const reader = ffmpeg.stdout.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })

            const lines = buffer.split(/\r?\n|\r/)
            buffer = lines.pop() || ''

            for (const raw of lines) {
                const line = raw.trim()
                if (line.startsWith('out_time_ms=')) {
                    const microseconds = parseInt(line.split('=')[1])
                    if (!isNaN(microseconds) && microseconds > 0) {
                        const currentSeconds = microseconds / 1_000_000
                        const currentVideoPercent = Math.min(currentSeconds / totalDuration, 1)
                        
                        // Вычисляем ОБЩИЙ прогресс по всем качествам:
                        // (завершенные шаги + прогресс текущего шага) / всего шагов * 100
                        const overallPercent = Math.round(
                            ((i + currentVideoPercent) / totalSteps) * 100
                        )
                        
                        await onProgress(Math.min(overallPercent, 99))
                    }
                }
            }
        }

        const exitCode = await ffmpeg.exited
        if (exitCode !== 0) {
            throw new Error(`ffmpeg exited with code ${exitCode} while encoding ${quality.label}`)
        }
    }

    // Все качества готовы — ставим честные 100%
    await onProgress(100)
}