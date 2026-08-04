import type { LucideIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface Props {
	children: React.ReactNode
	Icon?: LucideIcon
	isH1?: boolean
	classname?: string
}

export function Heading({ classname, Icon, children, isH1 = false }: Props) {
	return (
		<div className={twMerge('mb-1.5 flex items-center gap-2 opacity-90', classname)}>
			{Icon && (
				<Icon
					className={'text-primary'}
					size={isH1 ? 30 : 24}
				/>
			)}
			{isH1 ? (
				<h1 className='text-3xl font-bold'>{children}</h1>
			) : (
				<h2 className='text-lg font-bold'>{children}</h2>
			)}
		</div>
	)
}
