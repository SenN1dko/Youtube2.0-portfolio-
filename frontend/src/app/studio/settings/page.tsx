import { Settings } from 'lucide-react'
import type { Metadata } from 'next'

import { Heading } from '@/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { SettingsForm } from './SettingsForm'

export const metadata: Metadata = {
	title: 'Settings - Studio',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return (
		<div>
			<Heading
				isH1
				Icon={Settings}
			>
				Settings
			</Heading>
			<SettingsForm />
		</div>
	)
}
