'use client'

import { ListVideo } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoading } from '@/ui/SkeletonLoading'

import { useOutside } from '@/hooks/useOutside'

import { CreatePLaylist } from './CreatePLaylist'
import { PlaylistItem } from './PlaylistItem'
import { useUserPlaylist } from './useUserPlaylist'

export function PlaylistsPage() {
	const { isShow, divRef, setIsShow } = useOutside(false)
	const { data, isLoading, refetch } = useUserPlaylist()
	const playlist = data?.data
	console.log('user play ', playlist)
	return (
		<>
			<section>
				<div className='flex items-center justify-between mb-5'>
					<Heading
						isH1
						Icon={ListVideo}
						classname='mb-5'
					>
						Playlists
					</Heading>
					<button
						className='bg-white/10 cursor-pointer px-5  hover:bg-white/20 transition-colors rounded font-semibold  py-[0.550rem] '
						onClick={() => setIsShow(!isShow)}
					>
						Create playlist
					</button>
				</div>
				<div className='grid grid-cols-5 gap-6'>
					{isLoading ? (
						<SkeletonLoading
							count={3}
							className='h-50'
						/>
					) : !!playlist?.length ? (
						playlist?.map(playlist => (
							<PlaylistItem
								key={playlist.id}
								playlist={playlist}
							/>
						))
					) : (
						<p>Playlists not found!</p>
					)}
					{isShow && (
						<CreatePLaylist
							ref={divRef}
							refetch={refetch}
							onClose={() => setIsShow(false)}
						/>
					)}
				</div>
			</section>
		</>
	)
}
