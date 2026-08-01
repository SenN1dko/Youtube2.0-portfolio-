
import type { IVideo, IVideosPagination } from '@/types/video.types'
import {  instance } from '@/api/axios'
import type { IVideoFormData } from '@/types/studio-video.type'
import type { IPaginationParams } from '@/types/pagination.types'

class StudioVideoService {
    private _STUDIO_VIDEOS = '/studio/videos'


     async getAll(params:IPaginationParams) {
        const res = await instance.get<IVideosPagination>(this._STUDIO_VIDEOS,  {
                params
        } )
        return res.data
    }

    byId(id:string) {
        return instance.get<IVideo[]>(`${this._STUDIO_VIDEOS}/${id}`) 
    }

  
    create(dto:IVideoFormData) {
        return instance.post(this._STUDIO_VIDEOS ,dto)
    }
    update(dto:IVideoFormData , id:string) {
        return instance.put(`${this._STUDIO_VIDEOS}/${id}` , dto)
    }
 delete(id:string){
        return instance.delete(`${this._STUDIO_VIDEOS}/${id}` )
        }
    }	
    

export const studioVideoService = new StudioVideoService()
