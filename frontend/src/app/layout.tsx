import type { Metadata, Viewport } from 'next'
import { Noto_Sans } from 'next/font/google'

import { Providers } from '@/providers/Providers'

import { COLORS } from '@/constants/colors.constants'
import { SITE_NAME, SITE_URL } from '@/constants/constants'

import './globals.css'

const notoSans = Noto_Sans({
	variable: '--font-noto-sans',
	subsets: ['latin', 'cyrillic'],
	display: 'swap'
})

export const metadata: Metadata = {
	icons: {
		icon: '/images/logo.svg',
		shortcut: '/images/logo.svg',
		apple: '/images/256.png',
		other: {
			rel: 'touch-icons',
			url: '/images/256.png',
			sizes: '256x256',
			type: 'image/png'
		}
	},
	title: {
		absolute: `${SITE_NAME}`,
		template: `%s | ${SITE_NAME}`
	},
	openGraph: {
		type: 'website',
		siteName: 'localhost',
		emails: [`info@example.com`],
		images: [
			{
				url: '/images/og.jpg',
				width: 1918,
				height: 964,
				alt: `${SITE_NAME}`
			}
		]
	},

	manifest: '/manifest.json',
	publisher: 'Max Shushval [RED Group]',
	formatDetection: {
		telephone: false
	},

	description: 'Best app for video watching',
	metadataBase: new URL(SITE_URL)
}

export const viewport: Viewport = {
	themeColor: COLORS.bg
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
