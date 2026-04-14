import { Menu } from 'lucide-react'

import { Logo } from '@/ui/logo/Logo'

export function SidebarHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
	return (
		<div className='flex gap-6 mb-12 '>
			<button
				onClick={toggleSidebar}
				className='opacity-60 hover:opacity-100 transition-opacity duration-333 ease-in-out'
			>
				<Menu />
			</button>

			<Logo />
		</div>
	)
}
