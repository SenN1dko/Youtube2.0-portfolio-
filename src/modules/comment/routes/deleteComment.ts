import { Elysia, t } from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";


export const deleteComment = new Elysia()
  .use(db)
  .use(authPlugin)
  .delete('/:id', async ({ db, user, params, set }) => {
    
    if (!user || !user.id) {
      set.status = 401;
      return false; 
    }

    const commentId = params.id.trim();

    try {
      const comment = await db.comment.findUnique({
        where: { id: commentId }
      });
      if (!comment) {
        set.status = 404;
        return false;
      }

      if (comment.userId !== user.id) {
        set.status = 403; 
        return false;
      }

      await db.comment.delete({
        where: { id: commentId }
      });

      set.status = 200;
      return true; 

    } catch (error) {
      console.error("Delete comment error:", error);
      set.status = 500;
      return false;
    }
  }, {
    params: t.Object({
      id: t.String()
    })
  });