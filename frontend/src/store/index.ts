import { create } from 'zustand'
import Cookies from 'js-cookie'
import type { IUser } from '@/types/user.type'
import { EnumTokens } from '@/services/auth.services'
interface IAuthStore {
    user: IUser | null
    accessToken: string | null
    isLoggedIn: boolean
    setUser: (user: IUser | null, accessToken: string | null) => void
    clearUser: () => void
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
            
            set({ 
                user: null, 
                accessToken: null, 
                isLoggedIn: false 
            })
        }
    }
})