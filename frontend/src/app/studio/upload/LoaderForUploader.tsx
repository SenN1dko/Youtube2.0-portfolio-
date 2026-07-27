import { SkeletonLoading } from '@/ui/SkeletonLoading'

export function LoaderForUploader() {
	return (
		<>
			<div className='flex gap-4 flex-col'>
				<SkeletonLoading count={1} />
				<SkeletonLoading
					count={1}
					className='h-40'
				/>
				<SkeletonLoading count={1} />
				<SkeletonLoading count={1} />
				<SkeletonLoading count={1} />
			</div>
			<div>
				<SkeletonLoading
					count={1}
					className='w-75 h-47.5'
				/>
				<SkeletonLoading count={1} />
				<SkeletonLoading count={1} />
			</div>
		</>
	)
}
