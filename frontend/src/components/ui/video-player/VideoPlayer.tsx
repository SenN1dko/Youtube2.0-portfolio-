'use client'

import { Lightbulb, LightbulbOff, Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react'

import { PlayerProgressbar } from './progress-bar/PlayerProgressbar'
import { SelectQuality } from './quality/SelectQuality'
import { useVideoPlayer } from './use-video-player/useVideoPlayer'
import type { EnumVideoPLayerQuality } from './video-player.types'
import { getTime } from './video.util'
import { VolumeControl } from './volume/VolumeControl'

interface Props {
	fileName: string
	toggleTheaterMode: () => void
	maxResolution: EnumVideoPLayerQuality
}

export function VideoPlayer({ fileName, toggleTheaterMode, maxResolution }: Props) {
	const { fn, state, videoPlayerRef, bgRef } = useVideoPlayer({ fileName, toggleTheaterMode })
	return (
		<>
			<div className='relative rounded-2xl mb-5 '>
				{state.isLightingMode && (
					<video
						ref={bgRef}
						className='absolute top-0 left-0   z-0 w-full h-full object-cover blur-3xl scale-[1.02] brightness-90 contrast-150 saturate-150   mix-blend-lighten' // mix-blend-lighten
						src={`/uploads/videos/${state.quality}/${fileName}`}
						muted
					/>
				)}
				<video
					ref={videoPlayerRef}
					className='  aspect-video relative rounded-xl w-full   z-10 object-fill'
					controls={false}
					src={`/uploads/videos/360p/${fileName}`}
					preload='metadata'
				/>

				<div className=' grid grid-cols-[7fr_1fr] gap-7  z-10  absolute bottom-5 right-5 left-5 '>
					<div className='flex items-center gap-5'>
						<button
							onClick={fn.togglePlayPause}
							className='hover:text-primary transition-colors  bg-white/5 p-2 rounded-full backdrop-blur-sm'
						>
							{state.isPlaying ? <Pause /> : <Play />}
						</button>
						<PlayerProgressbar
							progress={state.progress}
							currentTime={state.currentTime}
							duration={state.videoTime}
							onSeek={fn.onSeek}
							onSeekCommitted={fn.onSeekCommitted}
						/>
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
							maxResolution={maxResolution}
							currentQuality={state.quality}
							onChange={fn.changeQuality}
						/>
						<RectangleHorizontal
							onClick={toggleTheaterMode}
							className='transition-colors w-10 h-10 hover:text-primary cursor-pointer  bg-white/5 p-2 rounded-full backdrop-blur-sm'
						/>
						{state.isLightingMode ? (
							<Lightbulb
								onClick={fn.toggleLightingMode}
								className='transition-colors hover:text-primary cursor-pointer bg-white/5 p-2 h-10 rounded-full w-10 backdrop-blur-sm'
							/>
						) : (
							<LightbulbOff
								className='transition-colors hover:text-primary cursor-pointer bg-white/5 p-2 rounded-full backdrop-blur-sm w-10 h-10'
								onClick={fn.toggleLightingMode}
							/>
						)}
						<button
							className='transition-colors hover:text-primary cursor-pointer bg-white/5 p-2 rounded-full backdrop-blur-sm '
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
