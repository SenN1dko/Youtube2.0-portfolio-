import { Divide } from 'lucide-react'
import { usePathname } from 'next/navigation'
import path from 'path'
import { match } from 'path-to-regexp'

import { SIDEBAR_DATA } from '../Sidebar.data'
import type { ISidebarItem } from '../Sidebar.types'

import { MenuItem } from './MenuItem'

interface Props {
	title?: string
	menu: ISidebarItem[]
}

export function SidebarMenu({ menu, title }: Props) {
	const pathName = usePathname()
	console.log(pathName)
	return (
		<nav>
			{title && <div className='opacity-40 uppercase text-xs mb-3 font-medium'>{title}</div>}
			<ul>
				{menu.map(menuItem => (
					<MenuItem
						key={menuItem.label}
						item={menuItem}
						isActive={!!match(menuItem.link)(pathName)}
					/>
				))}
			</ul>
		</nav>
	)
}
