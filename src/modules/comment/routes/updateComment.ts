import { Elysia, t } from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";
export const updateComment = new Elysia()
  .use(db)
  .use(authPlugin)
  .put('/:id', async ({ db, user, params, body, set }) => {
    
    if (!user || !user.id) {
      set.status = 401;
      return false;
    }

    const commentId = params.id.trim();
    const { text, videoId } = body;

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
   
      await db.comment.update({
        where: { id: commentId },
        data: { text } 
      });

      set.status = 200;
      return true;

    } catch (error) {
      console.error("Update comment error:", error);
      set.status = 500;
      return false;
    }
  }, {
    params: t.Object({
      id: t.String()
    }),
    body: t.Object({
      text: t.String({ minLength: 1, error: "Comment text cannot be empty" }),
      videoId: t.String() 
    })
  });