
import type { IVideo, IVideoSingleResponse, IVideosPagination } from '@/types/video.types'
import { axiosCLassic } from '@/api/axios'
import type { IPaginationParams } from '@/types/pagination.types'

class VideoService {
	private _VIDEOS = '/videos'


async getAll(searchTerm?: string) {
        const response = await axiosCLassic.get<IVideo[]>(this._VIDEOS, {
            params: {
                searchTerm
            }
        })
        return response
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

	async getExploreVideos(userId?: string, params?: IPaginationParams, excludeIds?: string[]) {
		const excludeIdsString = excludeIds?.join(',') || ''
		const { data } = await axiosCLassic.get<IVideosPagination>(`${this._VIDEOS}/explore`, {
			params: userId
				? {
					userId,
					...params,
					excludeIds: excludeIdsString
				}
				: params
		})

		return data
	}
	
	updateViews(publicId:string){
		return axiosCLassic.put(`${this._VIDEOS}/update-views-count/${publicId}` )
		}
	}	
	

export const videoService = new VideoService()
