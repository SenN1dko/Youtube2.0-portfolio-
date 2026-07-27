
import type {  IResponseUser } from '@/types/user.type'
import {  instance } from '@/api/axios'
import type { ISettings } from '@/types/settings.type'

class UserService {
    private _USERS = '/user'
     getProfile() {
        return  instance.get<IResponseUser>(`${this._USERS}/profile`)
          
    }

    updateProfile(data:ISettings){
        return instance.put<boolean>(`${this._USERS}/profile`, data)
    }

    toggleLike(videoId:string){
        return instance.patch(`${this._USERS}/profile/likes`, {videoId})
    }

}

export const userService = new UserService()
