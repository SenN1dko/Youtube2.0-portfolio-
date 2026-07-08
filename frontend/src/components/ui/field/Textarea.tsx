import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	error?: string
	registration: UseFormRegisterReturn
	wrapClassName?: string
}

export function Textarea({
	wrapClassName,
	className,
	label,
	error,
	registration,
	...props
}: Props) {
	const id = useId()
	return (
		<div className={twMerge('mb-4', wrapClassName)}>
			{label && (
				<label
					htmlFor={id}
					className='flex flex-col gap-1 text-sm'
				>
					<span className='text-gray-400 font-semibold block mb-2 '>{label}</span>
				</label>
			)}
			<textarea
				id={id}
				className={twMerge(
					'w-full resize-none py-2 px-4 focus:outline-none focus:ring-0  bg-transparent focus:border-gray-500 border rounded shadow-sm transition-colors ',

					error ? 'border-red-500' : 'border-border',
					className
				)}
				{...registration}
				{...props}
			/>
			{error && <span className='text-red-500 text-xs'>{error}</span>}
		</div>
	)
}
