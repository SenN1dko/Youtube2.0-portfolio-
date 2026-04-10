
import { Flame } from "lucide-react";
import { Heading } from "@/ui/Heading";
import { Explore } from "./(public)/Explore/Explore";
import { videoService } from "@/services/video.services";
import { VideoItem } from "@/ui/video-item/VideoItem";

export const revalidate = 100
export const dynamic = 'force-static'

export default async function Home() {
	const data = await videoService.getTrendingVideos()
	const trendingVideos = data.data
	return (
		
		<>
		<section className='mb-10'>
			 <Heading Icon={Flame}>Trending</Heading>
        	<div className='grid grid-cols-5 gap-5 '>
			{trendingVideos &&
					trendingVideos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
							Icon={Flame}
						/>
					))}
		</div>
		</section>

		<section>
			<Explore/>
		</section>
		</>
	)
}
//16 21:00