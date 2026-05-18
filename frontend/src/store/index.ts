import { create } from 'zustand'
import type { IUser } from '@/types/user.type'
import Cookies from 'js-cookie'
import { EnumTokens } from '@/constants/token.constants'
interface IAuthStore {
	user: IUser | null
	accessToken: string | null
	isLoggedIn:boolean
	setUser: (user: IUser | null , accessToken:string) => void
	clearUser:() => void
}
export const useAuthStore = create<IAuthStore>((set) => {
    const token = Cookies.get(EnumTokens.ACCESS_TOKEN) || null

    return {
        user: null,
        accessToken: token,
        isLoggedIn: !!token, 

        setUser: (user, accessToken) => set({ 
            user, 
            accessToken, 
            isLoggedIn: !!accessToken 
        }),
        
        clearUser: () => {
            set({ user: null, accessToken: null, isLoggedIn: false })
        }
    }
})