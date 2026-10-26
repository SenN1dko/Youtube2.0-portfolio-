import type { IVideo } from "./video.types";

export interface IVideoFormData extends Omit<IVideo, 'id' | 'slug' | 'publicId' | 'viewsCount' | 'channel' | 'createdAt' | 'isPublic'>{
    tags:string[]
    
}