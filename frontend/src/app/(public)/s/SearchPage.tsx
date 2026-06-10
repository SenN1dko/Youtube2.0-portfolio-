'use client'

import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Heading } from '@/ui/Heading'
import { SkeletonLoading } from '@/ui/SkeletonLoading'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { videoService } from '@/services/video.services'

export function SearchPage() {
	const searchParams = useSearchParams()
	const searchTerm = searchParams.get('q')

	const { data, isLoading } = useQuery({
		queryKey: ['search', searchTerm],
		queryFn: () => videoService.getAll(searchTerm)
	})

	return (
		<>
			<Heading
				isH1
				Icon={Search}
			>
				Searched by: {searchTerm}
			</Heading>
			<div className='grid-6'>
				{isLoading ? (
					<SkeletonLoading
						count={3}
						className='h-36'
					/>
				) : data?.data.length ? (
					data.data.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>Videos not found!</p>
				)}
			</div>
		</>
	)
}
