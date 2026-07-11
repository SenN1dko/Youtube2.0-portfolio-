import type { IVideo } from "./video.types";

export interface IPlaylist{
    name:string,
    userId:string,
    videos:IVideo[],
    createdAt:string
    id:string
}
export interface IPlaylistData{
        title:string,
        videoPublicId:string
}