import type { HTMLCustomVideoElement } from "../video-player.types"

export const useSkipTime = ( videoPlayerRef: React.RefObject<HTMLCustomVideoElement> ) => {

const SKIP_TIME_SEC = 10

const skipTime = (type?: 'forward' | 'backward') => {
if(!videoPlayerRef.current?.currentTime) return 

if(type === 'forward'){
  videoPlayerRef.current.currentTime += SKIP_TIME_SEC
}else if(type === 'backward'){
  videoPlayerRef.current.currentTime -= SKIP_TIME_SEC
}
}

return{
    skipTime
}

}