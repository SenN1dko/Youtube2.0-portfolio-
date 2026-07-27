import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/studio/user.services'

export function useProfile() {
	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		refetchInterval: 1800000, // 30mins,
		retry: 2
	})
	return {
		profile: data?.data,
		isLoading,
		isSuccess,
		refetch
	}
}
