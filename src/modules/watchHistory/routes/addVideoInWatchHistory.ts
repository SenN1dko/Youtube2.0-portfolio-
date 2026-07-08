import Elysia, { t } from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";

export const addWatchHistory = new Elysia()
.use(db)
.use(authPlugin)
 .post('/', async ({ db, user, body, set }) => {
        if (!user || !user.id) {
          set.status = 401;
          return { message: "Unauthorized" };
        }

        const { videoId } = body;

        try {
          const videoExists = await db.video.findUnique({ where: { id: videoId } });
          if (!videoExists) {
            set.status = 404;
            return { message: "Video not found" };
          }

          const existingRecord = await db.watchHistory.findFirst({
            where: { userId: user.id, videoId }
          });

          if (existingRecord) {
            await db.watchHistory.update({
              where: { id: existingRecord.id },
              data: { createdAt: new Date() }
            });
            return { success: true, message: "History updated" };
          }

          await db.watchHistory.create({
            data: {
              userId: user.id,
              videoId: videoId
            }
          });

          set.status = 201;
          return { success: true, message: "Added to history" };

        } catch (error) {
          console.error("Watch history add error:", error);
          set.status = 500;
          return { message: "Internal server error" };
        }
      }, {
        body: t.Object({
          videoId: t.String()
        })
      })
