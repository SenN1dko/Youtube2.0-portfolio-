import * as m from 'framer-motion/m'
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
}
export function HorizontalVIdeoItem({ video }: Props) {
	return (
		<m.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			whileHover={{
				scale: 1.01,
				y: -2
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30
			}}
			className='mb-5 h-full '
		>
			<div className=' mb-1 flex   gap-4 h-full'>
				<Link href={PAGE.VIDEO(video.publicId)}>
					<Image
						src={video.thumbnailUrl}
						width={307}
						height={140}
						alt={video.title}
						className='rounded-md'
					/>
				</Link>

				<div className='flex flex-col w-fit justify-between '>
					<div>
						<m.div
							whileHover={{
								scale: 1.01
							}}
							transition={{
								type: 'spring',
								stiffness: 500,
								damping: 30
							}}
						>
							<VideoItemTitle
								className='text-2xl font-semibold '
								video={video}
							/>
						</m.div>

						<m.div
							whileHover={{
								scale: 1.01
							}}
							transition={{
								type: 'spring',
								stiffness: 500,
								damping: 30
							}}
						>
							<VIdeoChannelName
								className='text-base '
								channel={video.channel}
							/>
						</m.div>
					</div>
					<div className=' flex items-center  gap-2 '>
						<span className='text-gray-400 text-base transition-all  duration-300 hover:text-shadow-glow'>
							{transformViews(video.views)}
						</span>
						<span className='text-gray-400'>•</span>
						<span className='text-gray-400 text-base	 transition-all duration-300 hover:text-shadow-glow'>
							{transformDate(video.createdAt)}
						</span>
					</div>
				</div>
			</div>
		</m.div>
	)
}
