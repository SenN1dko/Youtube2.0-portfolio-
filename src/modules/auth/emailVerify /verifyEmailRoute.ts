import {Elysia , t} from "elysia"
import { AuthService } from "../auth.services"
import { db } from "../../../db/db"
export const resendVerifyEmail = new Elysia()
.use(db)
.post('/resend-verification', async ({ body, db, set }) => {
    const {email} = body

    const user = await db.user.findUnique({
        where:{email},
        select:{
            verificationToken:true,
            id:true,
            email:true
        }
    })

    if(!user){
        set.status = 404
        return {
            message:'User not found'
        }
    }

    if(!user.verificationToken){
        set.status = 400
        return {
            message:'Email is already verified'
        }
     }
     
    await AuthService.resendVerifyEmail( user.email , user.verificationToken)
}, {
    body: t.Object({
        email: t.String()
    })
})
.post('/verify-email', async ({ body, db, set }) => {
    const { token } = body

    const user = await db.user.findUnique({
        where: { verificationToken: token },
        select: { id: true, email: true }
    })

    if (!user) {
        set.status = 404
        return { message: 'Invalid verification token' }
    }

    const updatedUser = await db.user.update({
        where: { id: user.id },
        data: { verificationToken: null },
        select: {
            id: true,
            email: true,
            verificationToken: true 
        }
    })

    return {
        success: true,
        message: 'Email verified successfully',
        user: updatedUser
    }
}, {
    body: t.Object({
        token: t.String()
    })
})
