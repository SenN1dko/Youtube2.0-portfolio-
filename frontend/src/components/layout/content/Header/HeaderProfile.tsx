<<<<<<< HEAD
<<<<<<< HEAD
import { STUDIO_PAGE } from "@/config/studio-page.config";
import Image from "next/image";
import Link from "next/link";

export function HeaderProfile() {
    return <Link href={STUDIO_PAGE.SETTINGS} className="shrink-0">
    <Image
    alt='Profile'
    src={'/avatar.png'}
    width={40}
    height={40}
    className='rounded-lg '
    />
    </Link>
=======
import Image from 'next/image'
import Link from 'next/link'

import { LinkButton } from '@/ui/button/LinkButton'

import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'

import { useAuthStore } from '@/store'

export function HeaderProfile() {
	const isLoggedIn = useAuthStore(set => set.isLoggedIn)
=======
import Image from 'next/image'
import Link from 'next/link'

import { LinkButton } from '@/ui/button/LinkButton'

import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'

import { authservice } from '@/services/auth.services'
import { useAuthStore } from '@/store'

export function HeaderProfile() {
	const user = useAuthStore(set => set.user)
	const isLoggedIn = useAuthStore(set => set.isLoggedIn)
	console.log(isLoggedIn)
>>>>>>> 20ea2b2d ([+]Added store for setUser and logout)
	return isLoggedIn ? (
		<>
			<Link
				href={STUDIO_PAGE.SETTINGS}
				className='shrink-0'
			>
				<Image
					alt='Profile'
					src={'/avatar.png'}
					width={40}
					height={40}
					className='rounded-lg '
				/>
<<<<<<< HEAD
=======
				<span className='w-10 h-4 text-black'>{user?.email}</span>
>>>>>>> 20ea2b2d ([+]Added store for setUser and logout)
			</Link>
		</>
	) : (
		<>
			<LinkButton href={PAGE.AUTH}>Auth</LinkButton>
<<<<<<< HEAD
		</>
	)
>>>>>>> 88b3b0f0 ([+] added login and logout buttons)
=======
			<span
				onClick={() => authservice.logout}
				className='w-10 h-4 text-black'
			>
				{user?.id}
			</span>
		</>
	)
>>>>>>> 20ea2b2d ([+]Added store for setUser and logout)
}
