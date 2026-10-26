import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { watchHistoryService } from '@/services/WatchHistory.services'
import { videoService } from '@/services/video.services'
import type { IVideoSingleResponse } from '@/types/video.types'

export function useUpdateViews({ video }: { video: IVideoSingleResponse }) {
	const { mutate: updateViews } = useMutation({
		mutationKey: ['update video views', video.publicId],
		mutationFn: () => videoService.updateViews(video.publicId)
	})
	const { mutate: updateWatchHistory } = useMutation({
		mutationKey: ['update watch history', video.id],
		mutationFn: () => watchHistoryService.addToHistory(video.id)
	})

	useEffect(() => {
		updateViews()
		updateWatchHistory()
	}, [updateViews, updateWatchHistory])
}
