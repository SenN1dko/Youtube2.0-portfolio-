import type { IFullUser } from './user.type'
import type { IVideo } from './video.types'

export interface IChannel {
	id: string
	name: string
	// slug: string
	description: string
	isVerified: boolean
	avatar: string
	banner: string
	owner:IFullUser
	videos: IVideo[]
	// subscribers: []
	createdAt: string
}
