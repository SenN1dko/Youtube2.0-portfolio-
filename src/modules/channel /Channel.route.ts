import {Elysia , t} from "elysia";
import { db } from "../../db/db";

export const ChannelRoute = new Elysia({prefix:'/channels'})
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
.get('/' , async({db , set}) => {
const channels = db.channel.findMany()
if(!channels){
    set.status = 404
    return {message:'channels not found'}
}
return channels
})
