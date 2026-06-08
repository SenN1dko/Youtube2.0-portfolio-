import Elysia from "elysia"
import { db } from "../../../db/db"
import crypto from "crypto"
import { AuthService } from "../auth.services"
import { loginSchema } from "../../../schema/loginSchema"
import { t } from "elysia"
import { authBase } from "../authConfig/auth.config"
export const registerRoute = new Elysia()
.use(db)
.use(authBase)
.post('/register' , async({db , body, headers, set , refreshJwt , accessJwt , cookie:{refreshToken}}) =>{
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

const emailPrefix = email.split('@')[0]
const user = await db.user.create({
    include:{
        channel:true
    },
    data:{
        email:email,
        password: hashPassword,
        verificationToken: token,
        channel: {
            create: {
                name: `${emailPrefix}'s channel`,
                slug: emailPrefix,
                avatar: "",
                banner: ""
            }
        }
}})

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