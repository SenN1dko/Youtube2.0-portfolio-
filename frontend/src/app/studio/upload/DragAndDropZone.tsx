import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'

import { SkeletonLoading } from '@/ui/SkeletonLoading'

import styles from './UploadVIdeoForm.module.scss'

const FileUploader = dynamic(() => import('react-drag-drop-files').then(mod => mod.FileUploader), {
	ssr: false
})

interface Props {
	isUploading: boolean
	uploadFileForUploader: (file: File | File[]) => void
}

export function DragAndDropZone({ isUploading, uploadFileForUploader }: Props) {
	return (
		<div className='flex flex-col items-center justify-center min-h-[250px]'>
			{isUploading ? (
				<>
					<div className='w-full text-center space-y-3'>
						<SkeletonLoading
							count={1}
							className='h-20 w-full rounded-lg'
						/>
						<p className='text-sm text-gray-400 animate-pulse'>
							Uploading file to server, please wait...
						</p>
					</div>
				</>
			) : (
				<>
					<FileUploader
						handleChange={uploadFileForUploader}
						types={['MP4', 'AVI', 'MOV', 'WMV', 'MKV']}
						classes={styles.label}
						required
						maxSize={1024}
						onSizeError={() => {
							toast.error('File is too big! (max 1gb)')
						}}
					/>
				</>
			)}
		</div>
	)
}
