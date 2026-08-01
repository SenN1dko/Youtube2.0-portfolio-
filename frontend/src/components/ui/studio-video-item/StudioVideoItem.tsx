import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { Eye, MessageSquare, ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'

import { processHtmlContent } from '@/utils/process-html-content'

import { StudioVideoActions } from './StudioVideoActions'
import type { IVideoFull } from '@/types/video.types'

interface Props {
	video: IVideoFull
}

export function StudioVideoItem({ video }: Props) {
	const { initialContent } = processHtmlContent(video.description || '', 1)

	return (
		<div className='mb-4 rounded-xl border border-border bg-card/40 p-3 transition-all  md:rounded-none md:border-x-0 md:border-t-0 md:border-b md:bg-transparent md:p-0 md:pb-4  last:border-none'>
			<div className='grid grid-cols-1 gap-3 md:grid-cols-[180px_2fr_1fr_1fr_1fr_1fr_auto] md:items-start md:gap-4'>
				<div className='flex gap-3 md:contents'>
					<Link
						target='_blank'
						href={PAGE.VIDEO(video.publicId)}
						className='relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-gray-800 sm:w-36 md:w-full'
					>
						<Image
							src={video.thumbnailUrl}
							alt={video.title}
							fill
							className='object-cover'
						/>
					</Link>

					<div className='flex min-w-0 flex-1 flex-col justify-center gap-1 md:block'>
						<Link
							className='line-clamp-2 text-sm font-semibold transition-colors hover:text-primary md:text-lg'
							href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
							title={video.title}
						>
							{video.title}
						</Link>
						{initialContent && (
							<div className='line-clamp-1 hidden text-xs text-gray-400 text-muted-foreground md:block'>
								{parse(initialContent)}
							</div>
						)}
						<span className='text-[11px] text-muted-foreground md:hidden'>
							{dayjs(video.createdAt).format('DD MMM YYYY')}
						</span>
					</div>
				</div>

				<div className='hidden flex-col text-[15px] md:flex'>
					<span className='text-gray-400'>{dayjs(video.createdAt).format('DD MMM YYYY')}</span>
					<span className='text-sm text-muted-foreground text-gray-400'>
						{video.isPublic ? 'Published' : 'Draft'}
					</span>
				</div>

				<div className='flex items-center justify-between border-t border-border/50 pt-2 text-xs text-muted-foreground md:hidden'>
					<div className='flex items-center gap-4'>
						<span className='flex items-center gap-1'>
							<Eye className='h-3.5 w-3.5' />
							{video.views.toLocaleString('ru-RU')}
						</span>
						<span className='flex items-center gap-1'>
							<MessageSquare className='h-3.5 w-3.5' />
							{video.comments?.length || 0}
						</span>
						<span className='flex items-center gap-1'>
							<ThumbsUp className='h-3.5 w-3.5' />
							{video.likes?.length || 0}
						</span>
					</div>

					<StudioVideoActions video={video} />
				</div>

				<div className='hidden text-md text-gray-500 md:block'>
					<span className='font-medium'>{video.views.toLocaleString('ru-RU')} views</span>
				</div>

				<div className='hidden text-md text-gray-500 md:block'>
					<span className='font-medium'>{video.comments?.length || 0} comments</span>
				</div>

				<div className='hidden text-md text-gray-500 md:block'>
					<span className='font-medium'>{video.likes?.length || 0} likes</span>
				</div>

				<div className='hidden justify-end md:flex'>
					<StudioVideoActions video={video} />
				</div>
			</div>
		</div>
	)
}
