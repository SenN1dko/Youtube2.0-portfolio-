import axios from 'axios'

import type { Users } from '@/types/users.type'
import type { IVideo } from '@/types/video.types'

class VideoService {
	getExploreVideos() {
		return axios.get<IVideo[]>('http://localhost:3001/video')
	}
}

export const videoService = new VideoService()
