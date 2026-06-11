import cn from 'clsx'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	isLoading?: boolean
	variant: 'secondary' | 'primary'
}

export function Button({ children, isLoading, variant = 'primary', ...props }: Props) {
	return (
		<button
			{...props}
			disabled={isLoading || props.disabled}
			className={cn(
				'py-2 px-10 cursor-pointer  text-white font-semibold rounded transition-colors disabled:bg-gray-400 ',
				{
					'bg-primary text-white hover:bg-red-400': variant === 'primary',
					'bg-gray-600 text-white hover:bg-gray-500': variant === 'secondary'
				}
			)}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}
