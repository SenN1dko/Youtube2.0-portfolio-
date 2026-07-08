import Elysia from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";

export const deleteWatchHistory = new Elysia()
.use(db)
.use(authPlugin)
.delete('/', async ({ db, user, set }) => {
        if (!user || !user.id) {
          set.status = 401;
          return { message: "Unauthorized" };
        }

        try {
          await db.watchHistory.deleteMany({
            where: { userId: user.id }
          });

          return { success: true, message: "Watch history cleared" };
        } catch (error) {
          console.error("Watch history clear error:", error);
          set.status = 500;
          return { message: "Internal server error" };
        }
      })