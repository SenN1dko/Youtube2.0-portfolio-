import { LogOut } from '@/ui/button/LogOut'

import { SidebarHeader } from './Header/SidebarHeader'
import { SidebarMenu } from './Menus/SidebarMenu'
import { SidebarSubscription } from './Menus/Subscritption/SidebarSubscription'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from './Sidebar.data'
import { useAuthStore } from '@/store'

export function Sidebar({ toggleSidebar }: { toggleSidebar: () => void }) {
	const isLoggedIn = useAuthStore(set => set.isLoggedIn)
	return (
		<aside className='w-60 p-5 border-r border-border whitespace-nowrap overflow-hidden'>
			<SidebarHeader toggleSidebar={toggleSidebar} />
			<SidebarMenu menu={SIDEBAR_DATA} />

			<SidebarSubscription />

			<SidebarMenu
				title='More from youtube'
				menu={MORE_SIDEBAR_DATA}
			/>
			{isLoggedIn && <LogOut />}
		</aside>
	)
}
