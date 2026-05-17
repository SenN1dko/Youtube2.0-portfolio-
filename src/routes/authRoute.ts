import {Elysia , t} from "elysia";
import jwt from "@elysiajs/jwt";
import "dotenv/config";
import { db } from "../db/db";
import { loginSchema } from "../schema/loginSchema";

export const authRoutes = new Elysia({prefix:'/auth'})
.use(db)
.use(jwt({
    name: 'accessJwt',
    secret: process.env.JWT_ACCESS_SECRET || 'secretkeyforAccessToken-superSecret',
    exp:'15m'
}))
.use(jwt({
    name:'refreshJwt',
    secret:process.env.JWT_REFRESH_SECRET || 'secretkeyforRefreshToken-superSecret'
}))
.post('/login' , async({db , set, headers , accessJwt , refreshJwt , cookie:{refreshToken}}) => {
const {recaptchaToken , body} = headers
const {email , password} = body

const reCAPTCHASecret = process.env.RECAPTCHA_SITE_KEY
const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHASecret}&response=${recaptchaToken}`

const fetchRecaptcha = await fetch(recaptchaUrl , {method:'POST'})
const recaptchaData = await fetchRecaptcha.json() as {success:boolean}

if(!recaptchaData.success){
    set.status = 400
    return {message:"recaptcha verify is denied"}
}

const user = await db.user.findFirst({
    where:{email},
    select:{
        password:true,
        email:true,
        id:true
    }
})
if(!user || !(Bun.password.verify(password , user.password))){
    set.status = 400
    return { message: "Invalid email or password" }
}

const accessTokenStr = await accessJwt.sign({id: user.id})
const refreshTokenStr = await refreshJwt.sign({id: user.id})

refreshToken.set({
    value:refreshTokenStr,
    httpOnly:true,
    secure:true,
    sameSite:'strict',
    maxAge:7 * 24 * 60 * 60
})

return {
    accessToken:accessTokenStr,
    user:user
}

}, {
    headers:loginSchema 
})
.post('/register' , async({db , headers , set , refreshJwt , accessJwt , cookie:{refreshToken}}) =>{
    const {recaptchaToken , body} = headers
    const {email , password} = body

    const reCAPTCHASecret = process.env.RECAPTCHA_SITE_KEY
    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHASecret}&response=${recaptchaToken}`

    const fetchRecaptcha = await fetch(recaptchaUrl , {method:'POST'})
    const recaptchaData = await fetchRecaptcha.json() as {success:boolean}

if(!recaptchaData.success){
    set.status = 400
    return {message:"recaptcha verify is denied"}
}

const hashPassword = await Bun.password.hash(password , {
    algorithm:'bcrypt',
    cost:10
})

const user = await db.user.create({
    data:{
        email:email,
        password: hashPassword,
    }
})

const accessTokenStr = await accessJwt.sign({id: user.id})
const refreshTokenStr = await refreshJwt.sign({id: user.id})

refreshToken.set({
    value:refreshTokenStr,
    httpOnly:true,
    secure:true,
    sameSite:'strict',
    maxAge:7 * 24 * 60 * 60
})

return {
    accessToken:accessTokenStr,
    user:user
}


}
,{
    headers:loginSchema
}
)
.post('/logout' , async({cookie:{refreshToken}}) => {
refreshToken.remove()
return {
    message:"success"
}
})