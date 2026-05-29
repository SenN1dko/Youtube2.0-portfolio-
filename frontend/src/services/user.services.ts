
import type { IFullUser } from '@/types/user.type'
import {  instance } from '@/api/axios'

class UserService {
    private _USERS = '/user'
    async getProfile() {
        const response = await  instance.get<IFullUser>(`${this._USERS}/profile`)
    return response
    }

}

export const userService = new UserService()
