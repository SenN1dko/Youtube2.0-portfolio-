import dynamic from 'next/dynamic'

import { SkeletonLoading } from '@/ui/SkeletonLoading'

import { FieldSection } from './FieldSection'
import { HeaderLinks } from './HeaderLinks'

const DynamicHeaderProfile = dynamic(
	() => import('./HeaderProfile').then(mod => mod.HeaderProfile),
	{ ssr: false, loading: () => <SkeletonLoading className='w-10 rounded-md mb-0' /> }
)

export function Header() {
	return (
		<header className='p-5 border-b border-border'>
			<div className='flex items-center justify-between'>
				<FieldSection />
				<div className=' flex items-center gap-7'>
					<HeaderLinks />
					<DynamicHeaderProfile />
				</div>
			</div>
		</header>
	)
}
