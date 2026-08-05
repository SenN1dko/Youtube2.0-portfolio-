import type { ForwardedRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export function Recaptcha({ forwardedRef }: { forwardedRef: ForwardedRef<ReCAPTCHA> }) {
	return (
		<ReCAPTCHA
			ref={forwardedRef}
			size='normal'
			sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
			theme='light'
		/>
	)
}
