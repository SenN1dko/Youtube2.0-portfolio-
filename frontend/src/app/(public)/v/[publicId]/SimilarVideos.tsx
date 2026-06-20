import { VideoItem } from '@/ui/video-item/VideoItem'

import type { IVideoSingleResponse } from '@/types/video.types'

export function SimilarVideos({ videos }: { videos: IVideoSingleResponse['similarVideos'] }) {
	return (
		<div className='grid grid-cols-1'>
			{videos.map(video => (
				<VideoItem
					key={video.id}
					video={video}
				/>
			))}
		</div>
	)
}
