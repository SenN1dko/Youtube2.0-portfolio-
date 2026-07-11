import {Elysia , t} from "elysia";
import { db } from "../../db/db";
import { videoCreateRoute } from "./routes/videoCreateRoute";
import { getVideoById } from "./routes/getVideoById";
import { addViews } from "./routes/addViews";

export const videoRoutes = new Elysia({prefix:'/video'})
.use(db)
.get('/', async ({ set, db, query }) => {
        try {
            const { searchTerm } = query;
            if (searchTerm) {
                return await db.video.findMany({
                    where: {
                        title: {
                            contains: searchTerm,
                            mode: 'insensitive', 
                        },
                    },
                    include: {
                        channel: {
                            include: { owner: true }
                        }
                    }
                });
            }
            return await db.video.findMany({
                include: {
                    channel: {
                        include: { owner: true }
                    }
                },
            });

        } catch (error) {
            console.error(error);
            set.status = 500;
            return { message: 'Internal server error' };
        }
        }, 
        {
        query: t.Object({
            searchTerm: t.Optional(t.String())
        })
    }
    )

.get('/trendingVideos' , async({ db }) =>{
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
    where:{
        gameId:{
            not:null
        }
    }, 
    include:{
        game:true,
        channel:{
            include:{
                owner:true
            }
        }
    },
})
})
.use(videoCreateRoute)
.use(getVideoById)
.use(addViews)