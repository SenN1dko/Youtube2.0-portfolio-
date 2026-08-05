'use client'

import { useMutation } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { startTransition, useEffect, useState } from 'react'

import { useProfile } from '@/hooks/useProfile'

import { transformCount } from '@/utils/transform-count'

import { SaveToPlaylist } from './SaveToPlaylist'
import { userService } from '@/services/studio/user.services'
import type { IVideoSingleResponse } from '@/types/video.types'

export function VideoAction({ video }: { video: IVideoSingleResponse }) {
	const { profile, refetch } = useProfile()

	const isLiked = profile?.likes.some(like => like.videoId === video.id)

	const [isLikedLocale, setIsLikeLocale] = useState(isLiked)

	const [optimisticLikes, setOptimisticLikes] = useState<number>(video.likes.length)

	useEffect(() => {
		setIsLikeLocale(isLiked)
	}, [isLiked])

	const { mutate } = useMutation({
		mutationKey: ['like'],
		mutationFn: () => userService.toggleLike(video.id),
		onMutate: () => {
			startTransition(() => {
				const newIsLiked = !isLikedLocale
				setIsLikeLocale(newIsLiked)
				setOptimisticLikes(prev => {
					if (newIsLiked) return prev + 1
					return prev - 1
				})
			})
		},
		onError: () => {
			startTransition(() => {
				const revertedIsLiked = !isLikedLocale
				setIsLikeLocale(revertedIsLiked)
				setOptimisticLikes(prev => {
					if (revertedIsLiked) return prev + 1
					return prev - 1
				})
			})
		},
		onSuccess: () => {
			refetch()
		}
	})

	return (
		<div className='flex items-center gap-5 z-10'>
			<SaveToPlaylist video={video} />
			<button
				onClick={() => mutate()}
				className='text-primary flex items-center gap-1 transition-opacity opacity-75 hover:opacity-100'
			>
				<Heart fill={isLikedLocale ? 'var(--color-primary)' : 'transparent'} />
				{transformCount(optimisticLikes)}
			</button>
		</div>
	)
}
