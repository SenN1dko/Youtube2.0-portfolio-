import Elysia from "elysia";
import { createStudioVideo } from "./routes/createStudioVideo";
import { getAllVideos } from "./routes/getAll";
import { deleteVideo } from "./routes/deleteVideo";
import { updateStudioVideo } from "./routes/updateStudioVideo";
import { getById } from "./routes/getById";

export const studioRoute = new Elysia({prefix:'/studio/videos'})
.use(createStudioVideo)
.use(getAllVideos)
.use(deleteVideo)
.use(updateStudioVideo)
.use(getById)