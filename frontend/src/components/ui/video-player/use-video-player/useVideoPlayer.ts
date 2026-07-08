'use client'

import {  useRef, useState } from "react"
import { type HTMLCustomVideoElement } from "../video-player.types"
import { useVideoPlayPause } from "./useVideoPlayPause"
import { useVideoFullScreen,  } from "./useVideoFullSreen"
import { useVideoQuality } from "./useVideoQuality"
import { useVideoSkipTime } from "./useVideoSkipTime"
import { useVideoProgressBar } from "./useVideoProgressBar"
import { useVideoVolume } from "./useVideoVolume"
import { useVideoHotKeys } from "./useVideoHotKeys"
import { useOnSeek } from "./useOnSeek"

interface Props{
    fileName:string
    toggleTheaterMode:() => void
}



export function useVideoPlayer({fileName , toggleTheaterMode}:Props) {
  const videoPlayerRef = useRef<HTMLCustomVideoElement>(null!)
const bgRef = useRef<HTMLCustomVideoElement>(null!)   
const [isLightingMode, setIsLightingMode] = useState(true)


const { isPlaying, togglePlayPause ,setIsPlaying } = useVideoPlayPause(videoPlayerRef , bgRef)
const { currentTime ,progress ,videoTime , setVideoTime  ,setCurrentTime} = useVideoProgressBar(videoPlayerRef)
const { quality, changeQuality  } = useVideoQuality(videoPlayerRef, { fileName, currentTime, setIsPlaying, setVideoTime, isPlaying })
const { skipTime  } = useVideoSkipTime( videoPlayerRef,bgRef )
const { toggleFullScreen  } = useVideoFullScreen( videoPlayerRef )

const {isMuted, toggleMuted,toggleVolume,volume} = useVideoVolume(videoPlayerRef)

const {onSeek ,onSeekCommitted} = useOnSeek(videoPlayerRef ,setCurrentTime , bgRef )

const fn = {
       toggleMuted,
       onSeek,
      toggleVolume,
      togglePlayPause,
      skipTime,
      toggleFullScreen,
      changeQuality,
      onSeekCommitted,
      toggleLightingMode:() => setIsLightingMode(!isLightingMode)
}

useVideoHotKeys({volume , toggleTheaterMode , ...fn })

  return {
    state:{
      videoTime,
      isPlaying,
      progress,
      quality,
      currentTime,
      isMuted,
      volume,
      isLightingMode
    },
    fn,
    videoPlayerRef,
    bgRef,
  }
}