'use client'

import { Maximize, Pause, Play, RectangleHorizontal, RectangleVerticalIcon } from 'lucide-react'

import { PlayerProgressbar } from './progress-bar/PlayerProgressbar'
import { SelectQuality } from './quality/SelectQuality'
import { useVideoPlayer } from './use-video-player/useVideoPlayer'
import { getTime } from './video.util'
import { VolumeControl } from './volume/VolumeControl'

export function VideoPlayer({
	fileName,
	toggleTheaterMode
}: {
	fileName: string
	toggleTheaterMode: () => void
}) {
	const { fn, state, videoPlayerRef } = useVideoPlayer({ fileName, toggleTheaterMode })
	return (
		<>
			<div className='relative rounded-lg overflow-hidden'>
				<video
					ref={videoPlayerRef}
					className='  aspect-video'
					controls={false}
					src={`/uploads/videos/${state.quality}/${fileName}`}
					preload='metadata'
				/>

				<div className=' flex items-center justify-between p-3  absolute bottom-3 right-5 left-5 '>
					<div className='flex items-center gap-5'>
						<button
							onClick={fn.togglePlayPause}
							className='hover:text-primary transition-colors'
						>
							{state.isPlaying ? <Pause /> : <Play />}
						</button>
						<PlayerProgressbar progress={state.progress} />
						<div>
							<span>{getTime(state.videoTime)}</span>
						</div>
					</div>
					<div className='flex items-center gap-3 '>
						<VolumeControl
							isMuted={state.isMuted}
							toggleMuted={fn.toggleMuted}
							toggleVolume={fn.toggleVolume}
							value={state.volume}
						/>
						<SelectQuality
							currentQuality={state.quality}
							onChange={fn.changeQuality}
						/>
						<RectangleHorizontal
							onClick={toggleTheaterMode}
							className='transition-colors hover:text-primary cursor-pointer'
						/>
						<button
							className='transition-colors hover:text-primary cursor-pointer '
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
