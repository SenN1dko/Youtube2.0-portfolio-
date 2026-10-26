import { Elysia} from "elysia";
import { getPlaylistById } from "./routes/getPLaylistById";
import { getUserPlaylists } from "./routes/getUserPLaylists";
import { togglePlaylistInVideo } from "./routes/togglePlaylistInVideo";
import { createPlaylist } from "./routes/createPlaylist";

export const playlistRoute = new Elysia({prefix:'/playlists'})
.use(getPlaylistById)
.use(getUserPlaylists)
.use(togglePlaylistInVideo)
.use(createPlaylist)     