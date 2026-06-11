import type { IChannel } from "./channel.types"
import type { ISubscription } from "./subscription.types"
import type { IVideo } from "./video.types"
// import type { IWatchHistory } from "./history.type"


export interface IUser {
  id: string
  username?: string
  email: string
}

export interface IFullUser extends IUser {
channel?:IChannel,
subscriptions?: ISubscription[]
// watchHistory: IWatchHistory[]  
verificationToken?: string
} 

export interface IResponseUser extends IFullUser{
  subscribedVideos:IVideo[]
}