import {Elysia , t} from "elysia";
import { db } from "../../db/db";
import { getChannelBySlug } from "./routes/getChannelBySlugRoute";
import { getAll } from "./routes/getAllRoute";
import { toggleSubscribe } from "./routes/toggleSubscribeRoute";

export const ChannelRoute = new Elysia({prefix:'/channels'})
.use(db)
.use(getChannelBySlug)
.use(getAll)
.use(toggleSubscribe)
