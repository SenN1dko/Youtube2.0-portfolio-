import axios from 'axios'

import type { IVideo } from '@/types/video.types'

class VideoService {
	getTrendingVideos() {
		return axios.get<IVideo[]>('http://localhost:3001/trendingVideos')
	}

	getExploreVideos() {
		return axios.get<IVideo[]>('http://localhost:3001/video')
	}
}

export const videoService = new VideoService()
