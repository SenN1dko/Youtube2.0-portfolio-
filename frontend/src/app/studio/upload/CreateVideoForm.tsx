import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Button } from '@/ui/button/Button'

import { STUDIO_PAGE } from '@/config/studio-page.config'

import { VideoForm } from './VideoForm'
import { studioVideoService } from '@/services/studio/studio-video.services'
import type { IVideoFormData } from '@/types/studio-video.type'

interface Props {
	f: UseFormReturn<IVideoFormData, IVideoFormData>
	isReadyToPublish: boolean
}

export function CreateVideoForm({ f, isReadyToPublish }: Props) {
	const router = useRouter()
	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		async onSuccess() {
			const { toast } = await import('react-hot-toast')

			f.reset()
			toast.success('Video successfully published!')
			router.push(STUDIO_PAGE.HOME)
		},
		async onError() {
			const { toast } = await import('react-hot-toast')

			toast.error('Video creating has error!')
		}
	})

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}

	return (
		<form
			onSubmit={f.handleSubmit(onSubmit)}
			className='space-y-4'
		>
			<VideoForm
				f={f}
				isPending={isPending}
			/>
			<div className='text-center pt-2'>
				<Button
					type='submit'
					disabled={!isReadyToPublish || isPending}
					isLoading={isPending}
				>
					{isReadyToPublish ? 'Publish Video' : 'Waiting for processing...'}
				</Button>
			</div>
		</form>
	)
}
