import Elysia from 'elysia'

    
import { updateVideoSchema } from '../../../schema/updateVideoSchema'
import {  updateStudioVideoService } from '../../../service/updateStuioVideo.services'
import { authPlugin } from '../../../middleware/authPlugin'
import { db } from '../../../db/db'

export const updateStudioVideo = new Elysia()
    .use(db)
    .use(authPlugin)
    .put(
        '/:id',
        async ({ params: { id }, body, user, set }) => {
            try {
                const result = await updateStudioVideoService({
                    id,
                    dto: body,
                    userId: user?.id
                })

                set.status = result.status
                return result.data
            } catch (error) {
                console.error('Update video error:', error)
                set.status = 500
                return { message: 'Failed to update video' }
            }
        },
        updateVideoSchema
    )