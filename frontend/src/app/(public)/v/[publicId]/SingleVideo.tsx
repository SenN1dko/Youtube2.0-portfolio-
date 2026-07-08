'use client'

import cn from 'clsx'
import { useState } from 'react'

import { Heading } from '@/ui/Heading'
import { VideoPlayer } from '@/ui/video-player/VideoPlayer'

import { SimilarVideos } from './SimilarVideos'
import { Comment } from './comments/Comment'
import { VideoDescription } from './description/VideoDescription'
import { VideoAction } from './video-actions/VideoAction'
import { VideoChannel } from './video-channel/VideoChannel'
import { useShowedSidebarStore } from '@/store'
import type { IVideoSingleResponse } from '@/types/video.types'

interface Props {
	video: IVideoSingleResponse
}

export function SingleVideo({ video }: Props) {
	const [theaterMode, setTheaterMode] = useState(false)
	const isShowedSidebar = useShowedSidebarStore(set => set.isShowed)
	const toggleTheaterMode = () => {
		setTheaterMode(!theaterMode)
	}

	return (
		<section className='grid grid-cols-[3fr_.8fr] gap-5 relative z-10 '>
			<div>
				<div className={cn(theaterMode ? 'absolute top-0 left-0 w-full' : 'relative mb-5')}>
					<VideoPlayer
						fileName={video.videoFileName}
						toggleTheaterMode={toggleTheaterMode}
						maxResolution={video.maxResolution}
					/>
				</div>
				<div
					className={cn(!isShowedSidebar && theaterMode ? 'pt-270' : '', { 'pt-240': theaterMode })}
				>
					<div className='mb-5 border-b border-border pb-5'>
						<div className=' flex justify-between items-center '>
							<Heading isH1>{video.title}</Heading>
							<VideoAction video={video} />
						</div>
						<div className='text-gray-400 transition-all duration-300 hover:text-shadow-glow'>
							{video.views.toLocaleString()} views
						</div>
					</div>
				</div>
				<VideoChannel video={video} />
				<VideoDescription description={video.description} />
				<Comment video={video} />
			</div>
			{!!video.similarVideos.length && (
				<div
					className={cn(!isShowedSidebar && theaterMode ? 'pt-270' : '', { 'pt-240': theaterMode })}
				>
					<SimilarVideos videos={video.similarVideos} />
				</div>
			)}
		</section>
	)
}
