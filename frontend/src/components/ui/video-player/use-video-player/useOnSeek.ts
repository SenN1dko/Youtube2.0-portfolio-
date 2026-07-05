import type { Dispatch, RefObject, SetStateAction } from "react";
import type { HTMLCustomVideoElement } from "../video-player.types";

export function useOnSeek(videoRef:RefObject<HTMLCustomVideoElement> , setCurrentTime:Dispatch<SetStateAction<number>> , bgRef:RefObject<HTMLCustomVideoElement>) {
  const onSeek = (time:number) => {
    if(!videoRef.current) return 
    videoRef.current.currentTime = time
    setCurrentTime(time)
    if(bgRef.current){
    bgRef.current.currentTime = time
    }
  }
  return {
    onSeek
  }
}