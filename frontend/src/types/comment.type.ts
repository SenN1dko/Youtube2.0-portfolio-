import type { IUser } from "./user.type"

export interface IComment{
  id: string,
    text: string,
    createdAt:string
    user:IUser
}