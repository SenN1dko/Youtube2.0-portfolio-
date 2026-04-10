import {
	CircleAlert,
	CirclePlay,
	Compass,
	Flame,
	FolderHeart,
	Gamepad2,
	History,
	Settings,
	TvMinimalPlay
} from 'lucide-react'

import { PAGE } from '@/config/public-page.config'

import type { ISidebarItem } from './Sidebar.types'
import { STUDIO_PAGE } from '@/config/studio-page.config'

export const SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: Compass,
		label: 'Explore',
		link: PAGE.HOME
	},
	{
		icon: Flame,
		label: 'Trending',
		link: PAGE.TRENDING
	},
	{
		icon: Gamepad2,
		label: 'Video games',
		link: PAGE.VIDEO_GAMES,
		isBottomBorder: true
	},
	{
		icon: TvMinimalPlay,
		label: 'My Channel',
		link: PAGE.MY_CHANNEL
	},
	{
		icon: CirclePlay,
		label: 'Subscription',
		link: PAGE.SUBSCRIPTION
	},
	{
		icon: History,
		label: 'History',
		link: PAGE.HISTORY
	},
	{
		icon: FolderHeart,
		label: 'Liked videos',
		link: PAGE.LIKED_VIDEOS,
		isBottomBorder: true
	}
]

export const MORE_SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: Settings,
		label: 'Settings',
		link: STUDIO_PAGE.SETTINGS
	},
	{
		icon: CircleAlert,
		label: 'Send feedback',
		link: PAGE.FEEDBACK
	}
]
