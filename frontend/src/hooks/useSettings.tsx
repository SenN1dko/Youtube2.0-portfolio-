import { useMutation } from '@tanstack/react-query'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { userService } from '@/services/user.services'
import type { ISettings } from '@/types/settings.type'

export function useSettings() {
	const form = useForm<ISettings>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['settings'],
		mutationFn: (data: ISettings) => userService.updateProfile(data)
	})

	const onSubmit: SubmitHandler<ISettings> = data => {
		mutate(data)
	}
	return { isPending, onSubmit, form }
}
