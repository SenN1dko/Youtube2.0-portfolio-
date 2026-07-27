import { prisma } from "../lib/prisma"

export async function getExploreVideos({
    page = 1,
    limit = 10,
    userId,
    excludeIdsString
}: {
    page?: number
    limit?: number
    userId?: string
    excludeIdsString?: string
}) {
    const excludeIds = excludeIdsString
        ? excludeIdsString.split(',').filter(Boolean)
        : []

    const whereCondition: any = {
        isPublic: true,
    }

    if (excludeIds.length > 0) {
        whereCondition.id = {
            notIn: excludeIds
        }
    }

    // 1. Считаем, сколько ОСТАЛОСЬ непросчитанных видео в базе
    const remainingVideosCount = await prisma.video.count({
        where: whereCondition
    })

    // 2. ВАЖНО: Если мы используем excludeIds, skip ВСЕГДА 0! 
    // Если excludeIds пустой, используем классический (page - 1) * limit
    const skip = excludeIds.length > 0 ? 0 : (page - 1) * limit

    const videos = await prisma.video.findMany({
        where: whereCondition,
        take: limit,
        skip: skip, // <-- Теперь здесь 0 при бесконечной пагинации!
        orderBy: [
            { views: 'desc' },
            { createdAt: 'desc' }
        ],
        include: {
            channel: {
                select: {
                    id: true,
                    slug: true,
                    avatar: true,
                    owner:{
                        select:{
                            username:true
                        }
                    }
                }
            },
            game: true
        }
    })

    // 3. Расчёт totalPages с учётом остатка
    // Если остались видео, отдаем запас страниц, иначе текущая страница — последняя
    const totalPages = page + Math.ceil((remainingVideosCount - videos.length) / limit)

    return {
        videos,
        page,
        totalPages
    }
}