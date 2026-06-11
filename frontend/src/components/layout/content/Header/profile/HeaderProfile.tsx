import { LinkButton } from '@/ui/button/LinkButton'

import { PAGE } from '@/config/public-page.config'

import { useProfile } from '@/hooks/useProfile'

import { HeaderAvatar } from './HeaderAvatar'
import { emailVerificationService } from '@/services/emailVerification.services'
import { useAuthStore } from '@/store'

export function HeaderProfile() {
	const isLoggedIn = useAuthStore(set => set.isLoggedIn)
	const { profile } = useProfile()
	const handleResend = async () => {
		if (!profile?.email)
			return console.error('User email is not available for resending verification email.')
		try {
			await emailVerificationService.resendVerifyEmail(profile.email)
		} catch (error) {
			console.error('Error resending verification email:', error)
		}
	}
	return isLoggedIn ? (
		<>
			<div className='relative'>
				<HeaderAvatar />
				{profile?.verificationToken && (
					<button
						onClick={() => handleResend()}
						className='absolute -left-4 font-semibold -bottom-3.5 hover:bg-red-400 cursor-pointer bg-primary p-0.5  rounded text-xs w-max'
					>
						Not Verified
					</button>
				)}
			</div>
		</>
	) : (
		<>
			<LinkButton href={PAGE.AUTH}>Auth</LinkButton>
		</>
	)
}
