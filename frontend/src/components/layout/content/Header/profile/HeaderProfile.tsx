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
	console.log(profile)
	return isLoggedIn ? (
		<>
			<HeaderAvatar />
			{profile?.verificationToken ? (
				<button
					onClick={() => handleResend()}
					className='text-xs text-red-500 hover:underline'
				>
					Not Verified (Resend)
				</button>
			) : (
				<span className='text-xs text-green-500'>Verified</span>
			)}
		</>
	) : (
		<>
			<LinkButton href={PAGE.AUTH}>Auth</LinkButton>
		</>
	)
}
