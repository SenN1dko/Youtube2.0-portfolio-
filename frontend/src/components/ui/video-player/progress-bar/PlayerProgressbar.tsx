'use client'

import cn from 'clsx'
import { useState, useEffect, type ChangeEvent, useRef } from 'react'

import { COLORS } from '@/constants/colors.constants'

import { getTime } from '../video.util'

interface Props {
	currentTime: number
	duration: number
	onSeek: (time: number) => void
	onSeekCommitted: (time: number) => void
	progress: number
}

export function PlayerProgressbar({ currentTime, duration, onSeek, onSeekCommitted }: Props) {
	const [isDragging, setIsDragging] = useState(false)
	const [localTime, setLocalTime] = useState(currentTime)

	const inputRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (!isDragging) {
			setLocalTime(currentTime)
		}
	}, [currentTime, isDragging])

	const currentDuration = duration || 1
	const localProgress = (localTime / currentDuration) * 100

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value)
		setLocalTime(value)
		onSeek(value)
	}

	const handleMouseUp = () => {
		setIsDragging(false)
		onSeekCommitted(localTime)

		if (inputRef.current) {
			inputRef.current.blur()
		}
	}

	return (
		<div
			className='relative w-full rounded-lg flex items-center h-2 group'
			style={{ backgroundColor: 'rgba(255,255,255 , 0.2)' }}
		>
			<div
				className='absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-lg'
				style={{
					width: `${localProgress}%`,
					backgroundColor: COLORS.primary
				}}
			/>

			<div
				className={cn(
					'absolute -top-7 left-0 text-base text-white pointer-events-none',
					isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
				)}
				style={{ left: `calc(${localProgress}% - 20px)` }}
			>
				{getTime(localTime)}
			</div>

			<input
				ref={inputRef}
				type='range'
				min={0}
				max={currentDuration}
				value={localTime}
				onChange={handleChange}
				onMouseDown={() => setIsDragging(true)}
				onMouseUp={handleMouseUp}
				onTouchStart={() => setIsDragging(true)}
				onTouchEnd={handleMouseUp}
				className='absolute w-full h-full opacity-0 appearance-none pointer-events-auto cursor-pointer z-30'
			/>
		</div>
	)
}
