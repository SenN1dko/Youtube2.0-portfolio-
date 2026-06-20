import Elysia, { t } from "elysia";
import { db } from "../../../db/db";

export const getVideoById = new Elysia()
.use(db)
.post('by-publicId/:publicId' , async({db , set ,params:{publicId} }) => {

try{
const videoById = await db.video.findUnique({
    where:{publicId},
    include:{
        likes:true,
        channel:{
            include:{
                subscriptions:true,
                owner:true
            }
        } 
    }
})
const similarVideos = await db.video.findMany({
    where:{
        channelId:videoById?.channelId
    },
    include:{
        channel:{
            include:{
                owner:true
            }
        }
    }
})
if(!videoById){
    set.status = 404
    return{
        message:'Video not found'
    }
}
return {
    ...videoById,
    similarVideos
}
}catch{

}

} , {
    params:t.Object({
        publicId:t.String()
    })
})
