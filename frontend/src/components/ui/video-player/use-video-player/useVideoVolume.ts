import { useEffect, useState } from "react";
import type { HTMLCustomVideoElement } from "../video-player.types";

export function useVideoVolume(videoRef: React.RefObject<HTMLCustomVideoElement>) {
  const [volume , setVolume] = useState(0.2)
  const [isMuted , setIsMuted] = useState(false)
  

useEffect(() => {
    videoRef.current.volume = volume
} )

  const toggleVolume = (value:number) => {
    if(!videoRef.current) return
    videoRef.current.volume = value
    setVolume(value)
    setIsMuted(value === 0)
  }

  const toggleMuted = () => {
    if(!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }
  
  
  return {
    volume,
    isMuted,
    toggleVolume,
    toggleMuted
  }
}