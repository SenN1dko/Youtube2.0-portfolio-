import dynamic from 'next/dynamic'

import { SkeletonLoading } from '@/ui/SkeletonLoading'
import { LogOut } from '@/ui/button/LogOut'

import { FieldSection } from './FieldSection'
import { HeaderLinks } from './HeaderLinks'
import { useAuthStore } from '@/store'

const DynamicHeaderProfile = dynamic(
	() => import('./HeaderProfile').then(mod => mod.HeaderProfile),
	{ ssr: false, loading: () => <SkeletonLoading className='w-10 rounded-md mb-0' /> }
)

export function Header() {
	const isLoggedIn = useAuthStore(set => set.isLoggedIn)
	return (
		<header className='p-5 border-b border-border'>
			<div className='flex items-center justify-between'>
				<FieldSection />
				<div className=' flex items-center gap-7'>
					<HeaderLinks />
					<DynamicHeaderProfile />
					{isLoggedIn && (
						<>
							<LogOut />
						</>
					)}
				</div>
			</div>
		</header>
	)
}
