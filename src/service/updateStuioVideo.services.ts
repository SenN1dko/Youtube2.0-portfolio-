import { prisma } from "../lib/prisma"

import type { UpdateVideoDto } from '../schema/updateVideoSchema'
export async function updateStudioVideoService({
    id,
    dto,
    userId
}: {
    id: string
    dto: UpdateVideoDto
    userId?: string
}) {
    if (!userId) {
        return { status: 401, data: { message: 'Unauthorized' } }
    }

    // 1. Ищем видео и проверяем владельца
    const existVideo = await prisma.video.findUnique({
        where: { id },
        select: {
            id: true,
            channel: {
                select: { ownerId: true }
            }
        }
    })

    if (!existVideo) {
        return { status: 404, data: { message: 'Video not found' } }
    }

    // 2. Проверяем, принадлежит ли канал текущему юзеру
    if (existVideo.channel?.ownerId !== userId) {
        return { status: 403, data: { message: 'You do not have permission to edit this video' } }
    }

    // 3. Обновляем данные
    const updatedVideo = await prisma.video.update({
        where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.thumbnailUrl && { thumbnailUrl: dto.thumbnailUrl }),
        ...(dto.videoFileName && { videoFileName: dto.videoFileName }), // Заменили videoPath на videoFileName
        ...(dto.maxResolution && { maxResolution: dto.maxResolution }),
        ...(dto.tags && { tags: dto.tags }),
    },
        include: {
            channel: {
                select: {
                    id: true,
                    slug: true,
                    avatar: true
                }
            },
        }
    })

    return { status: 200, data: updatedVideo }
}