import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'

type TypeOut = {
	ref: React.RefObject<HTMLButtonElement | null>
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialIsShow: boolean): TypeOut => {
	const [isShow, setIsShow] = useState<boolean>(initialIsShow)

	const ref = useRef<HTMLButtonElement>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsShow(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [])

	return {
		isShow,
		ref,
		setIsShow
	}
}
