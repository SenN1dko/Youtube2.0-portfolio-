'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { History } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoading } from '@/ui/SkeletonLoading'
import { HorizontalVIdeoItem } from '@/ui/video-item/HorizontalVideoItem'

import { watchHistoryService } from '@/services/WatchHistory.services'

export function HistoryPage() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['history'],
		queryFn: () => watchHistoryService.getUserHistory()
	})
	const { mutate, isPending } = useMutation({
		mutationKey: ['delete history'],
		mutationFn: () => watchHistoryService.clearHistory(),
		onSuccess: () => refetch()
	})
	return (
		<>
			<section className='w-1/2'>
				<div className='flex items-center justify-between'>
					<Heading
						isH1
						Icon={History}
						classname='mb-5'
					>
						History
					</Heading>
					{!!data?.data.length && (
						<button
							className='bg-border cursor-pointer px-2 mb-4 hover:bg-border/80 transition-colors rounded font-semibold h-max py-[0.550rem] '
							disabled={isPending}
							onClick={() => mutate()}
						>
							Clear history
						</button>
					)}
				</div>
				<div>
					{isLoading ? (
						<SkeletonLoading
							count={3}
							className='h-36'
						/>
					) : data?.data?.length ? (
						data?.data.map(history => (
							<HorizontalVIdeoItem
								key={history.video.id}
								video={history.video}
							/>
						))
					) : (
						<p>Videos not found!</p>
					)}
				</div>
			</section>
		</>
	)
}
