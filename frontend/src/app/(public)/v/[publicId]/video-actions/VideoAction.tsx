'use client'

import { useMutation } from '@tanstack/react-query'
import { Heart, ListPlus } from 'lucide-react'
import { startTransition, useEffect, useState } from 'react'

import { useProfile } from '@/hooks/useProfile'

import { transformCount } from '@/utils/transform-count'

import { userService } from '@/services/user.services'
import type { IVideoSingleResponse } from '@/types/video.types'
import { useUserPlaylist } from '@/app/(user)/playlists/useUserPlaylist'
import toast from 'react-hot-toast'

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

	const {data,isLoading,refetch:refetchPlaylists} = useUserPlaylist()

		const { mutate, isPending } = useMutation({
		mutationKey: ['create a playlist'],
		mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
		onSuccess() {
			refetchPlaylists()
			toast.success(' successfully added')
			// toast.success(' successfully removed')

		},
	})

	return (
		<div className='flex items-center gap-5 z-10'>
			<button className='flex items-center gap-1 transition-opacity opacity-75 hover:opacity-100'>
				<ListPlus /> save
			</button>
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
