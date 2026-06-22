'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { PAGE } from '@/config/public-page.config'

import { useProfile } from '@/hooks/useProfile'

import { Button } from './ui/button/Button'
import { channelService } from '@/services/channel.services'

export function SubscribeButton({ slug }: { slug: string }) {
	const { profile, refetch } = useProfile()
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['subscribe'],
		mutationFn: () => channelService.toggleSubscribe(slug),
		onSuccess: () => {
			refetch()
		}
	})

	const clickHandler = () => {
		if (profile) {
			console.log('mutate')
			mutate()
		} else {
			router.push(PAGE.AUTH)
		}
	}
	const isSubscribed = profile?.subscriptions?.some(sub => sub.channel.slug === slug)

	return (
		<Button
			variant={isSubscribed ? 'secondary' : 'primary'}
			onClick={clickHandler}	
		>
			{isSubscribed ? 'Subscribed' : 'Subscribe'}
		</Button>
	)
}
