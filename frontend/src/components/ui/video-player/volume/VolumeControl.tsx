import { Volume1, Volume2, VolumeX } from 'lucide-react'

interface Props {
	value?: number
	isMuted: boolean
	toggleMuted: () => void
	toggleVolume: (value: number) => void
}

export function VolumeControl({ isMuted, toggleMuted, toggleVolume, value }: Props) {
	return (
		<>
			<div className='w-6 overflow-x-hidden flex items-center hover:w-full gap-3 '>
				<button
					onClick={toggleMuted}
					className='transition-colors hover:text-primary'
				>
					{isMuted ? <VolumeX /> : value && value < 0.35 ? <Volume1 /> : <Volume2 />}
				</button>
				<input
					type='range'
					min={0}
					max={1}
					step={0.01}
					value={value}
					onChange={e => toggleVolume(parseFloat(e.target.value))}
					className='w-20 p-0 volume-slider h-1 appearance-none bg-white rounded-lg cursor-pointer transition-all '
					style={{
						background: `linear-gradient(to right ,white ${value && value * 100}% , rgba(255,255,255 , 0.2 )  ${value && value * 100}%)`
					}}
				/>
			</div>
		</>
	)
}
