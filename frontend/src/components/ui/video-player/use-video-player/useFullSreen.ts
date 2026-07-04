import type { RefObject } from "react"
import type { HTMLCustomVideoElement } from "../video-player.types"

export const useFullScreen = (videoRef:RefObject<HTMLCustomVideoElement>) => {


const toggleFullScreen = () => {
if(!videoRef.current) return 

  if(videoRef.current.requestFullscreen){
    videoRef.current.requestFullscreen()
  }else if(videoRef.current.mozRequestFullScreen){
videoRef.current.mozRequestFullScreen()
  }else if(videoRef.current.webkitRequestFullScreen){
    videoRef.current.webkitRequestFullScreen()
  }else if(videoRef.current.msRequestFullScreen){
    videoRef.current.msRequestFullScreen()
  }
}
return {
    toggleFullScreen
}

}