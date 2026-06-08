import { useMutation } from '@tanstack/react-query'
import type { ChangeEvent } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/uploadFile.services'

type TUseUpload = (props: { onChange: (url: string) => void; folder?: string }) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => void
	isLoading: boolean
}

export const useUpload: TUseUpload = ({ onChange, folder }) => {
	const { mutate, isPending } = useMutation({
		mutationKey: ['upload'],
		mutationFn: (data: FormData) => fileService.upload(data, folder),
		onSuccess({ data }) {
			onChange(data[0].url)
		},
		onError: error => {
			toast.error(error.message)
		}
	})

	const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		const formData = new FormData()
		formData.append('file', file)
		mutate(formData)
	}

	return {
		uploadFile,
		isLoading: isPending
	}
}
