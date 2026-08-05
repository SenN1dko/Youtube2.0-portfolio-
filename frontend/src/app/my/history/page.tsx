import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { HistoryPage } from './HistoryPage'

export const metadata: Metadata = {
	title: 'history-page',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <HistoryPage />
}
