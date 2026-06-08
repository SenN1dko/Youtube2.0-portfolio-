import {Elysia , t} from "elysia";
import { db } from "../../../db/db";
import { join } from "path";
export const fileRoute = new Elysia({prefix:'/media'})
.use(db)
.post('/' , async ({ body , query , set}) => {
    const file = body.file
    const folder = query.folder || 'uploads'

    if (!file) {
            set.status = 400
            return { message: "No file provided" }
    }

    const fileExtension = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExtension}`
    const uploadDir = join(process.cwd(), 'src' , 'modules', 'file', 'uploads', folder)
    const destinationPath = join(uploadDir, fileName)

    try {
        console.log('start rewrite' , destinationPath , file)
            await Bun.write(destinationPath, file)
            const publicUrl = `/uploads/${folder}/${fileName}`
            return [
                {
                    url: publicUrl,
                    name: fileName
                }
            ]
        } catch (error) {
            set.status = 500
            return { message: "Failed to save file on server" }
        }
} , {
    body: t.Object({
        file:t.File()    
    }),
    query:t.Object({
        folder:t.Optional(t.String())
    })
})