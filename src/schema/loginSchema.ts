import { t } from 'elysia'

export const loginSchema = t.Object({
        body:t.Object({
             email: t.String({ format: 'email' }),
             password: t.String(),
            }),
        recaptchaToken: t.String() 
})