import Elysia, { t } from 'elysia'


import { db } from '../../../db/db'
import { authPlugin } from '../../../middleware/authPlugin'
import { getStudioVideoById } from '../../../service/getStudioVideoById'

export const getById = new Elysia()
    .use(db)
    .use(authPlugin)
    .get(
        '/:id',
        async ({ params: { id }, user, set }) => {
            try {
                const result = await getStudioVideoById({
                    id,
                    userId: user?.id
                })

                set.status = result.status
                return result.data
            } catch (error) {
                console.error('Get studio video by id error:', error)
                set.status = 500
                return { message: 'Failed to fetch video details' }
            }
        },
        {
            params: t.Object({
                id: t.String()
            })
        }
    )