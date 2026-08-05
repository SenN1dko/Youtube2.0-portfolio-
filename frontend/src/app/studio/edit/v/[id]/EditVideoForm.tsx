'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Edit } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { Heading } from '@/ui/Heading'
import { Button } from '@/ui/button/Button'

import { STUDIO_PAGE } from '@/config/studio-page.config'

import { VideoForm } from '@/app/studio/upload/VideoForm'
import { studioVideoService } from '@/services/studio/studio-video.services'
import type { IVideoFormData } from '@/types/studio-video.type'

export function EditVideoForm() {
	const { id } = useParams()

	const queryClient = useQueryClient()

	const router = useRouter()

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['get studio video', id],
		queryFn: () => studioVideoService.byId(id as string),
		enabled: !!id
	})

	const f = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	useEffect(() => {
		if (isSuccess && data?.data) {
			const initialVideo = data.data

			f.reset({
				description: initialVideo.description,
				tags: initialVideo.tags,
				title: initialVideo.title,
				videoFileName: initialVideo.videoFileName,
				thumbnailUrl: initialVideo.thumbnailUrl,
				maxResolution: initialVideo.maxResolution
			})
		}
	}, [isSuccess, data, f])

	const { mutate, isPending } = useMutation({
		mutationKey: ['edit a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.update(data, id as string),
		async onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			})
			const { toast } = await import('react-hot-toast')

			toast.success('Video successfully updated!')
			router.push(STUDIO_PAGE.HOME)
		},
		async onError() {
			const { toast } = await import('react-hot-toast')

			toast.error('Video updating has error!')
		}
	})

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}

	return (
		<div className='max-w-7xl mx-auto'>
			<Heading
				isH1
				Icon={Edit}
				classname='mb-4'
			>
				Edit Video
			</Heading>
			<form
				onSubmit={f.handleSubmit(onSubmit)}
				className='max-w-7xl mx-auto '
			>
				<VideoForm
					f={f}
					isPending={isPending || isLoading}
				/>
				<div className='text-left pt-2'>
					<Button
						type='submit'
						isLoading={isPending}
					>
						Update
					</Button>
				</div>
			</form>
		</div>
	)
}
