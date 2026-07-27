
import type { IVideo } from '@/types/video.types'
import { instance } from '@/api/axios'
import type { IVideoFormData } from '@/types/studio-video.type'

class StudioVideoService {
    private _STUDIO_VIDEOS = '/studio/videos'


    getAll(searchTerm?: string | null, page?:number , limit?:number) {
        return instance.get<IVideo[]>(this._STUDIO_VIDEOS, {
            params:{
                  searchTerm,
                  page, 
                  limit
            }
        } )
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
