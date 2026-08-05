import { videoService } from '@/services/video.services'
import type { MetadataRoute } from 'next'

const URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const {data} = await videoService.getAll()

    const videoEntries: MetadataRoute.Sitemap = data.map(video => ({
        url: `${URL}/v/${video.id}`, // или свой путь к видео
        lastModified: new Date(), // или video.createdAt
        changeFrequency: 'daily',
        priority: 0.8,
    }))

    return [
        {
            url: URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        ...videoEntries,
    ]
}