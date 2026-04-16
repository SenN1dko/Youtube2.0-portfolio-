import type { IChannel } from "./channel.types"
import type { IWatchHistory } from "./history.type"

export interface IUser {
  id: number
  name?: string
  email: string
}

export interface IFullUser extends IUser {
channel?:IChannel,
subscriptions?: IChannel[]
watchHistory: IWatchHistory[]  

}