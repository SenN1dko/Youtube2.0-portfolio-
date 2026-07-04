import { useEffect, useState, type RefObject } from "react"
import { EnumVideoPLayerQuality, type HTMLCustomVideoElement } from "../video-player.types"
import { getVideoInfo } from "../video.util"


interface Props {
    fileName:string,
    currentTime:number,
    setIsPlaying:React.Dispatch<React.SetStateAction<boolean>>,
    setVideoTime:React.Dispatch<React.SetStateAction<number>>,
    isPlaying:boolean,
}

export const useVideoQuality = (videoRef:RefObject<HTMLCustomVideoElement> , {currentTime,fileName,setIsPlaying , setVideoTime,isPlaying}:Props ) => {
const [quality , setQuality ] = useState(EnumVideoPLayerQuality["1080p"])

  const changeQuality = (quality:EnumVideoPLayerQuality) => {
    if(!videoRef.current) return 
console.log(quality , fileName)
    setQuality(quality)
    videoRef.current.src =`uploads/videos/${quality}/${fileName}`
  }


  useEffect(() => {
    const videoPlayer = videoRef.current
    if (!videoPlayer) return
  
    const handleLoadedMetadata = () => {
      const { originalTime } = getVideoInfo(videoPlayer)
      setVideoTime(originalTime) 
  
      videoPlayer.currentTime = currentTime
  
      if (isPlaying) {
        setIsPlaying(true)
        videoPlayer.play().catch(error => {
            setIsPlaying(false)
          console.error("Playback error:", error)
        })
      }
    }
  
    videoPlayer.addEventListener('loadedmetadata', handleLoadedMetadata)
  
    return () => {
      videoPlayer.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [quality, isPlaying , currentTime, setIsPlaying, setVideoTime , videoRef]) 
  

return{
    quality,
    changeQuality,
}
}

