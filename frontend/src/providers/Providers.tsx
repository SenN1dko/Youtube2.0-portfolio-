'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 1,
						refetchOnWindowFocus: false
					},
					mutations: {
						retry: 1
					}
				}
			})
	)
	return (
		<QueryClientProvider client={queryClient}>
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
