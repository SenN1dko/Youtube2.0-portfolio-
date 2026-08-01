import Elysia, { t } from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";

export const deleteVideo = new Elysia()
    .use(db)
    .use(authPlugin) // 1. Требуем авторизацию
    .delete(
        '/:id',
        async ({ db, params: { id }, user, set }) => {
            // 2. Проверяем, авторизован ли пользователь
            if (!user) {
                set.status = 401
                return { message: 'Unauthorized' }
            }

            try {
                // 3. Ищем видео и проверяем, принадлежит ли оно каналу текущего пользователя
                const existVideo = await db.video.findUnique({
                    where: { id },
                    select: {
                        id: true,
                        channel: {
                            select: { ownerId: true } // Или userId, смотря как устроена Prisma
                        }
                    }
                })

                if (!existVideo) {
                    set.status = 404
                    return { message: 'Video not found' }
                }

                // 4. ПРОВЕРКА ПРАВ ВЛАДЕНИЯ:
                if (existVideo.channel?.ownerId !== user.id) {
                    set.status = 403
                    return { message: 'You do not have permission to delete this video' }
                }

                // 5. Удаляем видео
                await db.video.delete({
                    where: { id }
                })

                return { message: 'Video deleted successfully' }

            } catch (error) {
                console.error('Delete video error:', error)
                set.status = 500
                return { message: 'Failed to delete video' }
            }
        },
        {
            params: t.Object({
                id: t.String()
            })
        }
    )