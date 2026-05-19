import { useMutation } from '@tanstack/react-query'
import { LogOutIcon } from 'lucide-react'

import { authservice } from '@/services/auth.services'
import { useAuthStore } from '@/store'

export function LogOut() {
	const isLoggedIn = useAuthStore(set => set.isLoggedIn)

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authservice.logout()
	})

	if (!isLoggedIn) return null
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
