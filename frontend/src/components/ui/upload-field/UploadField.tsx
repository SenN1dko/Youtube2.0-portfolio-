import Image from 'next/image'
import { useId } from 'react'
import type { FieldError } from 'react-hook-form'

import { SkeletonLoading } from '../SkeletonLoading'

import { useUpload } from './useUpload'

interface Props {
	label: string
	onChange: (url: string) => void
	folder?: string
	className?: string
	error?: FieldError
	value?: string
	isImage?: boolean
	aspectRatio?: '16:9' | '1:1'
}
export function UploadField({
	error,
	label,
	onChange,
	folder,
	className,
	isImage = true,
	value,
	aspectRatio = '1:1'
}: Props) {
	const { isLoading, uploadFile } = useUpload({ onChange, folder })
	const inputId = useId()
	const isWideScreen = aspectRatio === '16:9'
	const width = isWideScreen ? 250 : 100
	const height = isWideScreen ? 140 : 100
	console.log('value', value)
	return (
		<div className={className}>
			<label
				htmlFor={inputId}
				className='text-gray-400 font-semibold block mb-2 '
			>
				{label}
			</label>
			<input
				type='file'
				id={inputId}
				accept='image/*'
				onChange={uploadFile}
				className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none'
			/>
			{error && <span className='text-red-500 text-xs'>{error.message}</span>}
			{isImage && (
				<div className='mt-4'>
					{isLoading ? (
						<SkeletonLoading
							style={{
								width,
								height
							}}
						/>
					) : (
						!!value && (
							<Image
								alt='uploaded file'
								src={value}
								width={width}
								height={height}
							/>
						)
					)}
				</div>
			)}
		</div>
	)
}
