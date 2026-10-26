import Elysia, { t } from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";

export const createComment = new Elysia()
.use(db)
.use(authPlugin)
.post('/' , async({db , user  ,set,  body}) => {
if (!user || !user.id) {
      set.status = 401;
      return { message: "Unauthorized. Please log in to comment." };
    }

    const { text, videoId } = body;

    try{

        const videoExist = await db.video.findUnique({
            where:{publicId:videoId}
        })
        if(!videoExist){
            set.status = 404
            return{
                message:'video not found'
            }
        }
        const newComment = await db.comment.create({
            data:{
                text:text,
                videoId:videoExist.id,
                userId:user.id
            },
            include:{
                user:{
                    select:{
                        id:true,
                        username:true,
                        avatar:true
                    }
                }
            }
        })
        set.status = 201;
      return {
        comment:newComment
      };
    }catch (error) {
      console.error("Create comment error:", error);
      set.status = 500;
      return { message: "Internal server error" };
    }
} , {
    body:t.Object({
        text:t.String(),
        videoId:t.String()
    })
})