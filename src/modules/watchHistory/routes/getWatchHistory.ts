import Elysia from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";

export const getWatchHistory = new Elysia()
.use(db)
.use(authPlugin)
.get('/', async ({ db, user, set }) => {
        if (!user || !user.id) {
          set.status = 401;
          return { message: "Unauthorized" };
        }

        const history = await db.watchHistory.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' }, 
          include: {
            video: true 
          }
        });

        return history.map(item => ({
          video: item.video
        }));
      })