import { Heart, ListPlus } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'

import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { transformCount } from '@/utils/transform-count'

import { SimilarVideos } from './SimilarVideos'
import { SubButton } from './SubButton'
import { videoService } from '@/services/video.services'
import type { TPagePublicIdProp } from '@/types/page.types'

export async function generateMetadata({ params }: TPagePublicIdProp): Promise<Metadata> {
	const { publicId } = await params

	const data = await videoService.byPublicId(publicId)
	const video = data.data

	return {
		title: video?.channel?.owner?.username || 'Video Player',
		description: video?.description || '',
		openGraph: {
			type: 'video.other',
			images: [video.thumbnailUrl]
		}
	}
}

export async function generateStaticParams() {
	const { data } = await videoService.getAll()

	return data.map(video => ({
		publicId: video.publicId
	}))
}

export const revalidate = 100
export const dynamic = 'force-static'

export default async function VideoPage({ params }: TPagePublicIdProp) {
	const { publicId } = await params

	const data = await videoService.byPublicId(publicId)
	const video = data.data

	return (
		<section>
			<div>
				<div className='w-full rounded-3xl h-62.5 overflow-hidden relative '>
					{/* VideoPlayer */}
				</div>
				<div className='flex justify-between'>
					<div>
						<Heading isH1>{video.title}</Heading>
						<div>{video.views.toLocaleString()} views</div>
					</div>
					<div>
						<button>
							<ListPlus /> save
						</button>
						<button className='text-primary'>
							<Heart />
							{transformCount(video.likes.length)}
						</button>
					</div>
				</div>
				<div className='flex items-center justify-between '>
					<div className='flex items-center gap-1.5'>
						<Image
							alt={video.channel.owner.username || ''}
							src={video.channel.avatar}
							width={40}
							height={40}
							className='rounded shrink-0 shadow'
							priority
						/>
						<div>
							<Heading>
								<span className='flex items-center gap-2'>
									{video.channel.owner.username}
									{video.channel.isVerified && <VerifiedBadge size={20} />}
								</span>
							</Heading>
							<div className='mb-2 text-gray-400 text-sm flex items-center gap-1 '>
								{transformCount(video.channel.subscriptions.length)} subscribers
							</div>
						</div>
					</div>
					<SubButton slug={video.channel.slug} />
				</div>
				<article className='mb-2 max-w-xl leading-snug text-gray-400 text-sm'>
					{video.description}
				</article>
			</div>
			{!!video.similarVideos.length && <SimilarVideos videos={video.similarVideos} />}
		</section>
	)
}
