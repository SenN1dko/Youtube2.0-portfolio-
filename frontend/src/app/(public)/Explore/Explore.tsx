'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { Compass } from 'lucide-react'
import { useEffect } from 'react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoading } from '@/ui/SkeletonLoading'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { videoService } from '@/services/video.services'
import { useAuthStore } from '@/store'

export function Explore() {
	const user = useAuthStore(state => state.user)
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['explore'],
		queryFn: ({ pageParam }) =>
			videoService.getExploreVideos(
				user?.id,
				{
					page: pageParam.page,
					limit: 10
				},
				pageParam.excludeIds
			),
		initialPageParam: { page: 1, excludeIds: [] as string[] },
		getNextPageParam: (lastPage, allPages) => {
			const { page, totalPages } = lastPage
			const allVideoIds = allPages.flatMap(page => page.videos.map(video => video.id))

			return page < totalPages ? { page: page + 1, excludeIds: allVideoIds } : undefined
		}
	})

	const allVideos = data?.pages.flatMap(page => page.videos) || []

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
					document.documentElement.offsetHeight * 0.99 &&
				hasNextPage &&
				!isFetchingNextPage
			) {
				fetchNextPage()
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [hasNextPage, isFetchingNextPage, fetchNextPage])

	return (
		<section>
			<Heading Icon={Compass}>Explore</Heading>
			<div className='grid-6'>
				{isLoading && !allVideos.length ? (
					<SkeletonLoading
						count={5}
						className='h-36'
					/>
				) : (
					allVideos.map(video => (
						<VideoItem
							video={video}
							key={video.id}
						/>
					))
				)}
				{isFetchingNextPage && (
					<>
						<SkeletonLoading
							count={5}
							className='h-36'
						/>
					</>
				)}
			</div>
		</section>
	)
}
