import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import toast, { type Toast } from 'react-hot-toast'

import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'

import { studioVideoService } from '@/services/studio/studio-video.services'
import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
}

export function StudioVideoActions({ video }: Props) {
	const queryClient = useQueryClient()
	const { mutate: deleteVideo, isPending: isVideoDelete } = useMutation({
		mutationKey: ['delete video', video.id],
		mutationFn: () => studioVideoService.delete(video.id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			})
			toast.success('Video successfully deleted')
		}
	})

	const handleDelete = () => {
		toast((t: Toast) => (
			<div>
				<p>Are you sure you want to delete this video?</p>
				<div className='flex justify-end gap-4 mt-2'>
					<button
						onClick={() => {
							deleteVideo()
							toast.dismiss(t.id)
						}}
						className='text-red-600 cursor-pointer'
					>
						Delete
					</button>
					<button
						onClick={() => toast.dismiss(t.id)}
						className='text-gray-600 cursor-pointer'
					>
						Cancel
					</button>
				</div>
			</div>
		))
	}
	return (
		<>
			<div className='flex items-start justify-center gap-5'>
				<Link
					className='text-blue-600 cursor-pointer opacity-70  transition-opacity hover:opacity-100'
					href={PAGE.VIDEO(video.publicId)}
					title='view in new page'
					target='_blank'
				>
					<ExternalLink size={22} />
				</Link>

				<Link
					className=' text-orange-500  opacity-70 cursor-pointer  transition-opacity hover:opacity-100'
					title='Edit'
					href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
				>
					<Edit size={22} />
				</Link>
				<button
					title='Delete'
					disabled={isVideoDelete}
					onClick={() => {
						handleDelete()
					}}
					className='text-red-600  opacity-70   transition-opacity cursor-pointer hover:opacity-100'
				>
					<Trash2 size={22} />
				</button>
			</div>
		</>
	)
}
