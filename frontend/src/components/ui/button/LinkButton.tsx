import Link, { type LinkProps } from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

type TLink = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

interface Props extends TLink {
	children: React.ReactNode
	isLoading?: boolean
}

export function LinkButton({ children, isLoading, ...props }: Props) {
	return (
		<Link
			{...props}
			className='py-2 px-10 cursor-pointer bg-primary text-white font-semibold rounded hover:bg-red-400 transition-colors disabled:bg-gray-400 '
		>
			{isLoading ? 'Loading...' : children}
		</Link>
	)
}
