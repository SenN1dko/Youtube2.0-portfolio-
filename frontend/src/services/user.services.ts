
import type { IFullUser } from '@/types/user.type'
import {  instance } from '@/api/axios'

class UserService {
    private _USERS = '/user'
    getUser() {
        return instance.get<IFullUser[]>(`${this._USERS}/profile`)
    }

}

export const userService = new UserService()
