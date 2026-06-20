
import type { IVideo, IVideoSingleResponse } from '@/types/video.types'
import { axiosCLassic } from '@/api/axios'

class VideoService {
	private _VIDEOS = '/video'


	getAll(searchTerm?: string | null) {
		return axiosCLassic.get<IVideo[]>(this._VIDEOS, searchTerm ? {
			params:{
				searchTerm
			}
		} : {})
	}

	getTrendingVideos() {
		return axiosCLassic.get<IVideo[]>(`${this._VIDEOS}/trendingVideos`)
	}

	 async byPublicId(publicId:string) {
			return axiosCLassic.post<IVideoSingleResponse>(`${this._VIDEOS}/by-publicId/${publicId}`)
		}
	

	getVideoGames() {
		return axiosCLassic.get<IVideo[]>(`${this._VIDEOS}/videoGames`)
	}
	getExploreVideos() {
		return axiosCLassic.get<IVideo[]>(`${this._VIDEOS}`)
	}
}

export const videoService = new VideoService()
