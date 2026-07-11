import Elysia from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";

export const getUserPlaylists = new Elysia()
.use(db) 
.use(authPlugin) 

.get('/', async ({ db, user, set }) => {
  if (!user || !user.id) {
    set.status = 401;
    return { message: "Unauthorized" };
  }

  const playlists = await db.playlist.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      videos: true // Вытаскивает чистый массив объектов Video[]
    }
  });

  return playlists;
})