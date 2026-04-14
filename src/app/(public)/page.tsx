import { Flame } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { Explore } from './Explore/Explore'
import { videoService } from '@/services/video.services'

export const revalidate = 100
export const dynamic = 'force-static'

export default async function Home() {
	const data = await videoService.getTrendingVideos()
	const trendingVideos = data.data
	return (
		<>
			<section>
				{!!trendingVideos.length && (
					<section className='mb-10'>
						<Heading Icon={Flame}>Trending</Heading>
						<div className='grid-6'>
							{trendingVideos.map(video => (
								<VideoItem
									key={video.id}
									video={video}
									Icon={Flame}
								/>
							))}
						</div>
					</section>
				)}

				<Explore />
			</section>
		</>
	)
}
