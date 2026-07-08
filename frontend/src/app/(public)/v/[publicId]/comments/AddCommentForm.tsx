import { useMutation } from '@tanstack/react-query'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { Textarea } from '@/ui/field/Textarea'

import { commentService } from '@/services/comment.services'
import { useAuthStore } from '@/store'
import type { ICommentData } from '@/types/comment.type'

interface Props {
	refetch: () => void
	videoId: string
}

export function AddCommentForm({ refetch, videoId }: Props) {
	const isLoggedIn = useAuthStore(state => state.isLoggedIn)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ICommentData>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['create comment'],
		mutationFn: (data: ICommentData) => commentService.create(data),
		onSuccess: () => {
			refetch()
			reset()
		}
	})

	const onSubmit: SubmitHandler<ICommentData> = ({ text }) => {
		mutate({
			text,
			videoId
		})
	}

	if (!isLoggedIn) return

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='grid grid-cols-[7fr_1fr] gap-5 mb-6 '
			>
				<Textarea
					rows={1}
					registration={register('text', {
						required: true
					})}
					placeholder='Enter a comment:'
					wrapClassName='mb-0'
					error={errors.text?.message}
				/>
				<button
					className='bg-border cursor-pointer hover:bg-border/80 transition-colors rounded font-semibold h-max py-[0.550rem] '
					disabled={isPending}
				>
					{isPending ? 'Commenting...' : 'Comment'}
				</button>
			</form>
		</>
	)
}
