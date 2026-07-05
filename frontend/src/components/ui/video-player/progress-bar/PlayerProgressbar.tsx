'use client'

import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import type { ReactElement } from 'react'

import { COLORS } from '@/constants/colors.constants'

import { getTime } from '../video.util'

// @ts-expect-error: allow side-effect CSS import without type declarations
import 'rc-slider/assets/index.css'

interface IHandelProps {
	value: number
	index: number
}

const handleRender = (node: ReactElement, props: IHandelProps) => {
	const { value, index } = props
	return (
		<Tooltip
			prefixCls='rc-slider-tooltip '
			overlay={getTime(value)}
			trigger={['hover', 'click', 'focus']}
			placement='top'
			classNames={{ root: 'tooltip-simple-text ' }}
			key={index}
		>
			{node}
		</Tooltip>
	)
}

interface Props {
	currentTime: number
	duration: number
	onSeek: (time: number) => void
}

export function PlayerProgressbar({ currentTime, duration, onSeek }: Props) {
	return (
		<>
			<div className='w-full z-10'>
				<Slider
					min={0}
					max={duration || 0}
					value={currentTime}
					onChange={value => {
						if (typeof value === 'number') {
							onSeek(value)
						}
					}}
					handleRender={handleRender}
					styles={{
						track: { backgroundColor: COLORS.primary, height: 5, transition: 'all .2s linear ' },
						rail: { backgroundColor: 'rgb(255 255 255 / 30%)', height: 5 },

						handle: {
							borderColor: 'transparent',
							height: 16,
							width: 16,
							marginLeft: -8,
							marginTop: -4,
							backgroundColor: 'transparent',
							boxShadow: 'none',
							outline: 'none'
						}
					}}
				/>
			</div>
		</>
	)
}
