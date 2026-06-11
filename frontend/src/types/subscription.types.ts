import type { IChannel } from "./channel.types"
import type { IVideo } from "./video.types"

export interface ISubscription {
  id: string
  userId: string
  channelId: string
  createdAt: string
  
  channel: IChannel & {
    videos: IVideo[]
  }
}