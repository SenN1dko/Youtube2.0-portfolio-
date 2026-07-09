import { instance } from '@/api/axios'
import type { IVideoFull } from '@/types/video.types'

class WatchHistoryService { 
    private _WATCH_HISTORY = '/watch-history'

    getUserHistory() {
        return instance.get<{video: IVideoFull}[]>(this._WATCH_HISTORY)
    }

    addToHistory(videoId: string) {
        return instance.post<{ success: boolean; message: string }>(
            this._WATCH_HISTORY, 
            { videoId }
        )
    }

    clearHistory() {
        return instance.delete<{ success: boolean; message: string }>(
            this._WATCH_HISTORY
        )
    }
}

export const watchHistoryService = new WatchHistoryService()