import Image from 'next/image'
import { Controller, type UseFormReturn } from 'react-hook-form'

import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'
import { TagsField } from '@/ui/tagsField/TagsField'
import { UploadField } from '@/ui/upload-field/UploadField'

import { LoaderForUploader } from './LoaderForUploader'
import type { IVideoFormData } from '@/types/studio-video.type'

interface Props {
	isPending?: boolean
	f: UseFormReturn<IVideoFormData, IVideoFormData>
}

export function VideoForm({
	f: {
		formState: { errors },
		control,
		register,
		watch
	},

	isPending
}: Props) {
	return (
		<>
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
								registration={register('title', { required: 'Title is required' })}
								error={errors.title?.message}
								placeholder='Enter a title:'
							/>
							<Textarea
								label='Description'
								rows={5}
								registration={register('description', {
									required: 'Description is required!'
								})}
								placeholder='Enter description:'
								wrapClassName='mb-0'
								error={errors.description?.message}
							/>
							<Controller
								control={control}
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
								control={control}
								name='tags'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TagsField
										key={value?.join(',') || 'empty'}
										error={error?.message}
										label='Tags:'
										initialTags={value || []}
										onTagsChange={onChange}
									/>
								)}
							/>
						</div>
						<div>
							<div className='bg-gray-700  rounded-md overflow-hidden'>
								{watch('thumbnailUrl') ? (
									<Image
										alt='Uploaded thumbnail'
										src={watch('thumbnailUrl')}
										width={360}
										height={190}
										className='w-full'
									/>
								) : (
									<div className='w-87.5 h-47.5 bg-gray-950 text-sm flex items-center justify-center font-semibold'>
										Wait thumbnail...
									</div>
								)}
								<div className='text-sm p-2'>
									<span className='text-gray-400 text-[0.9rem] block mb-0.5'>File name:</span>
									<span>{watch('videoFileName')}</span>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	)
}
