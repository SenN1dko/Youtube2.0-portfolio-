import { useMutation } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
import { BookmarkPlus, ListVideo, BookmarkMinus } from 'lucide-react'
import Image from 'next/image'

import { useOutside } from '@/hooks/useOutside'

import { useUserPlaylist } from '@/app/my/playlists/useUserPlaylist'
import { playlistService } from '@/services/Playlist.services'
import type { IVideoSingleResponse } from '@/types/video.types'

interface Props {
	video: IVideoSingleResponse
}

export function SaveToPlaylist({ video }: Props) {
	const { data, refetch: refetchPlaylists } = useUserPlaylist()

	const { mutate: togglePlaylist, isPending } = useMutation({
		mutationKey: ['create a playlist'],
		mutationFn: (playlistId: string) => playlistService.toggleVideoInPlaylist(playlistId, video.id),
		async onSuccess() {
			const { toast } = await import('react-hot-toast')
			toast.success(' successfully changed')
			refetchPlaylists()
			setIsShow(false)
		}
	})
	const { divRef, isShow, setIsShow } = useOutside(false)
	return (
		<>
			<div
				className=' relative z-100'
				ref={divRef}
			>
				<button
					onClick={() => setIsShow(!isShow)}
					className='flex items-center gap-1 transition-opacity opacity-75 hover:opacity-100'
				>
					<ListVideo /> save
				</button>
				<AnimatePresence>
					{isShow && (
						<m.ul
							initial={{
								opacity: 0,
								y: 10
							}}
							animate={{
								opacity: 1,
								y: 0
							}}
							exit={{
								opacity: 0,
								y: 10
							}}
							transition={{
								duration: 0.2
							}}
							className='bg-gray-800 rounded shadow py-2 px-4 absolute bottom-full w-max  right-0'
						>
							<span className='block mb-2 font-semibold text-lg'>Choose a playlist</span>
							{data?.data.map(playlist => (
								<li key={playlist.id}>
									<button
										onClick={() => {
											togglePlaylist(playlist.id)
										}}
										className='transition-colors hover:text-primary hover:bg-white/10 w-full px-2 pt-4 rounded-lg flex items-center gap-2'
										disabled={isPending}
									>
										<div className='flex items-center gap-3 mb-3'>
											<div className='relative block'>
												<div className='absolute rounded-sm shadow-lg w-[88%] h-full left-[6%] -top-[3.2px] bg-gray-500 z-2' />
												<div className='absolute rounded-sm shadow-lg w-9/12 h-full left-[12.5%] -top-[7.5px] bg-gray-700 z-1' />

												{playlist.videos[0]?.thumbnailUrl ? (
													<Image
														src={playlist.videos[0]?.thumbnailUrl}
														width={60}
														height={30}
														alt={playlist.name}
														className='relative z-3 rounded-lg shadow-lg '
														quality={100}
													/>
												) : (
													<>
														<div className='absolute rounded-sm shadow-lg w-9/12 h-full left-[12.5%] -top-[7.5px] bg-gray-700 z-1' />
														<div className='relative z-3 rounded-lg shadow-lg w-15 h-7.5' />
													</>
												)}
											</div>
											<span className='flex items-center gap-2'>
												{playlist.name}
												{playlist.videos.some(v => v.id === video.id) ? (
													<BookmarkMinus size={20} />
												) : (
													<BookmarkPlus size={20} />
												)}
											</span>
										</div>
									</button>
								</li>
							))}
						</m.ul>
					)}
				</AnimatePresence>
			</div>
		</>
	)
}
