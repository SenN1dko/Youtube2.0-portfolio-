import { useMutation, useQuery } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { Controller, type SubmitHandler, type UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'

import { SkeletonLoading } from '@/ui/SkeletonLoading'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'
import { TagsField } from '@/ui/tagsField/TagsField'
import { UploadField } from '@/ui/upload-field/UploadField'

import { STUDIO_PAGE } from '@/config/studio-page.config'

import { LoaderForUploader } from './LoaderForUploader'
import { studioVideoService } from '@/services/studio/studio-video.services'
import { fileService } from '@/services/studio/uploadFile.services'
import type { IVideoFormData } from '@/types/studio-video.type'

interface Props {
	f: UseFormReturn<IVideoFormData, IVideoFormData>
	fileName: string
	isReadyToPublish: boolean
	setIsReadyToPublish: Dispatch<SetStateAction<boolean>>
}

export function UploadVideoForm({ f, isReadyToPublish, fileName, setIsReadyToPublish }: Props) {
	const {
		formState: { errors }
	} = f

	const router = useRouter()
	const [processingProgress, setProcessingProgress] = useState(0)

	const { data: processingData, isSuccess } = useQuery({
		queryKey: ['trackProcessStatus', fileName],
		queryFn: () => fileService.getProcessingStatus(fileName),
		enabled: !!fileName,
		refetchInterval(query) {
			console.log('1sec')
			const progress = query.state.data?.data
			return progress !== undefined && progress < 100 ? 1000 : false
		}
	})

	useEffect(() => {
		const progressResponse = processingData?.data
		if (progressResponse === undefined) return

		setProcessingProgress(progressResponse)

		if (progressResponse === 100) {
			setIsReadyToPublish(true)
			toast.success('Video processed successfully!')
		}
		if (progressResponse === -1) {
			toast.error('Video processing failed')
			return
		}
	}, [isSuccess, processingData?.data, setIsReadyToPublish])

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		onSuccess() {
			f.reset()
			toast.success('Video successfully published!')
			router.push(STUDIO_PAGE.HOME)
		},
		onError() {
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
			<div className='p-3  rounded-lg border border-border/50'>
				<div className='flex justify-between text-xs text-gray-400 mb-1'>
					<span className='font-semibold text-white text-[15px]'>
						Processing video <span className='font-bold '>{processingProgress}%</span>
					</span>
				</div>
				<div className='w-full bg-gray-700/40 h-3 rounded-full overflow-hidden'>
					<m.div
						animate={{ width: `${processingProgress}%` }}
						className='h-full bg-primary transition-all duration-300'
					/>
				</div>
			</div>
			<div className='grid grid-cols-[2.5fr_1fr] gap-5'>
				{isPending ? (
					<>
						<LoaderForUploader />
					</>
				) : (
					<>
						<div className='border-r border-border pr-5'>
							<Field
								label='Title'
								type='text'
								registration={f.register('title', { required: 'Title is required' })}
								error={errors.title?.message}
								placeholder='Enter a title:'
							/>
							<Textarea
								label='Description'
								rows={5}
								registration={f.register('description', {
									required: 'Description is required!'
								})}
								placeholder='Enter description:'
								wrapClassName='mb-0'
								error={errors.description?.message}
							/>
							<Controller
								control={f.control}
								name='thumbnailUrl'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<UploadField
										error={error}
										label='Thumbnail:'
										value={value}
										folder='thumbnails'
										aspectRatio='16:9'
										onChange={onChange}
										className='mb-4'
									/>
								)}
							/>
							<Controller
								control={f.control}
								name='tags'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TagsField
										error={error?.message}
										label='Tags:'
										initialTags={value}
										onTagsChange={onChange}
									/>
								)}
							/>
						</div>
						<div>
							<div className='bg-gray-700  rounded-md overflow-hidden'>
								{f.watch('thumbnailUrl') ? (
									<Image
										alt='Uploaded thumbnail'
										src={f.watch('thumbnailUrl')}
										width={350}
										height={190}
									/>
								) : (
									<div className='w-[350px] h-[190px] bg-gray-950 text-sm flex items-center justify-center font-semibold'>
										Wait thumbnail...
									</div>
								)}
								<div className='text-sm p-2'>
									<span className='text-gray-400 text-[0.9rem] block mb-0.5'>File name:</span>
									<span>{f.watch('videoFileName')}</span>
								</div>
							</div>
						</div>
					</>
				)}
			</div>

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
