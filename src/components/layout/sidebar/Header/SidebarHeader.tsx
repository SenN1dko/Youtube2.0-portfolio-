import { Menu, SquarePlay } from 'lucide-react'
import Link from 'next/link'

import { COLORS } from '@/constants/colors.constants'

import { PAGE } from '@/config/public-page.config'

export function SidebarHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
	return (
		<div className='flex gap-6 mb-12 '>
			<button
				onClick={toggleSidebar}
				className='opacity-60 hover:opacity-100 transition-opacity duration-333 ease-in-out'
			>
				<Menu />
			</button>

			<Link
				href={PAGE.HOME}
				className='flex gap-1.5 items-center '
			>
				<SquarePlay
					color={COLORS.primary}
					size={29}
				/>
				<span className='font-medium text-xl'>RED VIDEO</span>
			</Link>
		</div>
	)
}
