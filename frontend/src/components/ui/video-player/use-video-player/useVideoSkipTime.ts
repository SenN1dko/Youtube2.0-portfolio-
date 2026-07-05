import type { HTMLCustomVideoElement } from "../video-player.types"

export type TSkipTime = 'forward' | 'backward'


export const useVideoSkipTime = ( videoPlayerRef: React.RefObject<HTMLCustomVideoElement> ,bgRef: React.RefObject<HTMLCustomVideoElement> ) => {

const SKIP_TIME_SEC = 10



const skipTime = (type?:TSkipTime ) => {
if(!videoPlayerRef.current?.currentTime) return 

if(type === 'forward'){
  videoPlayerRef.current.currentTime += SKIP_TIME_SEC
  if(bgRef.current){
  bgRef.current.currentTime += SKIP_TIME_SEC
  }
}else if(type === 'backward'){
  videoPlayerRef.current.currentTime -= SKIP_TIME_SEC
  if(bgRef.current){
  bgRef.current.currentTime -= SKIP_TIME_SEC
  }
}
}

return{
    skipTime
}

}