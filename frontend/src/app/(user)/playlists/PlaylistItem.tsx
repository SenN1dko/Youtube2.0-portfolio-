import * as m from 'framer-motion/m'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import type { IPlaylist } from '@/types/playlist.type'

interface Props {
	playlist: IPlaylist
}
export function PlaylistItem({ playlist }: Props) {
	console.log(playlist)
	return (
		<m.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			whileHover={{
				scale: 1.01,
				y: -2
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30
			}}
		>
			<div className=' mb-6'>
				<Link
					className='relative block'
					href={PAGE.PLAYLIST(playlist.id)}
				>
					<div className='absolute rounded-lg  shadow-lg w-10/12 h-full left-[8.5%] -top-4 bg-gray-700 z-1' />
					<div className='absolute rounded-lg shadow-lg w-11/12 h-full left-[4.1%] -top-2 bg-gray-500 z-2' />

					<Image
						src={playlist.videos[0]?.thumbnailUrl || '/playlist-placeholder.png'}
						width={500}
						height={140}
						alt={playlist.name}
						className='relative z-3 rounded-lg shadow-lg'
						quality={100}
					/>
					<div className='absolute top-1 left-2 text-xs flex items-center gap-1 bg-black/40 rounded px-1.5 py-1 font-medium'>
						{playlist.videos.length} <span>videos</span>
					</div>
				</Link>

				<div className='mt-1 '>
					<Link
						className={'line-clamp-2 leading-snug font-bold text-lg'}
						href={PAGE.PLAYLIST(playlist.id)}
					>
						{playlist.name}
					</Link>
				</div>
			</div>
		</m.div>
	)
}
