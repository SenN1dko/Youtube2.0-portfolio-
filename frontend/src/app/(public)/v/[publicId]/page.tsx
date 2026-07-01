import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { stripToHtml } from 'utils/strip-html'

import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'
import { VideoPlayer } from '@/ui/video-player/VideoPlayer'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'

import { SimilarVideos } from './SimilarVideos'
import { SubButton } from './SubButton'
import { VideoDescription } from './description/VideoDescription'
import { VideoAction } from './video-actions/VideoAction'
import { VideoChannel } from './video-channel/VideoChannel'
import { videoService } from '@/services/video.services'
import type { TPagePublicIdProp } from '@/types/page.types'

export async function generateMetadata({ params }: TPagePublicIdProp): Promise<Metadata> {
	const { publicId } = await params

	const data = await videoService.byPublicId(publicId)
	const video = data.data

	return {
		title: video?.channel?.owner?.username || 'Video Player',
		description: stripToHtml(video?.description || '').slice(0, 150),
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
		<section className='grid grid-cols-[3fr_.8fr] gap-15'>
			<div>
				<div className='w-full rounded-3xl overflow-hidden relative mb-6 shadow-md '>
					<VideoPlayer fileName={video.videoFileName} />
				</div>
				<div className='flex justify-between pb-6 mb-6 border-b border-border'>
					<div>
						<Heading isH1>{video.title}</Heading>
						<div className='text-gray-400'>{video.views.toLocaleString()} views</div>
					</div>
					<VideoAction video={video} />
				</div>
				<VideoChannel video={video} />
				<VideoDescription description={video.description} />
			</div>
			{!!video.similarVideos.length && <SimilarVideos videos={video.similarVideos} />}
		</section>
	)
}
