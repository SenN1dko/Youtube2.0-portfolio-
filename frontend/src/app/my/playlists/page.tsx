import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { PlaylistsPage } from './PlaylistPage'

export const metadata: Metadata = {
	title: 'playlists-page',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <PlaylistsPage />
}
