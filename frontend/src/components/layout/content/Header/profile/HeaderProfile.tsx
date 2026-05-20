import { LinkButton } from '@/ui/button/LinkButton'

import { PAGE } from '@/config/public-page.config'

import { HeaderAvatar } from './HeaderAvatar'
import { useAuthStore } from '@/store'

export function HeaderProfile() {
	const isLoggedIn = useAuthStore(set => set.isLoggedIn)
	return isLoggedIn ? (
		<>
			<HeaderAvatar />
		</>
	) : (
		<>
			<LinkButton href={PAGE.AUTH}>Auth</LinkButton>
		</>
	)
}
