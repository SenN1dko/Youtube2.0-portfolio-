import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { LikedVideosPage } from './LikedVideosPage'

export const metadata: Metadata = {
	title: 'liked videos',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <LikedVideosPage />
}
