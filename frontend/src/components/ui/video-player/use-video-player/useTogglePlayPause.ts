import { useState, type RefObject } from "react"
import type { HTMLCustomVideoElement } from "../video-player.types"


export const useTogglePlayPause = (videoRef:RefObject<HTMLCustomVideoElement> ) => {
  const [isPlaying , setIsPlaying] = useState(false)

const togglePlayPause = () => {
  if(isPlaying){
videoRef.current?.pause()
  }else{
videoRef.current?.play()
  }
  setIsPlaying(!isPlaying)
}

return{
    isPlaying,
    togglePlayPause,
    setIsPlaying
}
}

