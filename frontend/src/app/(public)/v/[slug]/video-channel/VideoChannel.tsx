import Image from 'next/image'
import Link from 'next/link'

import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'

import { SubButton } from '../SubButton'

import type { IVideoSingleResponse } from '@/types/video.types'

export function VideoChannel({ video }: { video: IVideoSingleResponse }) {
	return (
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
					<div className=' text-gray-400 text-sm flex items-center gap-1 transition-all duration-300 hover:text-shadow-glow'>
						{transformCount(video.channel.subscriptions.length)} subscribers
					</div>
				</div>
			</div>
			<SubButton slug={video.channel.slug} />
		</div>
	)
}
