import {Elysia , t} from "elysia";
import { db } from "../../db/db";

export const videoRoutes = new Elysia({prefix:'/video'})
.use(db)
.get('/:q' , async({set,db , params:{q}}) =>{
    try{
    const videos = await db.video.findMany({
    where:{
        title:{
            contains:q,
             mode: 'insensitive',
        },
    },
    include:{
        channel:{
            include:{
                owner:true
            }
        }        
    }
})
if(!videos){
set.status = 404
return {
    message:'videos not found'
}
}
return videos
}catch(error){
            set.status = 500
            return { message: 'Internal server error' }
}

} ,{
    params: t.Object({
        q:t.String()
    })
})

.get('/trendingVideos' , async({db }) =>{
return db.video.findMany({
    include:{
        channel:{
            include:{
                owner:true
            }
        }
    },
    orderBy:{
        views:'desc'
    },
    take:10
})
})

.get('/videoGames' , async({db}) =>{
return db.video.findMany({
     include:{
 channel:{
            include:{
                owner:true
            }
        }
    },
})
})
.get('/' , async({db}) =>{
return db.video.findMany({
     include:{
 channel:{
            include:{
                owner:true
            }
        }
    },
})
})
