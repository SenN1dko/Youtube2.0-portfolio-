import { Heart, ListPlus } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { stripToHtml } from 'utils/strip-html'

import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'

import { SimilarVideos } from './SimilarVideos'
import { SubButton } from './SubButton'
import { VideoDescription } from './description/VideoDescription'
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
		<section className='grid grid-cols-[2.7fr_1fr] gap-10'>
			<div>
				<div className='w-full rounded-3xl h-62.5 overflow-hidden relative mb-6 shadow-md '>
					{/* VideoPlayer */}
				</div>
				<div className='flex justify-between pb-6 mb-6 border-b border-border'>
					<div>
						<Heading isH1>{video.title}</Heading>
						<div className='text-gray-400'>{video.views.toLocaleString()} views</div>
					</div>
					<div className='flex items-center gap-5'>
						<button className='flex items-center gap-1 transition-opacity opacity-75 hover:opacity-100'>
							<ListPlus /> save
						</button>
						<button className='text-primary flex items-center gap-1 transition-opacity opacity-75 hover:opacity-100'>
							<Heart />
							{transformCount(video.likes.length)}
						</button>
					</div>
				</div>
				<div className='flex items-center justify-between mb-6'>
					<div className='flex items-center gap-3'>
						<Link href={PAGE.CHANNEL(video.channel.slug)}>
							<Image
								alt={video.channel.owner.username || ''}
								src={video.channel.avatar}
								width={55}
								height={55}
								className='rounded shrink-0 shadow'
								priority
							/>
						</Link>
						<div>
							<Link href={PAGE.CHANNEL(video.channel.slug)}>
								<Heading classname='m-0'>
									<span className='flex items-center gap-2'>
										{video.channel.owner.username}
										{video.channel.isVerified && <VerifiedBadge size={16} />}
									</span>
								</Heading>
							</Link>
							<div className=' text-gray-400 text-sm flex items-center gap-1 '>
								{transformCount(video.channel.subscriptions.length)} subscribers
							</div>
						</div>
					</div>
					<SubButton slug={video.channel.slug} />
				</div>
				<VideoDescription description={video.description} />
			</div>
			{!!video.similarVideos.length && <SimilarVideos videos={video.similarVideos} />}
		</section>
	)
}
