import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

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

	const { mutate, isPending } = useMutation({
		mutationKey: ['settings'],
		mutationFn: (data: ISettings) => userService.updateProfile(data),
		onSuccess() {
			refetch()
		}
	})

	const onSubmit: SubmitHandler<ISettings> = data => {
		mutate(data)
	}
	return { isPending, onSubmit, formObject: form, isProfileLoading: isLoading }
}
