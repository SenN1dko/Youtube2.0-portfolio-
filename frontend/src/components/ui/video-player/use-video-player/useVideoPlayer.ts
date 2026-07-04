'use client'

import {  useRef } from "react"
import { type HTMLCustomVideoElement } from "../video-player.types"
import { useTogglePlayPause } from "./useTogglePlayPause"
import { useFullScreen,  } from "./useFullSreen"
import { useVideoQuality } from "./useVideoQuality"
import { useSkipTime } from "./useSkipTime"
import { useProgressBar } from "./useProgressBar"

interface Props{
    fileName:string
}



export function useVideoPlayer({fileName}:Props) {
  const videoPlayerRef = useRef<HTMLCustomVideoElement>(null!)




const { isPlaying, togglePlayPause ,setIsPlaying } = useTogglePlayPause(videoPlayerRef)
const { currentTime ,progress ,videoTime , setVideoTime } = useProgressBar(videoPlayerRef)
const { quality, changeQuality  } = useVideoQuality(videoPlayerRef, { fileName, currentTime, setIsPlaying, setVideoTime, isPlaying })
const { skipTime  } = useSkipTime( videoPlayerRef )
const { toggleFullScreen  } = useFullScreen( videoPlayerRef )





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