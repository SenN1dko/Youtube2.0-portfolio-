import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import { CommentItem } from './CommentItem'
import { commentService } from '@/services/comment.services'
import type { IVideoSingleResponse } from '@/types/video.types'

const DynamicAddCommentForm = dynamic(
	() => import('./AddCommentForm').then(mod => mod.AddCommentForm),
	{ ssr: false }
)

interface Props {
	video: IVideoSingleResponse
}

export function Comment({ video }: Props) {
	const { data: comments, refetch } = useQuery({
		queryKey: ['comments', video.id],
		queryFn: () => commentService.byVideo(video.publicId),
		initialData: video.comments
	})
	return (
		<div className='border-t border-t-border pt-7 mt-7'>
			<DynamicAddCommentForm
				refetch={refetch}
				videoId={video.publicId}
			/>

			{comments?.map(comment => (
				<CommentItem
					key={comment.id}
					comment={comment}
					refetch={refetch}
				/>
			))}
		</div>
	)
}
