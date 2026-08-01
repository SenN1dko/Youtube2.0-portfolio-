'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { SkeletonLoading } from '@/ui/SkeletonLoading'
import { StudioVideoItem } from '@/ui/studio-video-item/StudioVideoItem'

import { useEffectScroll } from '@/hooks/useEffectScroll'

import { studioVideoService } from '@/services/studio/studio-video.services'

export function StudioVideoList() {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['studioVideoList'],
		queryFn: ({ pageParam }) =>
			studioVideoService.getAll({
				page: pageParam.page,
				limit: 8
			}),
		initialPageParam: { page: 1 },
		getNextPageParam: lastPage => {
			const { page, totalPages } = lastPage
			return page < totalPages ? { page: page + 1 } : undefined
		}
	})

	useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage })

	// 1. Собираем сырой массив из всех страниц
	const rawVideos = data?.pages.flatMap(page => page.videos) || []

	// 2. Оставляем только уникальные видео по их id (убирает любые дубликаты!)
	const allVideos = Array.from(new Map(rawVideos.map(video => [video.id, video])).values())

	return (
		<div className='pb-5 '>
			{isLoading && !allVideos.length ? (
				<SkeletonLoading
					count={5}
					className='h-36'
				/>
			) : (
				allVideos.map(video => (
					<StudioVideoItem
						video={video}
						key={video.id}
					/>
				))
			)}
			{isFetchingNextPage && (
				<SkeletonLoading
					count={5}
					className='h-36'
				/>
			)}
		</div>
	)
}
