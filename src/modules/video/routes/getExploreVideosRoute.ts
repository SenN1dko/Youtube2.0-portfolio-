import { Elysia, t } from 'elysia'
import { getExploreVideos } from '../../../service/getExploreVideos.services'

export const getExploreVideoRoute = new Elysia()
    .get(
        '/explore',
        async ({ query }) => {
            const { page, limit, userId, excludeIds } = query

            const result = await getExploreVideos({
                page: page ? Number(page) : 1,
                limit: limit ? Number(limit) : 12,
                userId,
                excludeIdsString: excludeIds
            })

            return result
        },
        {
            query: t.Object({
                page: t.Optional(t.Numeric({ default: 1 })),
                limit: t.Optional(t.Numeric({ default: 12 })),
                userId: t.Optional(t.String()),
                excludeIds: t.Optional(t.String()) // Строка вида "id1,id2,id3"
            })
    }
)