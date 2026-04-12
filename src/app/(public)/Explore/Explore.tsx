'use client'
import { useQuery } from '@tanstack/react-query'

import { VideoItem } from '@/ui/video-item/VideoItem'

import { videoService } from '@/services/video.services'
import { Heading } from '@/ui/Heading'
import { Compass } from 'lucide-react'
import  { SkeletonLoading } from '@/ui/SkeletonLoading'


export function Explore() {
    const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})
    return <section>
        <Heading Icon={Compass}>Explore</Heading>
        	<div className='grid-6'>
			{isLoading
				? <SkeletonLoading count={5}  className='h-36'/>
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
