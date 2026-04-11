'use client'

import { useQuery } from '@tanstack/react-query'
import { videoService } from '@/services/video.services'
import { useSearchParams } from 'next/navigation'
import { VideoItem } from '@/ui/video-item/VideoItem'
import { Heading } from '@/ui/Heading'
import { Search } from 'lucide-react'
import { SkeletonLoading } from '@/ui/SkeletonLoading'

export function SearchPage() {
   const searchParams = useSearchParams()
    const searchTerm = searchParams.get('q')

    const {data , isLoading} = useQuery({
        queryKey: ['search', searchTerm],
        queryFn: () => videoService.getAll(searchTerm)
    })
    
    return <>
     <Heading isH1 Icon={Search}>Searched by: {searchTerm}</Heading>
        	<div className='grid grid-cols-5 gap-5 grid-rows-auto'>
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
    </>
}
