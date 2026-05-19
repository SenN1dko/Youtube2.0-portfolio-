import { useMutation } from '@tanstack/react-query'
import { LogOutIcon } from 'lucide-react'

import { authservice } from '@/services/auth.services'

export function LogOut() {
	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authservice.logout()
	})
	return (
		<button
			onClick={() => mutate()}
			className='group flex items-center gap-5 py-2 cursor-pointer'
		>
			<LogOutIcon
				className={
					' min-w-6 transition duration-333 ease-in-out group-hover:text-primary group-hover:rotate-5'
				}
			/>
			<span>{isPending ? 'please wait...' : <span>logout</span>}</span>
		</button>
	)
}
