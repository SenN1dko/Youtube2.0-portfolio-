'use client'

import { useQuery } from '@tanstack/react-query'
import { ListVideo } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Heading } from '@/ui/Heading'
import { SkeletonLoading } from '@/ui/SkeletonLoading'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { playlistService } from '@/services/Playlist.services'

export function SinglePlaylist() {
	const { id } = useParams()

	const { data, isLoading } = useQuery({
		queryKey: ['playlist', id],
		queryFn: () => playlistService.getPlaylistById(id as string),
		enabled: !!id
	})

	return (
		<>
			<Heading
				isH1
				Icon={ListVideo}
			>
				{data?.data.name}
			</Heading>
			<div className='grid grid-cols-6 gap-6 '>
				{isLoading ? (
					<SkeletonLoading
						count={3}
						className='h-36'
					/>
				) : data?.data.videos.length ? (
					data?.data.videos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>No videos in playlist!</p>
				)}
			</div>
		</>
	)
}
