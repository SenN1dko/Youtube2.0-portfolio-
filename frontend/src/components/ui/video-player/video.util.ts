import type { HTMLCustomVideoElement } from "./video-player.types";

export const getVideoInfo = (video:HTMLCustomVideoElement) => {
     const originalTime = video.duration
    const currentTime = video.currentTime
return{
    originalTime,
    currentTime,
    progress:currentTime/originalTime   * 100
}
}