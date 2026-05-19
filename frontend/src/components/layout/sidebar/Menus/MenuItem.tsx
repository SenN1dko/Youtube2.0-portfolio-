import cn from 'clsx'
import Link from 'next/link'

import type { ISidebarItem } from '../Sidebar.types'

import { useShowedSidebarStore } from '@/store'

interface Props {
	item: ISidebarItem
	isActive: boolean
}
export function MenuItem({ item, isActive }: Props) {
	const isShowed = useShowedSidebarStore(set => set.isShowed)
	return (
		<li>
			<Link
				href={item.link}
				className='group flex items-center gap-5 py-2'
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
			{item.isBottomBorder && <span className='h-[1px] bg-border block my-5 w-full' />}
		</li>
	)
}
