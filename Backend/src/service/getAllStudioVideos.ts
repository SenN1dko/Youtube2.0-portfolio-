import { prisma } from "../lib/prisma"

export async function getAllStudioVideos({
    page = 1,
    limit = 8,
    user
}: {
    user: {
        id: string
    } | null
    page?: number
    limit?: number
}) {
    // 1. Если пользователя нет, сразу возвращаем пустой результат
    if (!user?.id) {
        return { videos: [], page: 1, totalPages: 0 }
    }

    const userChannel = await prisma.channel.findUnique({
        where: {
            ownerId: user.id
        }
    })

    // Если у юзера нет канала, тоже возвращаем пустой результат
    if (!userChannel) {
        return { videos: [], page: 1, totalPages: 0 }
    }

    const whereCondition = {
        channelId: userChannel.id,
    }

    const totalVideosCount = await prisma.video.count({
        where: whereCondition
    })

    const skip = (page - 1) * limit

    const videos = await prisma.video.findMany({
        where: whereCondition,
        skip: skip,
        take: limit,
        orderBy: [
            { createdAt: 'desc' }
        ],
        include: {
            comments:true,
            likes:true,
            channel: {
                select: {
                    id: true,
                    slug: true,
                    avatar: true,
                    owner: {
                        select: {
                            username: true
                        }
                    }
                }
            },
            game: true
        }
    })

    const totalPages = Math.ceil(totalVideosCount / limit)

    return {
        videos,
        page,
        totalPages
    }
}