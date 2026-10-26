'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoading } from '@/ui/SkeletonLoading'

const SubscribeButton = dynamic(
	() => import('@/components/SubscribeButton').then(mod => mod.SubscribeButton),
	{
		ssr: false,
		loading: () => <SkeletonLoading className='w-39.5 rounded-md h-10 mb-0' />
	}
)

export function SubButton({ slug }: { slug: string }) {
	return (
		<div className='flex items-center gap-4'>
			<SubscribeButton slug={slug} />
		</div>
	)
}
