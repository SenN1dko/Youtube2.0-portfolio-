'use client'

import {  useRef } from "react"
import { type HTMLCustomVideoElement } from "../video-player.types"
import { useVideoPlayPause } from "./useVideoPlayPause"
import { useVideoFullScreen,  } from "./useVideoFullSreen"
import { useVideoQuality } from "./useVideoQuality"
import { useVideoSkipTime } from "./useVideoSkipTime"
import { useVideoProgressBar } from "./useVideoProgressBar"
import { useVideoVolume } from "./useVideoVolume"
import { useVideoHotKeys } from "./useVideoHotKeys"

interface Props{
    fileName:string
    toggleTheaterMode:() => void
}



export function useVideoPlayer({fileName , toggleTheaterMode}:Props) {
  const videoPlayerRef = useRef<HTMLCustomVideoElement>(null!)




const { isPlaying, togglePlayPause ,setIsPlaying } = useVideoPlayPause(videoPlayerRef)
const { currentTime ,progress ,videoTime , setVideoTime } = useVideoProgressBar(videoPlayerRef)
const { quality, changeQuality  } = useVideoQuality(videoPlayerRef, { fileName, currentTime, setIsPlaying, setVideoTime, isPlaying })
const { skipTime  } = useVideoSkipTime( videoPlayerRef )
const { toggleFullScreen  } = useVideoFullScreen( videoPlayerRef )

const {isMuted, toggleMuted,toggleVolume,volume} = useVideoVolume(videoPlayerRef)

const fn = {
       toggleMuted,
      toggleVolume,
      togglePlayPause,
      skipTime,
      toggleFullScreen,
      changeQuality,
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
      volume
    },
    fn,
    videoPlayerRef,
  }
}