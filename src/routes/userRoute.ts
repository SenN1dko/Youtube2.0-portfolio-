import {Elysia} from "elysia";
import "dotenv/config";
import { authPlugin } from "../middleware/authPlugin";
import { db } from "../db/db";
export const userRoute = new Elysia({prefix:'/user'})
.use(authPlugin)
.use(db)
.get('/profile' , async({user , db , set}) =>{
    console.log(user)
if(!user){
    set.status = 401
    return{
        message:'You are not authorized'
    }
}
const fullUserProfile = db.user.findUnique({
    where:{id:user.id},
    include:{
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
