import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { Providers } from '@/providers/Providers'

// @ts-expect-error CSS import from Next.js app directory
import './globals.css'

const NotoSans = Noto_Sans({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'RED Video',
	description: 'Best app for video watching'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={` ${NotoSans.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
