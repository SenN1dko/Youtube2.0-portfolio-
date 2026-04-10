import { BadgeCheck, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import { transformDate } from '@/utils/transform-date'
import { transformViews } from '@/utils/transform-views'

import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
	Icon?: LucideIcon
}

export function VideoItem({ video, Icon }: Props) {
	return (
		<div>
			<div className='relative mb-1'>
				<Link href={PAGE.VIDEO(video.slug)}>
					<Image
						src={video.thumbnailUrl}
						width={500}
						height={140}
						alt={video.title}
						className='rounded-md'
					/>
				</Link>
				<Link href={PAGE.CHANNEL(video.chanel.slug)}>
					<Image
						src={video.chanel.avatarUrl}
						width={30}
						height={30}
						alt={video.chanel.title}
						className='rounded-full absolute bottom-1.5 left-1.5 '
					/>
				</Link>
			</div>
			<div className='flex items-center mb-1 justify-between'>
				<div className=' flex items-center gap-0.5'>
					{Icon && (
						<Icon
							className='text-red-500'
							size={20}
						/>
					)}
					<span className='text-gray-400 text-sm'>{transformViews(video.viewsCount)}</span>
				</div>
				<div>
					<span className='text-gray-400 text-sm'>{transformDate(video.createdAt)}</span>
				</div>
			</div>
			<div>
				<Link
					className='line-clamp-2 leading-snug'
					href={PAGE.VIDEO(video.slug)}
				>
					{video.title}
				</Link>
			</div>
			<div>
				<Link
					href={PAGE.VIDEO(video.slug)}
					className='flex items-center gap-1'
				>
					<span className='text-gray-400 text-sm'>{video.chanel.title}</span>
					<span>
						{
							<BadgeCheck
								className='text-green-500'
								size={15}
							/>
						}
					</span>
				</Link>
			</div>
		</div>
	)
}
