import Elysia, { t } from "elysia";
import { db } from "../../../db/db";

   
   export const getPlaylistById = new Elysia()
   .use(db) 
   
   .get('/:playlistId', async ({ db, params: { playlistId }, set }) => {
        const playlist = await db.playlist.findUnique({
          where: { id: playlistId },
          include: {
            videos: true,
            user: {
              select: {
                username: true
              }
            }
          }
        });

        if (!playlist) {
          set.status = 404;
          return { message: "Playlist not found" };
        }

        return playlist;
      }, {
        params: t.Object({
          playlistId: t.String()
        })
      })
