import { Elysia, t } from 'elysia'
import { authPlugin } from '../../../middleware/authPlugin'
import { db } from '../../../db/db'
import { nanoid } from 'nanoid'

export const createStudioVideo = new Elysia()
  .use(authPlugin) // Мидлварь, которая добавляет user в контекст
  .use(db)
  .post(
    '/',
    async ({ body, user, set , db}) => {
      try {
        if (!user) {
          set.status = 401
          return { message: 'Unauthorized' }
        }

       const userChannel = await db.channel.findFirst({
                    where: { ownerId: user.id } 
                })

                if (!userChannel) {
                    set.status = 404
                    return { message: 'Channel not found for this user' }
                }
   const publicId = nanoid(10)
        const video = await db.video.create({
          data: {
            title: body.title,
            description: body.description,
            thumbnailUrl: body.thumbnailUrl,
            videoFileName: body.videoFileName,
            maxResolution: body.maxResolution,
            tags: body.tags,
            publicId,
            channelId: userChannel.id, 
            isPublic: true, 
          },
        })

        set.status = 201
        return video
      } catch (error) {
        console.error('Create video error:', error)
        set.status = 500
        return { message: 'Failed to create video' }
      }
    },
    {
      body: t.Object({
        title: t.String({ minLength: 1 }),
        description: t.Optional(t.String()),
        thumbnailUrl: t.String(),
        videoFileName: t.String(),
        maxResolution: t.String(), 
        tags: t.Array(t.String()),
      }),
    }
  )