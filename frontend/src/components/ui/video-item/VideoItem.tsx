import * as m from 'framer-motion/m'
import { type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import { transformDate } from '@/utils/transform-date'
import { transformViews } from '@/utils/transform-views'

import { VIdeoChannelName } from './VIdeoChannelName'
import { VideoItemTitle } from './VideoItemTitle'
import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
	Icon?: LucideIcon
}
export function VideoItem({ video, Icon }: Props) {
	return (
		<m.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			whileHover={{
				scale: 1.01,
				y: -5
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30
			}}
		>
			<div className='relative mb-1'>
				<Link href={PAGE.VIDEO(video.publicId)}>
					<Image
						src={video.thumbnailUrl}
						width={500}
						height={140}
						alt={video.title}
						className='rounded-md'
					/>
				</Link>

				<Link href={PAGE.CHANNEL(video.channel.slug)}>
					<Image
						src={video.channel.avatar || '/Avatar.png'}
						width={30}
						height={30}
						alt={video.channel.owner.username || ''}
						className='rounded-full absolute bottom-1.5 left-1.5 '
					/>
				</Link>
			</div>
			<div className='flex items-center mb-1 justify-between'>
				<m.div className=' flex items-center gap-0.5 transition-all duration-300 hover:text-shadow-glow'>
					{Icon && (
						<Icon
							className='text-red-500'
							size={20}
						/>
					)}
					<span className='text-gray-400 text-sm'>{transformViews(video.views)}</span>
				</m.div>
				<m.div>
					<span className='text-gray-400 text-sm transition-all duration-300 hover:text-shadow-glow'>
						{transformDate(video.createdAt)}
					</span>
				</m.div>
			</div>
			<m.div
				whileHover={{
					scale: 1.05
				}}
				transition={{
					type: 'spring',
					stiffness: 500,
					damping: 30
				}}
			>
				<VideoItemTitle video={video} />
			</m.div>
			<m.div
				whileHover={{
					scale: 1.03
				}}
				transition={{
					type: 'spring',
					stiffness: 500,
					damping: 30
				}}
			>
				<VIdeoChannelName channel={video.channel} />
			</m.div>
		</m.div>
	)
}
