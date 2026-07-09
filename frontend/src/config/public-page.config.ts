class PublicPage {
	AUTH = '/auth'
	HOME = '/'
	TRENDING = '/trending'
	VIDEO_GAMES = '/video-games'

	PLAYLISTS = '/playlists'

	MY_CHANNEL = '/my-channel'
	SUBSCRIPTION = '/subscription'
	HISTORY = '/history'
	LIKED_VIDEOS = '/liked-videos'

	FEEDBACK = '/feedback'

	VIDEO(path: string) {
		return `/v/${path}`
	}
	CHANNEL(path: string) {
		return `/c/${path}`
	}
	SEARCH(path:string){
		return `/s?q=${path}`	
	}
}

export const PAGE = new PublicPage()
