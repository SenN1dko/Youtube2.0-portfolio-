import { axiosCLassic } from '@/api/axios'
import type { IAuthData } from '@/app/auth/auth-form.type'
import type { IUser } from '@/types/user.type'
import cookies from 'js-cookie'
import { useAuthStore } from '@/store'
import { EnumTokens } from '@/constants/token.constants'
const setUser = useAuthStore.getState().setUser
const clearUser = useAuthStore.getState().clearUser



interface IAuthResponse {
    user:IUser,
    accessToken: string, 
}


class AuthService {
    private  _AUTH = '/auth'

    async main(type: 'login' | 'register', data:IAuthData, recaptchaToken?: string | null) {

     const response = await axiosCLassic.post<IAuthResponse>(`${this._AUTH}/${type}`, data, {
            headers: {
                
                recaptcha: recaptchaToken 
            }
        })
        if(response.data.accessToken) {
            this._saveTokenStorage(response.data.accessToken)
            setUser(response.data.user , response.data.accessToken)
        }

        return response

    }
//CLIENT
     async getNewToken() {

     const response = await axiosCLassic.post<IAuthResponse>(`${this._AUTH}/access-token`)
        if(response.data.accessToken) {
            this._saveTokenStorage(response.data.accessToken)
            setUser(response.data.user , response.data.accessToken)
        }

        return response

    }
//SERVER
    async getNewTokenWithRefresh(refreshToken: string) {
        const response = await axiosCLassic.post<IAuthResponse>(`${this._AUTH}/access-token`,{},{
            headers: {
                Cookie:`refreshToken=${refreshToken}`
            }
        })
        return response.data
    }


    async logout(){
        
        const response = await axiosCLassic.post(`${this._AUTH}/logout`)
        if(response.data){
            this.removeFromStorage()
        }
        return response
    }

    private _saveTokenStorage(accessToken: string) {
        cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
            domain: 'localhost',
            sameSite: 'strict',
            expires: 1
        })
        
 }
    removeFromStorage() {
              cookies.remove(EnumTokens.ACCESS_TOKEN, {
            domain: 'localhost',
            sameSite: 'strict',
            expires: 1
        })
        clearUser()
} 
 
}
export const authservice = new AuthService()
