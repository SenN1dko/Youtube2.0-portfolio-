import type { Dispatch, RefObject, SetStateAction } from "react";
import type { HTMLCustomVideoElement } from "../video-player.types";

export function useOnSeek(
  videoRef: RefObject<HTMLCustomVideoElement>, 
  setCurrentTime: Dispatch<SetStateAction<number>>, 
  bgRef: RefObject<HTMLCustomVideoElement>
) {
  
  const onSeek = (time: number) => {
    setCurrentTime(time);
  };

  const onSeekCommitted = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    if (bgRef.current) {
      bgRef.current.currentTime = time;
    }
  };

  return {
    onSeek,
    onSeekCommitted
  };
}