import { useMutation } from '@tanstack/react-query'

import { commentService } from '@/services/comment.services'
import { useAuthStore } from '@/store'
import type { IComment } from '@/types/comment.type'

interface Props {
	comment: IComment
	refetch: () => void
	newText: string
}

export function CommentActions({ refetch, comment, newText }: Props) {
	const isLoggedIn = useAuthStore(state => state.isLoggedIn)
	const user = useAuthStore(state => state.user)

	const { mutate: update, isPending } = useMutation({
		mutationKey: ['update comment'],
		mutationFn: () =>
			commentService.update(comment.id, { text: newText, videoId: comment.videoId }),
		onSuccess: () => {
			refetch()
		}
	})
	const { mutate: cDelete, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete comment'],
		mutationFn: () => commentService.delete(comment.id),
		onSuccess: () => {
			refetch()
		}
	})
	if (!isLoggedIn) return
	if (user?.id !== comment.user.id) return

	return (
		<div className='flex items-center gap-3 '>
			<button
				onClick={() => update()}
				disabled={isPending}
				className='text-gray-400 text-sm opacity-90 hover:opacity-100 transition-opacity'
			>
				Save
			</button>

			<button
				onClick={() => cDelete()}
				disabled={isDeletePending}
				className='text-gray-400 text-sm opacity-90 hover:opacity-100 transition-opacity'
			>
				Delete
			</button>
		</div>
	)
}
