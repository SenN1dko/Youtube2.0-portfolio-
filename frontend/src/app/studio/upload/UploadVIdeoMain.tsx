'use client'

import { useQuery } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Heading } from '@/ui/Heading'
import { useUpload } from '@/ui/upload-field/useUpload'

import { CreateVideoForm } from './CreateVideoForm'
import { DragAndDropZone } from './DragAndDropZone'
import { fileService } from '@/services/studio/uploadFile.services'
import type { IVideoFormData } from '@/types/studio-video.type'

export function UploadVideoMain() {
	const f = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const fileName = f.watch('videoFileName')

	const [isReadyToPublish, setIsReadyToPublish] = useState(false)

	const { isLoading: isUploading, uploadFileForUploader } = useUpload({
		async onSuccess(data) {
			const file = data[0]
			if (!file) return
			f.reset({
				...f.getValues(),
				title: f.getValues('title') || file.name.split('.').shift() || '',
				videoFileName: file.name,
				maxResolution: file.maxResolution,
				tags: f.getValues('tags') || [],
				thumbnailUrl: f.getValues('thumbnailUrl') || ''
			})
			const { toast } = await import('react-hot-toast')

			toast.success('File uploaded to server!')
		},
		async onError() {
			const { toast } = await import('react-hot-toast')

			toast.error('Failed to upload the video')
		}
	})

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

	return (
		<div className='absolute inset-0 flex items-center justify-center bg-black/50 z-50'>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				className='relative w-[85%] max-w-240'
			>
				<div className='bg-bg rounded-lg p-6 relative'>
					<Heading
						classname='border-b border-border pb-3 mb-5'
						isH1
					>
						Upload a video
					</Heading>

					{!fileName && (
						<DragAndDropZone
							isUploading={isUploading}
							uploadFileForUploader={uploadFileForUploader}
						/>
					)}

					{fileName && (
						<m.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
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

							<CreateVideoForm
								f={f}
								isReadyToPublish={isReadyToPublish}
							/>
						</m.div>
					)}
				</div>
			</m.div>
		</div>
	)
}
// 45 45
