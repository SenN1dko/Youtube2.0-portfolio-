import { useMutation } from '@tanstack/react-query'
import { LogOutIcon } from 'lucide-react'

import { authservice } from '@/services/auth.services'

export function LogOut() {
	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authservice.logout()
	})
	return (
		<button onClick={() => mutate}>
			<LogOutIcon />

			{isPending ? 'please wait...' : <span>logout</span>}
		</button>
	)
}
