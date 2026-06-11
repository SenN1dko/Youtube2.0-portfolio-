import type { Metadata } from 'next'
import Image from 'next/image'

import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { transformCount } from '@/utils/transform-count'

import { ChannelVideos } from './ChannelVideos'
import { SubButton } from './SubButton'
import { channelService } from '@/services/channel.services'
import type { TPageSlugProp } from '@/types/page.types'

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const { slug } = await params

	const data = await channelService.bySlug(slug)
	const channel = data.data

	return {
		title: channel.owner.username,
		description: channel.description,
		openGraph: {
			type: 'profile',
			images: [channel.banner]
		}
	}
}

export async function generateStaticParams() {
	const { data } = await channelService.getAll()

	return data.map(channel => ({
		slug: channel.slug
	}))
}

export const revalidate = 100
export const dynamic = 'force-static'

export default async function ChannelPage({ params }: TPageSlugProp) {
	const { slug } = await params

	const data = await channelService.bySlug(slug)
	const channel = data.data
	console.log(channel)

	return (
		<section>
			<div>
				<div className='w-full rounded-3xl h-62.5 overflow-hidden relative '>
					<Image
						alt={channel.owner.username || ''}
						src={channel.banner}
						layout='fill'
						objectFit='cover'
						quality={100}
						priority
					/>
				</div>
				<div className='flex items-start gap-5 mt-7 mb-7'>
					<Image
						alt={channel.slug}
						src={channel.avatar}
						width={160}
						height={160}
						className='rounded-xl'
						quality={100}
						priority
					/>
					<div>
						<Heading isH1>
							<span className='flex items-center gap-2'>
								{channel.owner.username}
								{channel.isVerified && <VerifiedBadge size={20} />}
							</span>
						</Heading>
						<div className='mb-2 text-gray-400 text-sm flex items-center gap-1 '>
							<span>@{channel.slug}</span>
							<span>•</span>
							<span>{transformCount(channel.subscriptions.length)} subscribers</span>
							<span>•</span>
							<span>{channel.videos.length} videos</span>
						</div>
						<article className='mb-2 max-w-xl leading-snug text-gray-400 text-sm'>
							{channel.description}
						</article>
						<SubButton slug={slug} />
					</div>
				</div>
			</div>
			{!!channel.videos.length && <ChannelVideos videos={channel.videos} />}
		</section>
	)
}
