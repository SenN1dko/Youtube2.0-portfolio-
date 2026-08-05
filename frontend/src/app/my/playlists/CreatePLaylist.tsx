import { useMutation } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { X } from 'lucide-react'
import type { RefObject } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useHotkeys } from 'react-hotkeys-hook'

import { Heading } from '@/ui/Heading'
import { SkeletonLoading } from '@/ui/SkeletonLoading'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'

import { playlistService } from '@/services/Playlist.services'
import type { IPlaylistData } from '@/types/playlist.type'

interface Props {
	refetch: () => void
	onClose: () => void
	ref: RefObject<HTMLDivElement | null>
}

export function CreatePLaylist({ refetch, onClose, ref }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IPlaylistData>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a playlist'],
		mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
		async onSuccess() {
			const { toast } = await import('react-hot-toast')

			refetch()
			reset()
			onClose()
			toast.success('playlist successfully created')
		},
		async onError() {
			const { toast } = await import('react-hot-toast')

			toast.error('Error in creating playlist ')
		}
	})

	useHotkeys('esc', e => {
		e.preventDefault()
		onClose()
	})

	const onSubmit: SubmitHandler<IPlaylistData> = data => {
		mutate(data)
	}

	return (
		<div
			style={{
				position: 'fixed',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				zIndex: 50
			}}
		>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				className='relative w-100'
			>
				<div
					className='bg-gray-800 rounded-lg p-6 w-[90%] max-w-md relative'
					ref={ref}
				>
					<button
						onClick={onClose}
						className='absolute top-2 right-4 w-5 h-5  hover:text-primary transition-colors duration-333 text-gray-600'
						title='close a model'
					>
						<X />
					</button>
					<form onSubmit={handleSubmit(onSubmit)}>
						{isPending ? (
							<SkeletonLoading count={2} />
						) : (
							<>
								<Heading isH1>Create a playlist</Heading>
								<Field
									label='Title'
									type='text'
									registration={register('title', { required: 'title is required' })}
									error={errors.title?.message}
									placeholder='Enter a title:'
								/>
								<Field
									label='Video public id (from url) '
									type='text'
									registration={register('videoPublicId', {
										required: 'video id is required',
										minLength: {
											value: 10,
											message: 'Video public id must be 10 characters exactly'
										},
										maxLength: {
											value: 10,
											message: 'Video public id must be 10 characters exactly'
										}
									})}
									error={errors.videoPublicId?.message}
									placeholder='Enter a video public id:'
								/>
							</>
						)}

						<div className='text-center mt-6'>
							<Button
								type='submit'
								isLoading={isPending}
							>
								Create
							</Button>
						</div>
					</form>
				</div>
			</m.div>
		</div>
	)
}
