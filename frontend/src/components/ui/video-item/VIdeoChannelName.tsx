import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { PAGE } from '@/config/public-page.config'

import { VerifiedBadge } from '../VerifiedBadge'

import type { IChannel } from '@/types/channel.types'

interface Props {
	channel: IChannel
	className?: string
}

export function VIdeoChannelName({ className, channel }: Props) {
	return (
		<Link
			href={PAGE.CHANNEL(channel.slug)}
			className='flex items-center gap-1'
		>
			<span className={twMerge('text-gray-400 text-sm font-semibold', className)}>
				{channel.slug}
			</span>
			<span>{channel.isVerified && <VerifiedBadge />}</span>
		</Link>
	)
}
