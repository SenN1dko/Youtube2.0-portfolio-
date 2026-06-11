'use client'

import { Heart } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoading } from '@/ui/SkeletonLoading'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { useProfile } from '@/hooks/useProfile'

export function SubscriptionPage() {
	const { profile, isLoading } = useProfile()
	return (
		<>
			<Heading
				isH1
				Icon={Heart}
			>
				Subscriptions
			</Heading>
			<div className='grid-6'>
				{isLoading ? (
					<SkeletonLoading
						count={3}
						className='h-36'
					/>
				) : profile?.subscribedVideos?.length ? (
					profile?.subscribedVideos.map(video => (
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
