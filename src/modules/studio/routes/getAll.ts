import Elysia, { t } from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";
import { getAllStudioVideos } from "../../../service/getAllStudioVideos";

export const getAllVideos = new Elysia()
.use(db)
.use(authPlugin)
    .get(
        '/',
        async ({ query , user }) => {
            const { page, limit } = query

            const result = await getAllStudioVideos({
                page: page ? Number(page) : 1,
                limit: limit ? Number(limit) : 12,
                user,
            })

            return result
        },
        {
            query: t.Object({
                page: t.Optional(t.Numeric({ default: 1 })),
                limit: t.Optional(t.Numeric({ default: 12 })),
            })
    }
)