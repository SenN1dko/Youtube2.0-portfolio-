'use client'

import { Video } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Heading } from '@/ui/Heading'
import { SkeletonLoading } from '@/ui/SkeletonLoading'

const DynamicStudioVideoList = dynamic(
	() => import('./StudioVideoList').then(mod => mod.StudioVideoList),
	{
		ssr: false,
		loading: () => (
			<SkeletonLoading
				count={3}
				className='h-30'
			/>
		)
	}
)

export function StudioVideoListPage() {
	return (
		<section>
			<Heading
				Icon={Video}
				isH1
				classname='mb-6'
			>
				Content
			</Heading>
			<DynamicStudioVideoList />
		</section>
	)
}
2
