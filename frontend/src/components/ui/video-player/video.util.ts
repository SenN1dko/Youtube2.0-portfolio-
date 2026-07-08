import type { HTMLCustomVideoElement } from "./video-player.types";

export const getVideoInfo = (video:HTMLCustomVideoElement) => {
     const originalTime = video.duration || 0
    const currentTime = video.currentTime || 1
return{
    originalTime,
    currentTime,
    progress:currentTime/originalTime   * 100
}
}
export const getTime = (time:number) => {
    return Math.floor(time / 60) +
									':' +
									('0' + Math.floor(time % 60)).slice(-2)
} 