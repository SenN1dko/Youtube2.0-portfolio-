import Elysia, { t } from "elysia";
import { db } from "../../../db/db";
import { join } from "path";
import { nanoid } from "nanoid";
import { getMaxResolution } from "../../../utils/getMaxResolution";

export const videoCreateRoute = new Elysia()
.use(db)
.post('/createVideo' , async({db , body ,set }) => {
const {title , thumbnail , channelId} = body

   if (!thumbnail) {
            set.status = 400
            return { message: "No file provided" }
    }

    const fileExtension = thumbnail.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExtension}`
    const videoFileName = "temporary_placeholder2.mp4"
    const uploadDir = join(process.cwd(), 'src' , 'modules', 'file', 'uploads', 'thumbnails')
    const destinationPath = join(uploadDir, fileName)
    const availableResolution = getMaxResolution(videoFileName).maxRes
    console.log(availableResolution)
    try{
        Bun.write(destinationPath , thumbnail)
        const thumbnailUrl = `/uploads/thumbnails/${fileName}`
        const publicId = nanoid(10)
        const newVideo = await db.video.create({
            data:{
                title,
                channelId,
                publicId,
                thumbnailUrl,
                maxResolution:availableResolution,
                videoFileName:videoFileName
            }
        })
        return {
                success: true,
                message: "Video placeholder created successfully",
                video: newVideo
            }
    }catch(error) {
            console.error("Ошибка при создании видео:", error)
            set.status = 500
            return { message: "Internal server error" }
        }


} ,{ 
    body:t.Object({
        title:t.String(),
        thumbnail:t.File(),
        channelId:t.String()
    })
})