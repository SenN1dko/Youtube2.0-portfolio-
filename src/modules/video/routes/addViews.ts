import Elysia, { t } from "elysia";
import { db } from "../../../db/db";

export const addViews = new Elysia()
  .use(db)
  .put('/update-views-count/:publicId', async ({ db, params: { publicId }, set }) => {
    try {
      await db.video.update({
        where: { publicId: publicId },
        data: {
          views: {
            increment: 1 
          }
        }
      });

      set.status = 200;
      return { success: true, message: "Views count updated" };

    } catch (error: any) {
      if (error.code === 'P2025') {
        set.status = 404;
        return { success: false, message: "Video not found" };
      }

      console.error("Update views error:", error);
      set.status = 500;
      return { success: false, message: "Internal server error" };
    }
  }, {
    params: t.Object({
      publicId: t.String()
    })
  });