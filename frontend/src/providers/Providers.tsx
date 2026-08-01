'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const client = new QueryClient({
	defaultOptions: {
		mutations: {
			retry: 1
		},
		queries: {
			retry: 1
		}
	}
})

export function Providers({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={client}>
			<LazyMotion features={domAnimation}>
				{children}
				<Toaster
					toastOptions={{
						style: {
							backgroundColor: '#202937',
							color: 'white'
						}
					}}
				/>
			</LazyMotion>
		</QueryClientProvider>
	)
}
