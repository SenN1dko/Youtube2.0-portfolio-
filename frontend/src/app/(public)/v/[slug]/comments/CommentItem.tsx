import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { PAGE } from '@/config/public-page.config'

import { transformDate } from '@/utils/transform-date'

import { getInitials } from './getInitials'
import type { IVideoSingleResponse } from '@/types/video.types'

const DynamicCommentActions = dynamic(
	() => import('./CommentActions').then(mod => mod.CommentActions),
	{ ssr: false }
)

interface Props {
	comment: IVideoSingleResponse['comments'][0]
	refetch: () => void
}

export function CommentItem({ comment, refetch }: Props) {
	const [text, setText] = useState(comment.text)

	const channelSlug = comment?.user?.channel?.slug || ''
	const channelName = comment?.user?.username || 'Anonymous'
	const avatarUrl = comment?.user?.channel?.avatar || ''

	return (
		<div className='flex gap-3 items-start mb-6 border-b border-border/50 pr-5 pb-3 last:border-none'>
			{comment.user.channel?.avatar ? (
				<Link href={PAGE.CHANNEL(channelSlug)}>
					<Image
						alt={channelName}
						src={avatarUrl}
						width={44}
						height={44}
						className='rounded-lg shrink-0 shadow object-cover'
					/>
				</Link>
			) : (
				<>
					<div className='w-11 h-11 text-xl bg-gray-200 text-gray-800 flex items-center justify-center rounded-lg shrink-0 shadow font-medium'>
						{getInitials(channelName)}
					</div>
				</>
			)}

			<div className=''>
				<div className='flex items-center gap-2 '>
					<Link href={PAGE.CHANNEL(channelSlug)}>
						<Heading>
							<span className='flex items-center gap-2'>
								{channelName}
								{comment?.user?.channel?.isVerified && <VerifiedBadge size={14} />}
							</span>
						</Heading>
					</Link>

					<div className='text-gray-400 text-sm mb-1 transition-all duration-300 hover:text-shadow-glow'>
						{transformDate(comment?.createdAt)}
					</div>
				</div>

				<div>
					<textarea
						className='text-gray-200 font-medium text-[0.9rem] leading-snug mb-1 bg-transparent resize-none outline-none border border-transparent focus:border-border rounded focus:px-2 '
						value={text}
						onChange={e => setText(e.target.value)}
					/>
				</div>

				<DynamicCommentActions
					refetch={refetch}
					comment={comment}
					newText={text}
				/>
			</div>
		</div>
	)
}
