import { prisma } from "../lib/prisma"

export async function getStudioVideoById({
    id,
    userId
}: {
    id: string
    userId?: string
}) {
    if (!userId) {
        return { status: 401, data: { message: 'Unauthorized' } }
    }

    // 1. Ищем видео со всеми вложенными данными
    const video = await prisma.video.findUnique({
        where: { id },
        include: {
            channel: {
                select: {
                    id: true,
                    slug: true,
                    avatar: true,
                    ownerId: true
                }
            },
            comments: true,
            likes: true
        }
    })

    if (!video) {
        return { status: 404, data: { message: 'Video not found' } }
    }

    // 2. ПРОВЕРКА ПРАВ: проверяем, что видео принадлежит каналу текущего пользователя
    if (video.channel?.ownerId !== userId) {
        return { status: 403, data: { message: 'You do not have access to this video' } }
    }

    return { status: 200, data: video }
}