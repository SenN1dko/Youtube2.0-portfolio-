'use client'

import cn from 'clsx'
import { type PropsWithChildren } from 'react'

import styles from './Layout.module.scss'
import { Content } from './content/Content'
import { Sidebar } from './sidebar/Sidebar'
import { useShowedSidebarStore } from '@/store'

export function Layout({ children }: PropsWithChildren<unknown>) {
	const isShowedSidebar = useShowedSidebarStore(set => set.isShowed)
	const setIsShowedSidebar = useShowedSidebarStore(set => set.setIsShowed)

	return (
		<main
			className={cn(
				'flex min-h-screen',
				isShowedSidebar ? styles.showedSidebar : styles.hidedSidebar
			)}
		>
			<Sidebar toggleSidebar={setIsShowedSidebar} />
			<Content>{children}</Content>
		</main>
	)
}
