import Elysia, { t } from "elysia";
import { db } from "../../../db/db";

export const getCommentByVideoId = new Elysia()
.use(db)

.get('by-video/:publicId' , async({db , set , params:{publicId}}) => {
const existVideo = await db.video.findUnique({
    where:{publicId:publicId}
})

if(!existVideo){
    set.status = 404
    return{
        message:'video not found'
    }
}


try{

    const comments = await db.comment.findMany({
        where:{videoId:existVideo.id},
        orderBy:{createdAt:'desc'},
        select:{
            createdAt:true,
            id:true,
            videoId:true,
            text:true,
            user:{
                select:{
                    username:true,
                    id:true,
                    
                    channel:{
                        select:{
                            slug:true,
                            avatar:true
                        }
                    }
                }
            }
        }
    })
    return{
        comments
    }
}catch (error) {
      console.error("Create comment error:", error);
      set.status = 500;
      return { message: "Internal server error" };
    }

} , {
    params:t.Object({
        publicId:t.String()
    })
})