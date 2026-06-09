
import { axiosCLassic } from '@/api/axios'
import type { IChannel } from '@/types/channel.types'

class ChannelService {
    private _CHANNELS = '/channels'

     async bySlug(slug:string | null) {
        return axiosCLassic.post<IChannel>(`${this._CHANNELS}/by-slug/${slug}`)
    }
}

export const channelService = new ChannelService()
