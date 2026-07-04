import { useHotkeys } from "react-hotkeys-hook"
import type { EnumVideoPLayerQuality } from "../video-player.types"
import type { TSkipTime } from "./useVideoSkipTime"


interface Props{
          toggleMuted:() => void
      toggleVolume:(value:number) => void
      togglePlayPause:() => void
      skipTime:(type?:TSkipTime) => void
      toggleFullScreen:() => void
      changeQuality:(quality:EnumVideoPLayerQuality) => void
      toggleTheaterMode:() => void
      volume:number
}

export function useVideoHotKeys({volume, toggleTheaterMode,...fn}:Props) {
  useHotkeys('space' , e => {
    e.preventDefault()
    fn.togglePlayPause()
  })

    useHotkeys('left' , () => {
    fn.skipTime("backward")
  })


    useHotkeys('right' , () => {
    fn.skipTime("forward")
  })

    useHotkeys('m' , () => {
    fn.toggleMuted()
  })

    useHotkeys('up' , e => {
    e.preventDefault()
        fn.toggleVolume(Math.min(volume + 0.1 , 1))
  })
    useHotkeys('down' , e => {
    e.preventDefault()
         fn.toggleVolume(Math.max(volume - 0.1 , 0))
  })

  useHotkeys('f' , () => {
         fn.toggleFullScreen() 
  })
    useHotkeys('t' , () => {
         toggleTheaterMode() 
  })

 
}