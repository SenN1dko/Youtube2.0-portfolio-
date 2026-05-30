'use client'

import { useSettings } from '@/hooks/useSettings'

export function SettingsForm() {
	const { form, isPending, onSubmit } = useSettings()

	return <div>settings form</div>
}
