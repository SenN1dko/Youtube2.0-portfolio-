import Elysia from "elysia";
import { db } from "../../../db/db";
import { authBase } from "../authConfig/auth.config";

export const getNewTokenRoute = new Elysia()
.use(db)
.use(authBase)
.post('/access-token' , async({db , cookie:{refreshToken} , set , accessJwt , refreshJwt}) => {
const currentRefreshToken = refreshToken.value

if(!currentRefreshToken){
    set.status = 401
    return {message:"Refresh token is missing"}
}
const payload = await refreshJwt.verify(currentRefreshToken as string)
if(!payload || !payload.id){
    set.status = 401
        return { message: 'jwt expired' } 
}
const user = await db.user.findUnique({
    where:{id:payload.id},
    select:{
        id:true,
        email:true,
        verificationToken:true
    }
})

if(!user){
    set.status = 401
    return {message:"User not found"}
}

const newAccessToken = await accessJwt.sign({id:user.id})
const newRefreshToken = await refreshJwt.sign({id:user.id})

refreshToken.set({
    value:newRefreshToken,
    httpOnly:true,
    secure:true,
    sameSite:'strict',
    maxAge:7 * 24 * 60 * 60
})

return {
    accessToken:newAccessToken,
    user:{
        id: user.id,
        email: user.email,
        verificationToken: user.verificationToken ? user.verificationToken : null
    }
}})