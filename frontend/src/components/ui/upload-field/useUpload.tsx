import { useMutation } from '@tanstack/react-query'
import type { ChangeEvent } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/studio/uploadFile.services'
import type { IFileResponse } from '@/types/file.types'

interface Props {
	onChange?: (url: string) => void
	folder?: string
	onSuccess?: (data: IFileResponse[]) => void
	onError?: () => void
}

type TUseUpload = (props: Props) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => void
	uploadFileForUploader: (file: File | File[]) => void
	isLoading: boolean
}

export const useUpload: TUseUpload = ({ onChange, folder, onError, onSuccess }) => {
	const { mutate, isPending } = useMutation({
		mutationKey: ['upload'],
		mutationFn: (data: FormData) => fileService.upload(data, folder),
		onSuccess({ data }) {
			if (onChange) {
				onChange(data[0].url)
			}

			if (onSuccess) {
				onSuccess(data)
			}
		},
		onError: error => {
			toast.error(error.message)
			if (onError) {
				onError()
			}
		}
	})

	const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		const formData = new FormData()
		formData.append('file', file)
		mutate(formData)
	}

	const uploadFileForUploader = (file: File | File[]) => {
		if (!file) return

		const targetFile = Array.isArray(file) ? file[0] : file

		if (!targetFile) return

		const formData = new FormData()
		formData.append('file', targetFile)
		mutate(formData)
	}
	return {
		uploadFile,
		uploadFileForUploader,
		isLoading: isPending
	}
}
