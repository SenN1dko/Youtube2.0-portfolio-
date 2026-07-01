'use client'

import { useEffect, useRef, useState } from "react"
import { EnumVideoPLayerQuality, type HTMLCustomVideoElement } from "./video-player.types"
import { getVideoInfo } from "./video.util"

interface Props{
    fileName:string
}

const SKIP_TIME_SEC = 10

export function useVideoPlayer({fileName}:Props) {
  const videoPlayerRef = useRef<HTMLCustomVideoElement>(null)
const [isPlaying , setIsPlaying] = useState(false)
const [quality , setQuality ] = useState(EnumVideoPLayerQuality["1080p"])
const [currentTime , setCurrentTime] = useState(0)
const [videoTime , setVideoTime] = useState(0)
const [progress , setProgress] = useState(0)


const togglePlayPause = () => {
  if(isPlaying){
videoPlayerRef.current?.pause()
  }else{
videoPlayerRef.current?.play()
  }
  setIsPlaying(!isPlaying)
}


const skipTime = (type?: 'forward' | 'backward') => {
if(!videoPlayerRef.current?.currentTime) return 

if(type === 'forward'){
  videoPlayerRef.current.currentTime += SKIP_TIME_SEC
}else if(type === 'backward'){
  videoPlayerRef.current.currentTime -= SKIP_TIME_SEC
}
}


const toggleFullScreen = () => {
if(!videoPlayerRef.current) return 

  if(videoPlayerRef.current.requestFullscreen){
    videoPlayerRef.current.requestFullscreen()
  }else if(videoPlayerRef.current.mozRequestFullScreen){
videoPlayerRef.current.mozRequestFullScreen()
  }else if(videoPlayerRef.current.webkitRequestFullScreen){
    videoPlayerRef.current.webkitRequestFullScreen()
  }else if(videoPlayerRef.current.msRequestFullScreen){
    videoPlayerRef.current.msRequestFullScreen()
  }
}

  const changeQuality = (quality:EnumVideoPLayerQuality) => {
    if(!videoPlayerRef.current) return 
console.log(quality , fileName)
    setQuality(quality)
    videoPlayerRef.current.src =`uploads/videos/${quality}/${fileName}`
  }

useEffect(() => {
  const videoPlayer = videoPlayerRef.current
  if (!videoPlayer) return

  const handleLoadedMetadata = () => {
    const { originalTime } = getVideoInfo(videoPlayer)
    setVideoTime(originalTime) 

    videoPlayer.currentTime = currentTime

    if (isPlaying) {
      videoPlayer.play().catch(error => {
        console.error("Playback error:", error)
      })
    }
  }

  videoPlayer.addEventListener('loadedmetadata', handleLoadedMetadata)

  return () => {
    videoPlayer.removeEventListener('loadedmetadata', handleLoadedMetadata)
  }
}, [quality, isPlaying]) 

  useEffect(() => {

    if(!videoPlayerRef.current) return 
    if (isNaN(videoPlayerRef.current.duration)) return
    const { currentTime , progress , originalTime } = getVideoInfo(videoPlayerRef.current)
    setCurrentTime(currentTime)
    setVideoTime(originalTime)
    setProgress(progress)
  },[videoPlayerRef.current?.duration])

  useEffect(() => {
    const videoPlayer = videoPlayerRef.current
    const updateProgress = () => {
    if(!videoPlayer) return 
    const { currentTime , progress } = getVideoInfo(videoPlayer)
    setCurrentTime(currentTime)
    setProgress(progress)
    }

    videoPlayer?.addEventListener('timeupdate' ,updateProgress)
    return() => {
      videoPlayer?.removeEventListener('timeupdate' , updateProgress)
    }
  } , [])

  return {
    state:{
      videoTime,
      isPlaying,
      progress,
      quality,
      currentTime,
    },
    fn:{
      togglePlayPause,
      skipTime,
      toggleFullScreen,
      changeQuality,
    },
    videoPlayerRef,
  }
}