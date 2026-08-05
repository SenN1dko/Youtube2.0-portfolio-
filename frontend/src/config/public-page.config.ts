class PublicPage {
	AUTH = '/auth'
	HOME = '/'
	TRENDING = '/trending'
	VIDEO_GAMES = '/video-games'

	PLAYLISTS = '/my/playlists'

	MY_CHANNEL = '/my/my-channel'
	SUBSCRIPTION = '/my/subscription'
	HISTORY = '/my/history'
	LIKED_VIDEOS = '/my/liked-videos'

	FEEDBACK = '/feedback'

	VIDEO(path: string) {
		return `/v/${path}`
	}
	CHANNEL(path: string) {
		return `/c/${path}`
	}
	PLAYLIST(path?: string) {
		return `/playlists/${path ? `${path}` : ''}`
	}
	SEARCH(path:string){
		return `/s?q=${path}`	
	}
}

export const PAGE = new PublicPage()
