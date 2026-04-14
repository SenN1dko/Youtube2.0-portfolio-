import { Gamepad } from 'lucide-react'
import type { Metadata } from 'next'

import { Heading } from '@/ui/Heading'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { videoService } from '@/services/video.services'

export const metadata: Metadata = {
	title: 'VideoGames',
	description: 'Best video games'
}

export const revalidate = 100
export const dynamic = 'force-static'

export default async function VideoGamesPage() {
	const data = await videoService.getVideoGames()
	const videoGames = data.data

	return (
		<>
			<section className='mb-10'>
				<Heading Icon={Gamepad}>VideoGames</Heading>
				<div className='grid-6'>
					{videoGames ? (
						videoGames.map(video => (
							<VideoItem
								key={video.id}
								video={video}
							/>
						))
					) : (
						<p>Video-games are temporary unavailable</p>
					)}
				</div>
			</section>
		</>
	)
}
