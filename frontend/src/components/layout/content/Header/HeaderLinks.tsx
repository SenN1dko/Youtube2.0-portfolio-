import { Bell, LayoutGrid, PlusSquare } from 'lucide-react'
import Link from 'next/link'

import { STUDIO_PAGE } from '@/config/studio-page.config'

export function HeaderLinks() {
	return (
		<div className='flex items-center gap-2'>
			<Link
				href={STUDIO_PAGE.UPLOAD_VIDEO}
				className='transition-opacity hover:opacity-100 opacity-75 p-2'
				aria-label='Upload a video'
				title='Upload a video '
			>
				<PlusSquare size={20} />
			</Link>
			<Link
				title='Studio page'
				aria-label='Studio page'
				href={STUDIO_PAGE.HOME}
				className='transition-opacity hover:opacity-100 opacity-75 p-2'
			>
				<LayoutGrid size={20} />
			</Link>
			<Link
				title='Notifications'
				aria-label='Notifications'
				href={STUDIO_PAGE.HOME}
				className='transition-opacity hover:opacity-100 opacity-75 p-2'
			>
				<Bell size={20} />
			</Link>
		</div>
	)
}
