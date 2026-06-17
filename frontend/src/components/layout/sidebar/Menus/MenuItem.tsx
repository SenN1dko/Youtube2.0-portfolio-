import cn from 'clsx'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import { useProfile } from '@/hooks/useProfile'

import type { ISidebarItem } from '../Sidebar.types'

import { useAuthStore } from '@/store'
import { useShowedSidebarStore } from '@/store'

interface Props {
	item: ISidebarItem
	isActive: boolean
}
export function MenuItem({ item, isActive }: Props) {
	const { profile } = useProfile()
	const isShowed = useShowedSidebarStore(set => set.isShowed)
	const isLoggedIn = useAuthStore(state => state.isLoggedIn)

	const myChannelLink =
		profile?.channel?.slug && isLoggedIn ? PAGE.CHANNEL(profile?.channel?.slug) : PAGE.MY_CHANNEL
	return (
		<li>
			<Link
				href={item.link === PAGE.MY_CHANNEL ? myChannelLink : item.link}
				className='group flex items-center gap-5 py-2'
				title={item.label}
			>
				<item.icon
					className={cn(' min-w-6 transition duration-333 ease-in-out ', {
						'group-hover:text-primary group-hover:rotate-5': !isActive,

						'text-red-400 ': isActive && !isShowed
					})}
				/>
				<span
					className={cn('border-b', { ' border-white': isActive, 'border-transparent': !isActive })}
				>
					{item.label}
				</span>
			</Link>
			{item.isBottomBorder && <span className='h-px bg-border block my-5 w-full' />}
		</li>
	)
}
