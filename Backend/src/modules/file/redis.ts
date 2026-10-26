    import Redis from 'ioredis'

    // Подключаемся к Redis
   export const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null, // ВАЖНО для BullMQ: иначе Worker/Queue будут падать на реконнектах
    retryStrategy: times => Math.min(times * 200, 5000),
})

redis.on('error', err => {
    console.error('[redis] connection error:', err.message)
})
    // Хелперы для работы с прогрессом
    export const progressStorage = {
        // Сохраняем прогресс. expireIn: 3600 означает, что через 1 час данные сами удалятся из Redis
        set: async (fileId: string, progress: number, expireIn = 3600) => {
            await redis.set(`upload:progress:${fileId}`, progress, 'EX', expireIn)
        },
        
        get: async (fileId: string): Promise<number | null> => {
            const res = await redis.get(`upload:progress:${fileId}`)
            return res !== null ? Number(res) : null
        },

        delete: async (fileId: string) => {
            await redis.del(`upload:progress:${fileId}`)
        }
    }