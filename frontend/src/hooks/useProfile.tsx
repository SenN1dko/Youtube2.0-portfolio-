import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.services'
import type { IFullUser } from '@/types/user.type'

export function useProfile() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		refetchInterval: 1800000 // 30mins
	})
	return {
		profile: data?.data as IFullUser | undefined,
		isLoading
	}
}
