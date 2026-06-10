
import { axiosCLassic } from '@/api/axios'
import type { IChannel } from '@/types/channel.types'

class ChannelService {
    private _CHANNELS = '/channels'

    async getAll(){
        return axiosCLassic.get<IChannel[]>(this._CHANNELS)
    }

     async bySlug(slug:string) {
        return axiosCLassic.post<IChannel>(`${this._CHANNELS}/by-slug/${slug}`)
    }
}

export const channelService = new ChannelService()
