import {Elysia, t} from "elysia";
import "dotenv/config";
import { authPlugin } from "../../middleware/authPlugin";
import { db } from "../../db/db";
import staticPlugin from "@elysiajs/static";
export const userRoute = new Elysia({prefix:'/user'})
.use(authPlugin)
.use(db)
.get('/profile' , async({user , db , set}) =>{
if(!user){
    set.status = 401
    return{
        message:'You are not authorized'
    }
}
const fullUserProfile = db.user.findUnique({
    where:{id:user.id},
    select:{
        id:true,
        username:true,
        email:true, 
        channels:true
    }
})
if(!fullUserProfile) {
    set.status = 404
    return {
        message:'User not found'
    }
}
return fullUserProfile
} )
 .use(staticPlugin({ assets: 'public', prefix: '/public' })) 
    .post('/change-avatar' , async({ db, body }) => {
        const { cover, channelId } = body

        const fileName = `${Date.now()}-${cover.name}`
        const filePath = `./public/avatars/${fileName}`

        await Bun.write(filePath, cover)

        const fileUrl = `http://localhost:3001/public/avatars/${fileName}`

       const channel =  await db.channel.update({
            where: { id: channelId },
            data: {
                avatar: fileUrl 
            }
        })

                return { success: true, channel:channel  }
    }, {
        body: t.Object({
            channelId: t.String(),
            cover: t.File()
        })
    })