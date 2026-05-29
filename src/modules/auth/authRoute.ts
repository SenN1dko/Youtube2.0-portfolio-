import {Elysia , t} from "elysia";
import jwt from "@elysiajs/jwt";
import "dotenv/config";
import { db } from "../../db/db";
import { loginSchema } from "../../schema/loginSchema";
import { AuthService } from "./auth.services";
import crypto from "crypto";
export const authRoutes = new Elysia({prefix:'/auth'})
.use(db)
.use(jwt({
    name: 'accessJwt',
    secret: process.env.JWT_ACCESS_SECRET || 'secretkeyforAccessToken-superSecret',
    exp:'1h'
}))
.use(jwt({
    name:'refreshJwt',
    secret:process.env.JWT_REFRESH_SECRET || 'secretkeyforRefreshToken-superSecret'
}))

.post('/login' , async({db , set, headers , body, accessJwt , refreshJwt , cookie:{refreshToken}}) => {
 const {email , password  } = body
    const { recaptcha } = headers

const reCAPTCHASecret = process.env.RECAPTCHA_SITE_KEY
const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHASecret}&response=${recaptcha}`

const fetchRecaptcha = await fetch(recaptchaUrl , {method:'POST'})
const recaptchaData = await fetchRecaptcha.json() as {success:boolean}

if(!recaptchaData.success){
    set.status = 400
    return {message:"recaptcha verify is denied"}
}

const user = await db.user.findUnique({
    where: { email },
    select: {
        password: true,
        email: true,
        id: true,
        verificationToken: true
    }
})

if (!user || !(await Bun.password.verify(password, user.password))) {
    set.status = 400
    return { message: "Invalid email or password" }
}

await AuthService.sendVerificationEmail(user.email, user.verificationToken)

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
    user:{
        id: user.id,
        password: user.password,
        email: user.email,
        verificationToken: user.verificationToken ? user.verificationToken : null
    }
}

}, {
      headers:t.Object({
        recaptcha:t.String()
    }),
    body: loginSchema

})
.post('/register' , async({db  , body, headers, set , refreshJwt , accessJwt , cookie:{refreshToken}}) =>{
    const {email , password , } = body
    const { recaptcha } = headers

    const reCAPTCHASecret = process.env.RECAPTCHA_SITE_KEY
    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHASecret}&response=${recaptcha}`

    const fetchRecaptcha = await fetch(recaptchaUrl , {method:'POST'})
    const recaptchaData = await fetchRecaptcha.json() as {success:boolean}
    const token = crypto.randomBytes(64).toString('hex')

if(!recaptchaData.success){
    set.status = 400
    return {message:"recaptcha verify is denied"}
}

const hashPassword = await Bun.password.hash(password , {
    algorithm:'bcrypt',
    cost:10
})

const existingUser = await db.user.findUnique({
    where: { email: body.email } 
})

if (existingUser) {
    set.status = 400 
    return {
        success: false,
        message: 'Пользователь с таким Email уже зарегистрирован'
    }
}

            

const user = await db.user.create({
    data:{
        email:email,
        password: hashPassword,
        verificationToken: token
    }
})

await AuthService.sendVerificationEmail( user.email , user.verificationToken)


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
    user:user,
    message:'Registration successful, please check your email to verify your account'
}


}
,{
    headers:t.Object({
        recaptcha:t.String()
    }),
    body: loginSchema

}
)
.post('/logout' , async({cookie:{refreshToken}}) => {
refreshToken.remove()
return {
    message:"success"
}
})