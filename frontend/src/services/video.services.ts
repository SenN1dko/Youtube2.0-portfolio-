
import type { IVideo } from '@/types/video.types'
import { axiosCLassic } from '@/api/axios'

class VideoService {
	private _VIDEOS = '/video'


	getAll(searchTerm: string | null) {
		return axiosCLassic.get<IVideo[]>(`${this._VIDEOS}/${searchTerm}`)
	}

	getTrendingVideos() {
		return axiosCLassic.get<IVideo[]>(`${this._VIDEOS}/trendingVideos`)
	}

	getVideoGames() {
		return axiosCLassic.get<IVideo[]>(`${this._VIDEOS}/videoGames`)
	}
	getExploreVideos() {
		return axiosCLassic.get<IVideo[]>(`${this._VIDEOS}`)
	}
}

export const videoService = new VideoService()
