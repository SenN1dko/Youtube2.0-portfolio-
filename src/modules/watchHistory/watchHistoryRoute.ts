import { Elysia } from "elysia";
import { deleteWatchHistory } from "./routes/deleteWatchHistory";
import { getWatchHistory } from "./routes/getWatchHistory";
import { addWatchHistory } from "./routes/addVideoInWatchHistory";
export const watchHistoryRoute = new Elysia({prefix:'/watch-history'})
.use(deleteWatchHistory)
.use(getWatchHistory)
.use(addWatchHistory)