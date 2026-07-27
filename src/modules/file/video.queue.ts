import { Queue, Worker } from 'bullmq'
import { dirname } from 'path' // <-- Добавь импорт dirname
import { progressStorage } from './redis'
import { processVideo } from './video.processor'

const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
}

export const videoQueue = new Queue('video-processing', {
    connection,
    defaultJobOptions: {
        attempts: 1,
        removeOnComplete: { age: 3600 },
        removeOnFail: { age: 86400 },
    },
})

export const videoWorker = new Worker(
    'video-processing',
    async job => {
        // Если outputDir не пришел — беру папку файла из inputPath!
        const { fileId, inputPath, outputDir = dirname(inputPath) } = job.data

        await processVideo(fileId, inputPath, outputDir, async percent => {
            await progressStorage.set(fileId, percent)
        })
    },
    { connection, concurrency: 2 }
)

videoWorker.on('failed', async (job, err) => {
    if (job) {
        await progressStorage.set(job.data.fileId, -1)
        console.error(`[video-processing] job ${job.id} failed:`, err.message)
    }
})