import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { Providers } from '@/providers/Providers'

import { SITE_URL } from '@/constants/constants'

import './globals.css'

const notoSans = Noto_Sans({
	variable: '--font-noto-sans',
	subsets: ['latin', 'cyrillic'],
	display: 'swap'
})

export const metadata: Metadata = {
	icons: {
		icon: '/images/favicon.svg',
		shortcut: '/images/favicon.svg',
		apple: '/images/favicon.svg'
	},
	title: {
		absolute: 'RED Video',
		template: '%s | RED Video'
	},
	openGraph: {},
	description: 'Best app for video watching',
	metadataBase: new URL(SITE_URL)
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			{/* Добавляем notoSans.className */}
			<body className={`${notoSans.className} ${notoSans.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
