import { Elysia, t } from 'elysia'
import { staticPlugin } from '@elysiajs/static' 
import { db } from '../../db/db'
export const videoUpload = new Elysia()
.use(db)
    .use(staticPlugin({ assets: 'public', prefix: '/public' })) 
    .post('/video/upload-cover', async ({ db, body }) => {
        const file = body.cover 
        const videoId = body.videoId

        const fileName = `${Date.now()}-${file.name}`
        const filePath = `./public/thumbnails/${fileName}`

        await Bun.write(filePath, file)

        const imageUrl = `http://localhost:3001/public/thumbnails/${fileName}`

        const updatedVideo = await db.video.update({
            where: { id: videoId },
            data: {
                thumbnailUrl: imageUrl 
            }
        })

        return { success: true, video: updatedVideo }
    }, {
        body: t.Object({
            videoId: t.String(),
            cover: t.File() 
        })
    })
