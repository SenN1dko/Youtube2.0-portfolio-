import { motion, AnimatePresence } from 'framer-motion'
import { Volume1, Volume2, VolumeX } from 'lucide-react'
import { useState } from 'react'

interface Props {
	value?: number
	isMuted: boolean
	toggleMuted: () => void
	toggleVolume: (value: number) => void
}

export function VolumeControl({ isMuted, toggleMuted, toggleVolume, value = 0 }: Props) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className='flex items-center h-10'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className='flex items-center gap-2 bg-white/5 p-2 rounded-full backdrop-blur-sm'>
				<button
					onClick={toggleMuted}
					className='transition-colors hover:text-primary rounded-2xl flex items-center justify-center w-6 h-6 text-white'
				>
					{isMuted || value === 0 ? (
						<VolumeX size={20} />
					) : value < 0.35 ? (
						<Volume1 size={20} />
					) : (
						<Volume2 size={20} />
					)}
				</button>

				<AnimatePresence>
					{isHovered && (
						<motion.div
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: 80, opacity: 1 }}
							exit={{ width: 0, opacity: 0 }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
							className='flex items-center'
						>
							<input
								type='range'
								min={0}
								max={1}
								step={0.01}
								value={value}
								onChange={e => toggleVolume(parseFloat(e.target.value))}
								className='w-20  volume-slider h-1 appearance-none rounded-lg cursor-pointer'
								style={{
									background: `linear-gradient(to right, white ${value * 100}%, rgb(255 255 255 / 20%) ${value * 100}%)`
								}}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
