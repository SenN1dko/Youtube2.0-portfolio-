import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useProfile } from './useProfile'
import { userService } from '@/services/user.services'
import type { ISettings } from '@/types/settings.type'

export function useSettings() {
	const form = useForm<ISettings>({
		mode: 'onChange'
	})

	const { profile, isSuccess, isLoading, refetch } = useProfile()

	useEffect(() => {
		if (!isSuccess) return
		form.reset(profile)
	}, [isSuccess, profile, form])

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['settings'],
		mutationFn: (data: ISettings) => userService.updateProfile(data)
	})

	const onSubmit: SubmitHandler<ISettings> = data => {
		toast.promise(mutateAsync(data), {
			loading: isPending ? 'Loading.' : '',
			success: () => {
				refetch()
				return 'profile has updated successfully'
			},
			error: e => {
				if (axios.isAxiosError(e)) {
					return e.response?.data?.message
				}
			}
		})
	}
	return { isPending, onSubmit, formObject: form, isProfileLoading: isLoading }
}
