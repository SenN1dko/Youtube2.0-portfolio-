import Elysia, { t } from "elysia";
import { db } from "../../../db/db";
import { authPlugin } from "../../../middleware/authPlugin";

export const toggleSubscribe = new Elysia()
.use(authPlugin)
.use(db)
.patch('/toggle-subscribe/:slug' , async({db , set ,user, params:{slug}}) => {
    if (!user || !user.id) {
            set.status = 401
            return { message: 'Unauthorized: You must be logged in' }
        }

        try{
            const channel = await db.channel.findFirst({
                where:{slug},
            })
            if(!channel){
                set.status = 404
                return{
                    message:'channel not found'
                }
            }
            const existingSubscribe = await db.subscription.findUnique({
                where:{
                    userId_channelId:{
                        userId:user.id,
                        channelId:channel.id
                    }
                }
            })
            if(existingSubscribe){
                await db.subscription.delete({
                    where:{
                        id:existingSubscribe.id
                    }
                })
                return{
                    message:'unsubscribed'
                }
            }else{
                await db.subscription.create({
                    data:{
                        channelId:channel.id,
                        userId:user.id
                    }
                })
                return{
                    message:'subscribed'
                }
            }
        }catch (error) {
            console.error("Subscription toggle error:", error)
            set.status = 500
            return { message: 'Internal server error' }
        }
},
{
    params:t.Object({
        slug:t.String()
    })
}
)