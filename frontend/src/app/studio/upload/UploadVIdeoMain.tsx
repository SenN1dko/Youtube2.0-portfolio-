'use client'

import { useQuery } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Heading } from '@/ui/Heading'
import { useUpload } from '@/ui/upload-field/useUpload'

import { DragAndDropZone } from './DragAndDropZone'
import { UploadVideoForm } from './UploadVideoForm'
import type { IVideoFormData } from '@/types/studio-video.type'

export function UploadVideoMain() {
	const f = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const fileName = f.watch('videoFileName')

	const [isReadyToPublish, setIsReadyToPublish] = useState(false)

	const { isLoading: isUploading, uploadFileForUploader } = useUpload({
		onSuccess(data) {
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
			toast.success('File uploaded to server!')
		},
		onError() {
			toast.error('Failed to upload the video')
		}
	})

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
							<UploadVideoForm
								fileName={fileName}
								setIsReadyToPublish={setIsReadyToPublish}
								isReadyToPublish={isReadyToPublish}
								f={f}
							/>
						</m.div>
					)}
				</div>
			</m.div>
		</div>
	)
}
// 45 45
