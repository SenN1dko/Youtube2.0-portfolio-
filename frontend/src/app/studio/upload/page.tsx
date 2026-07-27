import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { UploadVideoMain } from './UploadVIdeoMain'

export const metadata: Metadata = {
	title: 'UploadVideo - Studio',
	...NO_INDEX_PAGE
}

export default function UploadVideoPage() {
	return <UploadVideoMain />
}
