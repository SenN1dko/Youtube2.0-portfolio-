'use client'

import { Maximize, Pause, Play } from 'lucide-react'

import { PlayerProgressbar } from './progress-bar/PlayerProgressbar'
import { SelectQuality } from './quality/SelectQuality'
import { useVideoPlayer } from './useVideoPlayer'

export function VideoPlayer({ fileName }: { fileName: string }) {
	const { fn, state, videoPlayerRef } = useVideoPlayer({ fileName })
	return (
		<>
			<div className='	 relative rounded-lg overflow-hidden'>
				<video
					ref={videoPlayerRef}
					className='w-full  h-full aspect-video'
					controls={false}
					src={`/uploads/videos/${state.quality}/${fileName}`}
					preload='metadata'
				/>

				<div className=' flex items-center justify-between p-3  relative'>
					<div className='flex items-center gap-5'>
						<button
							onClick={fn.togglePlayPause}
							className='hover:text-primary transition-colors'
						>
							{state.isPlaying ? <Pause /> : <Play />}
						</button>
						<PlayerProgressbar progress={state.progress} />
						<div>
							<span>
								{Math.floor(state.videoTime / 60) +
									':' +
									('0' + Math.floor(state.videoTime % 60)).slice(-2)}
							</span>
						</div>
					</div>
					<div className='flex items-center gap-5 '>
						<SelectQuality
							currentQuality={state.quality}
							onChange={fn.changeQuality}
						/>
						<button
							className='transition-colors text-primary'
							onClick={fn.toggleFullScreen}
						>
							<Maximize />
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
