'use client'

import { Heart } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoading } from '@/ui/SkeletonLoading'
import { HorizontalVIdeoItem } from '@/ui/video-item/HorizontalVideoItem'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { useProfile } from '@/hooks/useProfile'

export function LikedVideosPage() {
	const { profile, isLoading } = useProfile()
	console.log(profile?.likes)
	return (
		<>
			<section className='w-1/2'>
				<div className='flex items-center gap-8 mb-10'>
					<Heading
						isH1
						Icon={Heart}
					>
						Liked videos
					</Heading>
					{profile?.likes.length && (
						<span className='font-semibold text-base'>
							{!!profile.likes.length && profile.likes.length} videos
						</span>
					)}
				</div>
				<div>
					{isLoading ? (
						<SkeletonLoading
							count={3}
							className='h-36'
						/>
					) : profile?.likes?.length ? (
						profile?.likes.map(like => (
							<HorizontalVIdeoItem
								key={like.video.id}
								video={like.video}
							/>
						))
					) : (
						<p>Liked videos not found!</p>
					)}
				</div>
			</section>
		</>
	)
}
