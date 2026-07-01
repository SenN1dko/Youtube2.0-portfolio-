'use client'

import { AnimatePresence } from 'framer-motion'
import { m } from 'framer-motion'

import { useOutside } from '@/hooks/useOutside'

import type { EnumVideoPLayerQuality } from '../video-player.types'

import { VIDEO_QUALITIES } from './qualities.data'

interface Props {
	currentQuality: EnumVideoPLayerQuality
	onChange: (quality: EnumVideoPLayerQuality) => void
}

export function SelectQuality({ onChange, currentQuality }: Props) {
	const { isShow, ref, setIsShow } = useOutside(false)

	return (
		<>
			<button
				ref={ref}
				className='transition-colors hover:text-primary'
				onClick={() => setIsShow(!isShow)}
			>
				{currentQuality}
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
						className='bg-white/10 rounded shadow py-2 px-4 absolute bottom-full right-0'
					>
						{VIDEO_QUALITIES.map(quality =>
							quality === currentQuality ? (
								<li
									className='mb-1 text-primary'
									key={quality}
								>
									<button
										onClick={() => {
											onChange(quality)
											setIsShow(false)
										}}
										className='transition-colors hover:text-primary'
									>
										{quality}
									</button>
								</li>
							) : (
								<li
									className='mb-1'
									key={quality}
								>
									<button
										onClick={() => {
											onChange(quality)
											setIsShow(false)
										}}
										className='transition-colors hover:text-primary'
									>
										{quality}
									</button>
								</li>
							)
						)}
					</m.ul>
				)}
			</AnimatePresence>
		</>
	)
}
