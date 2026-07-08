import type { IFullUser } from "./user.type"

export interface IComment{
  id: string,
    text: string,
    createdAt:string
    user:IFullUser
videoId:string
}

export interface ICommentData{
    text:string
    videoId:string
}