'use client'

import { useQuery } from '@tanstack/react-query'
import { Divide, Flame } from 'lucide-react'

import { VideoItem } from '@/ui/video-item/VideoItem'

import { videoService } from '@/services/video.services'

export default function Home() {
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})
	return (
		<div className='grid grid-cols-5 gap-5'>
			{isLoading
				? 'Loading...'
				: data?.data.length &&
					data.data.map(video => (
						<VideoItem
							key={video.id}
							video={video}
							Icon={Flame}
						/>
					))}
		</div>
	)
}
