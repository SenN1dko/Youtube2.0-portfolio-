import Elysia, { t } from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";

   
   export const createPlaylist = new Elysia()
   .use(db) 
   .use(authPlugin)
.post('/', async ({ db, user, body, set }) => {
  if (!user || !user.id) {
    set.status = 401;
    return { message: "Unauthorized" };
  }

  const { title, videoPublicId } = body;

  try {
    let videoIdToConnect: string | undefined = undefined;

    if (videoPublicId) {
      const video = await db.video.findFirst({
        where: {
          OR: [
            { publicId: videoPublicId },
            { id: videoPublicId }
          ]
        }
      });

      if (video) {
        videoIdToConnect = video.id;
      }
    }

    // 1. Создаем плейлист
    const createdPlaylist = await db.playlist.create({
      data: {
        name: title,
        userId: user.id,
        videos: videoIdToConnect 
          ? { 
              connect: { id: videoIdToConnect } 
            } 
          : undefined
      }
    });

    const finalPlaylist = await db.playlist.findUnique({
      where: { id: createdPlaylist.id },
      include: {
        videos: true 
      }
    });

    set.status = 201;
    return finalPlaylist;

  } catch (error) {
    console.error("ОШИБКА ПРИ СОЗДАНИИ ПЛЕЙЛИСТА:", error);
    set.status = 500;
    return { success: false, message: "Internal server error" };
  }
}, {
  body: t.Object({
    title: t.String(),
    videoPublicId: t.Optional(t.String())
  })
})