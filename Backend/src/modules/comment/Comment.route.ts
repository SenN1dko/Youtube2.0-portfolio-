import Elysia from "elysia";
import { updateComment } from "./routes/updateComment";
import { createComment } from "./routes/createComment";
import { getCommentByVideoId } from "./routes/getCommentByVideoId";
import { deleteComment } from "./routes/deleteComment";

export const CommentRoutes = new Elysia({prefix:'/comment'})
.use(updateComment)
.use(createComment)
.use(getCommentByVideoId)
.use(deleteComment)