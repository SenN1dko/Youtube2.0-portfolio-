'use client'

import { useQuery } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { PAGE } from '@/config/public-page.config'

import { emailVerificationService } from '@/services/emailVerification.services'

export default function VerifiedPageContent({ token }: { token: string }) {
	const router = useRouter()
	console.log(token)
	const { isPending, data } = useQuery({
		queryKey: ['verify-email', token],
		queryFn: () => emailVerificationService.verifyEmail(token)
	})

	useEffect(() => {
		const timeout = setTimeout(() => {
			router.push(PAGE.HOME)
		}, 2000)
		return () => clearTimeout(timeout)
	}, [data, router])

	return (
		<>
			<div className=' mx-auto w-1/2 mt-24 text-center'>
				<h1 className='font-bold text-5xl mb-5 inline-flex gap-2 items-center'>
					{isPending ? (
						'Verifying...'
					) : (
						<>
							<Check className='text-green-500' />
							<span>{data || 'Email verified successfully!'}</span>
						</>
					)}
				</h1>
			</div>
		</>
	)
}
