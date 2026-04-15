'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const client = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={client}>
			<LazyMotion features={domAnimation}>
				{children}
				<Toaster />
			</LazyMotion>
		</QueryClientProvider>
	)
}
