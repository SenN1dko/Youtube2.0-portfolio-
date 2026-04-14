import { SquarePlay } from 'lucide-react'
import Link from 'next/link'

import { COLORS } from '@/constants/colors.constants'

import { PAGE } from '@/config/public-page.config'

export function Logo() {
	return (
		<Link
			href={PAGE.HOME}
			className='inline-flex gap-1.5 items-center '
		>
			<SquarePlay
				color={COLORS.primary}
				size={29}
			/>
			<span className='font-medium text-xl'>RED VIDEO</span>
		</Link>
	)
}
