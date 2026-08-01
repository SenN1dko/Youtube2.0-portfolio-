import Elysia from "elysia";
import { createStudioVideo } from "./routes/createStudioVideo";
import { getAllVideos } from "./routes/getAll";
import { deleteVideo } from "./routes/deleteVideo";

export const studioRoute = new Elysia({prefix:'/studio/videos'})
.use(createStudioVideo)
.use(getAllVideos)
.use(deleteVideo)