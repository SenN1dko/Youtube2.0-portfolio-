import Elysia from "elysia";
import { db } from "../../db/db";

export const videoRoutes = new Elysia({prefix:'/video'})
.use(db)
.get('/:q' , async({db , params:{q}}) =>{
return db.video.findMany({
    where:{
        title:q
    }
})
})

.get('/trendingVideos' , async({db }) =>{
return db.video.findMany({
    include:{
channel:true
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
channel:true
    },
})
})
.get('/' , async({db}) =>{
return db.video.findMany({
     include:{
channel:true
    },
})
})
