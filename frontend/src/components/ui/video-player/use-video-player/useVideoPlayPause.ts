import { useState, type RefObject } from "react"
import type { HTMLCustomVideoElement } from "../video-player.types"


export const useVideoPlayPause = (videoRef:RefObject<HTMLCustomVideoElement> , bgRef:RefObject<HTMLCustomVideoElement> ) => {
  const [isPlaying , setIsPlaying] = useState(false)

const togglePlayPause = () => {
  if(isPlaying){
videoRef.current?.pause()
if(bgRef.current){

  bgRef.current?.pause()
}
  }else{
videoRef.current?.play()
if(bgRef.current){
  bgRef.current?.play()
}
}
  setIsPlaying(!isPlaying)
}

return{
    isPlaying,
    togglePlayPause,
    setIsPlaying
}
}

