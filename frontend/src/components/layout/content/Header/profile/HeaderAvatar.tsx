import Image from 'next/image'
import Link from 'next/link'

import { SkeletonLoading } from '@/ui/SkeletonLoading'

import { STUDIO_PAGE } from '@/config/studio-page.config'

import { useProfile } from '@/hooks/useProfile'

export function HeaderAvatar() {
	const { isLoading, profile } = useProfile()
	if (isLoading) return <SkeletonLoading className='w-10 rounded-md mb-0' />
	console.log('profile', profile)
	return (
		<>
			<Link
				href={STUDIO_PAGE.SETTINGS}
				className='shrink-0'
			>
				<Image
					alt='Profile'
					src={profile?.channels?.[0]?.avatar || '/Avatar.png'}
					width={40}
					height={40}
					unoptimized
					className='rounded-lg  '
				/>
			</Link>
		</>
	)
}
