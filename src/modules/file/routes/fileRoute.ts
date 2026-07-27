import { Elysia, t } from 'elysia'
import { join, extname } from 'path'
import { mkdirSync } from 'fs'
import { progressStorage } from '../redis'

import { ALLOWED_FOLDERS, ALLOWED_FILE_EXTENSIONS, MAX_FILE_SIZE, type AllowedFolder } from '../file.constants'
import { videoQueue } from '../video.queue'
import { probeVideo } from '../video.processor'

function isAllowedFolder(folder: string): folder is AllowedFolder {
    return (ALLOWED_FOLDERS as readonly string[]).includes(folder)
}

export const fileRoute = new Elysia({ prefix: '/upload-file' })

    .post(
        '/',
        async ({ body, query, set }) => {
            const file = body.file
            const folder = query.folder || 'videos'

            if (!file) {
                set.status = 400
                return { message: 'No file provided' }
            }
            if (!isAllowedFolder(folder)) {
                set.status = 400
                return { message: 'Invalid folder' }
            }
            if (file.size > MAX_FILE_SIZE) {
                set.status = 400
                return { message: 'File too large' }
            }

            const rawExt = extname(file.name).slice(1).toLowerCase()
            if (!ALLOWED_FILE_EXTENSIONS.includes(rawExt)) {
                set.status = 400
                return { message: 'Unsupported file type' }
            }


const fileId = `${crypto.randomUUID()}.${rawExt}`
const uploadDir = join(process.cwd(), 'src', 'modules', 'file', 'uploads', folder)

// 1. Создаем папку (только uploadDir)
mkdirSync(uploadDir, { recursive: true })

const destinationPath = join(uploadDir, fileId)

try {
    await Bun.write(destinationPath, file)

    let maxResolution: string | undefined
    try {
        const probe = await probeVideo(destinationPath)
        maxResolution = probe.maxQuality
    } catch {
        // не блокируем
    }

    await progressStorage.set(fileId, 0)

    await videoQueue.add('process', {
        fileId,
        inputPath: destinationPath,
        outputDir: uploadDir, 
    })

    return [
        {
            url: `/uploads/${folder}/${fileId}`,
            name: fileId,
            maxResolution,
        },
    ]
} catch (error) {
    set.status = 500
    return { message: 'Failed to save file on server' }
}
        },
        {
            body: t.Object({ file: t.File() }),
            query: t.Object({ folder: t.Optional(t.String()) }),
        }
    )

    .get('/status/:fileName', async ({ params: { fileName }, set }) => {
        if (!fileName || fileName === 'undefined') return 0

        const progress = await progressStorage.get(fileName)

        if (progress === null) return 100 // джоба отсутствует = либо давно готова, либо ещё не стартовала

        const value = Number(progress)

        if (value === -1) {
            set.status = 500
            return -1 // фронту нужно научиться обрабатывать это как ошибку, см. ниже
        }

        if (value >= 100) {
            await progressStorage.delete(fileName)
            return 100
        }

        return value
    })