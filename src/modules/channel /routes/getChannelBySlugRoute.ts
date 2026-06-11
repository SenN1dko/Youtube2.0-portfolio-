import Elysia, { t } from "elysia";
import { db } from "../../../db/db";

export const getChannelBySlug = new Elysia()
.use(db)
.post('/by-slug/:slug' , async({db , params:{slug} , set}) => {

try{
    const channel = await db.channel.findFirst({
    where:{slug},
    include: {
        owner: true, 
        subscriptions:true,
        videos: { 
            include: {
                channel: {
                    include: {
                        owner: true,
                    }
                }
            }
        }
    }
    })
    if (!channel) {
                set.status = 404
                return { message: 'Channel not found' }
    }
    return channel
}catch (error) {
            set.status = 500
            return { message: 'Internal server error' }
        }

}, {
    params:t.Object({
        slug:t.String()
    })
})