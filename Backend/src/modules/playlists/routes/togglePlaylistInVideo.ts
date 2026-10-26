import Elysia, { t } from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";

export const togglePlaylistInVideo = new Elysia()
  .use(db) 
  .use(authPlugin) 
  .post('/:playlistId/toggle-video', async ({ db, params: { playlistId }, body, set }) => {
    const { videoId } = body; 
    try {
      // 1. Ищем плейлист и проверяем, связано ли с ним это видео
      const playlist = await db.playlist.findUnique({
        where: { id: playlistId },
        include: {
          // Подгружаем только то видео, которое мы хотим переключить
          videos: {
            where: { id: videoId }
          }
        }
      });
      
      console.log('playlistId from frontend',playlistId)
      console.log('playlistId from backend',playlist?.id)

      if (!playlist) {
        set.status = 404;
        return { success: false, message: "Playlist not found" };
      }

      // 2. Если массив videos не пустой, значит видео уже привязано к плейлисту
      const isVideoInPlaylist = playlist.videos.length > 0;

      if (isVideoInPlaylist) {
        // УДАЛЯЕМ связь (Disconnect)
        await db.playlist.update({
          where: { id: playlistId },
          data: {
            videos: {
              disconnect: { id: videoId } // Разрываем связь Many-to-Many
            }
          }
        });
        return { success: true, message: "Video removed from playlist" };
      }

      // ДОБАВЛЯЕМ связь (Connect)
      await db.playlist.update({
        where: { id: playlistId },
        data: {
          videos: {
            connect: { id: videoId } // Создаем связь Many-to-Many
          }
        }
      });

      return { success: true, message: "Video added to playlist" };

    } catch (error) {
      console.error("Playlist toggle video error:", error);
      set.status = 500;
      return { message: "Internal server error" };
    }
  }, {
    params: t.Object({
      playlistId: t.String()
    }),
    body: t.Object({
      videoId: t.String(),
    })
  });