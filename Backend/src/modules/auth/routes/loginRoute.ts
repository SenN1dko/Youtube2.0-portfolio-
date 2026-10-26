import Elysia, { t } from "elysia"
import { db } from "../../../db/db"
import { AuthService } from "../auth.services"
import { loginSchema } from "../../../schema/loginSchema"
import { authBase } from "../authConfig/auth.config"
export const loginRoute = new Elysia()
.use(db)
.use(authBase)
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