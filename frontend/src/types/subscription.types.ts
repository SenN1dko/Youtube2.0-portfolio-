import type { IChannel } from "./channel.types"

export interface ISubscription {
  id: string
  userId: string
  channelId: string
  createdAt: string
  channel: IChannel
}