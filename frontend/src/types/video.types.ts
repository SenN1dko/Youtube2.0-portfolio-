import type { EnumVideoPLayerQuality } from '@/ui/video-player/video-player.types'
import type { IChannel } from './channel.types'
import type { IComment } from './comment.type'
import type { IPagination } from './pagination.types'

export interface IVideo {
	id: string
	title: string
	publicId:string
	description?: string
	thumbnailUrl: string
	videoFileName: string
	maxResolution:EnumVideoPLayerQuality
	views: number
	isPublic: boolean
	channel: IChannel
	createdAt: string
	message?:string
}

export interface IVideoFull extends IVideo { 
likes:[]	
comments:IComment[]
}

export interface IVideoSingleResponse extends IVideoFull {
similarVideos:IVideo[]
}
export interface IVideosPagination extends IPagination { 
	videos:IVideo[]
}