import { transporter } from "./routes/emailVerify /emailTransporter"


export const AuthService = {
    async sendVerificationEmail( email: string , token:string | null) {
         if(!token){
            return{
                message:'email already verified'
            }
         }
        const verificationLink = `http://localhost:3000/verify-email?token=${token}`
        await transporter.sendMail({
            from: '"My App" <noreply@myapp.com>',
            to: email,
            subject: 'Подтверждение регистрации',
            html: `
                <h1>Добро пожаловать!</h1>
                <p>Пожалуйста, подтвердите вашу почту, кликнув по ссылке:</p>
                <a href="${verificationLink}" style="padding: 10px 20px; background: #ff0000; color: #fff; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
                    Подтвердить почту
                </a>
            `
        })

    },
    async resendVerifyEmail( email: string , token:string | null) {
        return await AuthService.sendVerificationEmail( email, token)
    }
}