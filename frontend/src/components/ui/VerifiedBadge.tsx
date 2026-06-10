import { BadgeCheck } from 'lucide-react'

export function VerifiedBadge({ size }: { size?: number }) {
	return (
		<BadgeCheck
			className='text-green-500'
			size={size}
		/>
	)
}
