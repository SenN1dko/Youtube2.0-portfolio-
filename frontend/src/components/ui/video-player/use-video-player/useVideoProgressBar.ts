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
		const player = videoRef.current 
		if (!player) return


		const handleMetaData = () => {

			const { currentTime, progress, originalTime } = getVideoInfo(player)
			setCurrentTime(currentTime)
			setVideoTime(originalTime)
			setProgress(progress)
		}

		player?.addEventListener('loadedmetadata', handleMetaData)

		if(player.readyState >= 1){
			handleMetaData()
		}
		return () => {
			player?.removeEventListener('loadedmetadata', handleMetaData)
		}
	}, [videoRef])

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
	}, [videoRef ])

	return {
		currentTime,
		setCurrentTime,
		progress,videoTime,setVideoTime
	}
}
