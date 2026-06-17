import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import { STUDIO_PAGE } from '@/config/studio-page.config'

import { SidebarHeader } from './Header/SidebarHeader'
import { SidebarMenu } from './Menus/SidebarMenu'
import { SidebarSubscription } from './Menus/Subscritption/SidebarSubscription'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA, STUDIO_SIDEBAR_DATA } from './Sidebar.data'

const DynamicLogOut = dynamic(() => import('@/ui/button/LogOut').then(mod => mod.LogOut), {
	ssr: false
})

export function Sidebar({ toggleSidebar }: { toggleSidebar: () => void }) {
	const pathname = usePathname()

	return (
		<aside className='w-60 p-5 border-r border-border whitespace-nowrap overflow-hidden'>
			<SidebarHeader toggleSidebar={toggleSidebar} />
			<SidebarMenu menu={SIDEBAR_DATA} />

			<SidebarSubscription />

			{!!pathname.includes(STUDIO_PAGE.HOME) && (
				<SidebarMenu
					title='Studio'
					menu={STUDIO_SIDEBAR_DATA}
				/>
			)}

			<SidebarMenu
				title='More from youtube'
				menu={MORE_SIDEBAR_DATA}
			/>
			<DynamicLogOut />
		</aside>
	)
}
