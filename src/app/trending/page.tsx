import { videoService } from '@/services/video.services'
import { Heading } from '@/ui/Heading'
import { VideoItem } from '@/ui/video-item/VideoItem'
import { Divide, Flame } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Trending',
	description: 'Trending...'
}

export const revalidate = 100
export const dynamic = 'force-static'

export default async function TrendingPage() {
	const data = await videoService.getTrendingVideos()
	const trendingVideos = data.data

	return <>
			<section className='mb-10'>
			 <Heading Icon={Flame}>Trending</Heading>
        	<div className='grid-6'>
			{trendingVideos ?
					trendingVideos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
							Icon={Flame}
						/>
					)):<p>Trends are temporary unavailable</p>}
		</div>
		</section>
	</>
}
