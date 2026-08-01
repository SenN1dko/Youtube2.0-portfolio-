'use client'

import { Compass } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Heading } from '@/ui/Heading'
import { SkeletonLoading } from '@/ui/SkeletonLoading'

const DynamicExplore = dynamic(() => import('./Explore').then(mod => mod.Explore), {
	ssr: false,
	loading: () => {
		;<div className='grid grid-cols-5 '>
			<SkeletonLoading />
		</div>
	}
})

export function ExploreSection() {
	return (
		<section>
			<Heading Icon={Compass}>Explore</Heading>
			<DynamicExplore />
		</section>
	)
}
