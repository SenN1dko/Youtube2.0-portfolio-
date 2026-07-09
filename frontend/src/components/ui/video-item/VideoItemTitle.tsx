import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { PAGE } from '@/config/public-page.config'

import type { IVideo } from '@/types/video.types'

interface Props {
	video: Pick<IVideo, 'publicId' | 'title'>
	className?: string
}

export function VideoItemTitle({ className, video }: Props) {
	return (
		<Link
			className={twMerge('line-clamp-2 leading-snug font-bold text-lg', className)}
			href={PAGE.VIDEO(video.publicId)}
		>
			{video.title}
		</Link>
	)
}
