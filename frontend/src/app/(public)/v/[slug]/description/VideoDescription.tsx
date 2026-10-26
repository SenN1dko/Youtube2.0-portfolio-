'use client'

import parse from 'html-react-parser'
import { useState } from 'react'

import { processHtmlContent } from '@/utils/process-html-content'

import styles from './VideoDescription.module.scss'

export function VideoDescription({ description }: { description: string | undefined }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const { initialContent, isShouldShowToggle } = processHtmlContent(description || '', 1)

	return (
		<>
			<div className='relative mb-4 bg-gray-800 rounded-lg px-3 py-2'>
				<article className={`${styles.article}`}>
					{parse(isExpanded ? description || '' : initialContent)}
				</article>
				<button
					onClick={() => setIsExpanded(prev => !prev)}
					className='text-gray-400 uppercase transition-colors hover:text-gray-200'
				>
					{isShouldShowToggle && <span>{isExpanded ? 'Hide' : 'Show more'}</span>}
				</button>
			</div>
		</>
	)
}
