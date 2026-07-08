import { Volume1, Volume2, VolumeX } from 'lucide-react'
import { useRef } from 'react'

interface Props {
	value?: number
	isMuted: boolean
	toggleMuted: () => void
	toggleVolume: (value: number) => void
}

export function VolumeControl({ isMuted, toggleMuted, toggleVolume, value = 0 }: Props) {
	const inputRef = useRef<HTMLInputElement>(null)
	const handleMouseUp = () => {
		if (inputRef.current) {
			inputRef.current.blur()
		}
	}

	return (
		<div className='flex items-center h-10'>
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

				<div className='flex items-center'>
					<input
						ref={inputRef}
						type='range'
						min={0}
						onMouseUp={handleMouseUp}
						max={1}
						step={0.01}
						value={value}
						onChange={e => toggleVolume(parseFloat(e.target.value))}
						className='w-20  volume-slider h-1 appearance-none rounded-lg cursor-pointer'
						style={{
							background: `linear-gradient(to right, white ${value * 100}%, rgb(255 255 255 / 20%) ${value * 100}%)`
						}}
					/>
				</div>
			</div>
		</div>
	)
}
