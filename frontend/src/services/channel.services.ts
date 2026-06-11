
import { axiosCLassic, instance } from '@/api/axios'
import type { IChannel } from '@/types/channel.types'

class ChannelService {
    private _CHANNELS = '/channels'

    async getAll(){
        return axiosCLassic.get<IChannel[]>(this._CHANNELS)
    }

     async bySlug(slug:string) {
        return axiosCLassic.post<IChannel>(`${this._CHANNELS}/by-slug/${slug}`)
    }

    async toggleSubscribe(slug:string){
        return instance.patch(`${this._CHANNELS}/toggle-subscribe/${slug}`)
    }
}

export const channelService = new ChannelService()
