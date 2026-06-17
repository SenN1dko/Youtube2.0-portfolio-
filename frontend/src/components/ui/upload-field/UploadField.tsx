import { UploadCloud } from 'lucide-react'
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
	const width = isWideScreen ? 300 : 100
	const height = isWideScreen ? 190 : 100
	return (
		<div className={className}>
			<label
				htmlFor={inputId}
				className='text-gray-400 font-semibold block mb-2 '
			>
				{label}
			</label>
			<label
				htmlFor={inputId}
				className='flex items-center px-4 py-2 bg-transparent border border-primary text-primary hover:text-white rounded-lg shadow-md cursors-pointer hover:bg-red-500 w-max  transition-colors duration-300 ease-in-out '
			>
				<UploadCloud className='mr-2' />
				Upload
			</label>
			<input
				type='file'
				id={inputId}
				accept='image/*'
				onChange={uploadFile}
				className='hidden'
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
