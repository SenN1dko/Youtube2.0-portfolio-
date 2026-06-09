import type { IFullUser, IUser } from './user.type'
import type { IVideo } from './video.types'

export interface IChannel {
	id: string
	slug: string
	description: string
	isVerified: boolean
	avatar: string
	banner: string
	owner:IFullUser
	video: IVideo[]
	subscribers: IUser[]
	createdAt: string
}
