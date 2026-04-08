'use client'
import { useQuery } from '@tanstack/react-query'

import { VideoItem } from '@/ui/video-item/VideoItem'

import { videoService } from '@/services/video.services'


export function Explore() {
    const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})
    return <section>
        <h2>Explore</h2>
        	<div className='grid grid-cols-5 gap-5 grid-rows-auto'>
			{isLoading
				? 'Loading...'
				: data?.data.length &&
					data.data.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))}
		</div>
    </section>
}
