import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { SinglePlaylist } from './SinglePlaylist'

export const metadata: Metadata = {
	title: 'singlePlaylist-page',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <SinglePlaylist />
}
