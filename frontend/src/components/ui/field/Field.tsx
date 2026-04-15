import cn from 'clsx'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
	registration: UseFormRegisterReturn
}

export function Field({ label, error, registration, ...props }: Props) {
	return (
		<div className='mb-4'>
			<label className='flex flex-col gap-1 text-sm'>
				<span className='text-gray-400 font-semibold block mb-2 '>{label}</span>
				<input
					className={cn(
						'w-full py-2 px-4 focus:outline-none focus:ring-0  bg-transparent focus:border-gray-500 border rounded shadow-sm transition-colors ',
						error ? 'border-red-500' : 'border-border'
					)}
					{...registration}
					{...props}
				/>
				{error && <span className='text-red-500 text-xs'>{error}</span>}
			</label>
		</div>
	)
}
