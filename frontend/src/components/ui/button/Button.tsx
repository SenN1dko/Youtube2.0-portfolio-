interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	isLoading?: boolean
}

export function Button({ children, isLoading, ...props }: Props) {
	return (
		<button
			{...props}
			disabled={isLoading || props.disabled}
			className='py-2 px-10 cursor-pointer bg-primary text-white font-semibold rounded hover:bg-red-400 transition-colors disabled:bg-gray-400 '
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}
