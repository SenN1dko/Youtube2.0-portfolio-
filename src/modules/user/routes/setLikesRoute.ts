import { Elysia, t } from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";

export const toggleLike = new Elysia()
  .use(authPlugin)
  .use(db)
  .patch('/profile/likes', async ({ set, db, user, body }) => {
    if (!user || !user.id) {
      set.status = 401;
      return { message: "Unauthorized" };
    }

    const { videoId } = body;
    console.log("Video ID:", videoId);

    try {
      const video = await db.video.findUnique({
        where: { id: videoId }
      });

      if (!video) {
        set.status = 404;
        return { message: 'Video not found!' };
      }

      const existingLike = await db.like.findUnique({
        where: {
          userId_videoId: {
            userId: user.id,
            videoId: videoId
          }
        }
      });

      if (existingLike) {
        await db.like.delete({
          where: { id: existingLike.id }
        });
        return { message: 'unLiked' };
      } else {
        await db.like.create({
          data: {
            userId: user.id,
            videoId: videoId
          }
        });
        return { message: 'liked' };
      }

    } catch (error) {
      console.error("Like toggle error:", error);
      set.status = 500;
      return { message: 'Internal server error' };
    }
  }, {
    body: t.Object({
      videoId: t.String()
    })
  });