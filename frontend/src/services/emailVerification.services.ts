import { axiosCLassic } from "@/api/axios"
import { useAuthStore } from "@/store"
import type { IEmailVerificationResponse } from "@/types/emailVerify.types"

const setUser = useAuthStore.getState().setUser


class EmailVerificationService {
    async verifyEmail(token: string | null) {
        const response = await axiosCLassic.post<IEmailVerificationResponse>('/verify-email', { token })
        if(response.data){
            setUser(response.data.user)
            return response.data.message
        }
    }

    async resendVerifyEmail(email: string) {
        const response = await axiosCLassic.post('/resend-verification', { email })
        return response.data
    }
}

export const emailVerificationService = new EmailVerificationService()