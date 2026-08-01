'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { SkeletonLoading } from '@/ui/SkeletonLoading'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { useEffectScroll } from '@/hooks/useEffectScroll'

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

	useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage })
	const allVideos = data?.pages.flatMap(page => page.videos) || []

	return (
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
	)
}
