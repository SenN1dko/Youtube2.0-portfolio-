import { useEffect, useState } from 'react'

import type { HTMLCustomVideoElement } from '../video-player.types'
import { getVideoInfo } from '../video.util'


export const useVideoProgressBar = (
	videoRef: React.RefObject<HTMLCustomVideoElement>,
) => {
	const [currentTime, setCurrentTime] = useState(0)
	const [progress, setProgress] = useState(0)
	const [videoTime, setVideoTime] = useState(0)

	useEffect(() => {
		if (!videoRef.current) return
		if (isNaN(videoRef.current.duration)) return
		const { currentTime, progress, originalTime } = getVideoInfo(videoRef.current)
		setCurrentTime(currentTime)
		setVideoTime(originalTime)
		setProgress(progress)
	}, [videoRef, videoRef.current?.duration, setVideoTime])

	useEffect(() => {
		const videoPlayer = videoRef.current
		const updateProgress = () => {
			if (!videoPlayer) return
			const { currentTime, progress } = getVideoInfo(videoPlayer)
			setCurrentTime(currentTime)
			setProgress(progress)
		}

		videoPlayer?.addEventListener('timeupdate', updateProgress)
		return () => {
			videoPlayer?.removeEventListener('timeupdate', updateProgress)
		}
	}, [videoRef])

	return {
		currentTime,
		setCurrentTime,
		progress,videoTime,setVideoTime
	}
}
