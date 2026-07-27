import Elysia from "elysia";
import { createStudioVideo } from "./routes/createStudioVideo";

export const studioRoute = new Elysia({prefix:'/studio/videos'})
.use(createStudioVideo)