import type { PropsWithChildren } from 'react'

import { Header } from './Header/Header'

export function Content({ children }: PropsWithChildren<unknown>) {
	return (
		<div
			style={{
				flex: '1 1 0%'
			}}
		>
			<Header />
			<section className='p-5'>{children}</section>
		</div>
	)
}
