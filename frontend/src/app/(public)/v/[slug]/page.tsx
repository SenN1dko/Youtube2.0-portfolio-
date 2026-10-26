import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { stripToHtml } from 'utils/strip-html'

import { SingleVideo } from './SingleVideo'
import { videoService } from '@/services/video.services'
import type { TPageSlugProp } from '@/types/page.types'

// Старые ссылки вида /v/<publicId> продолжают работать и редиректят на slug
async function getVideo(slug: string) {
	const bySlug = await videoService.bySlug(slug).catch(() => null)
	if (bySlug) return bySlug

	return videoService.byPublicId(slug).catch(() => null)
}

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const { slug } = await params
	const data = await getVideo(slug)

	if (!data) return { title: 'Video not found' }

	const video = data.data

	return {
		title: video?.channel?.owner?.username || 'Video Player',
		description: stripToHtml(video?.description || '').slice(0, 150),
		openGraph: {
			type: 'video.other',
			images: [video.thumbnailUrl]
		}
	}
}

export async function generateStaticParams() {
	const { data } = await videoService.getAll()

	return data.map(video => ({
		slug: video.slug
	}))
}

export const revalidate = 100
export const dynamic = 'force-static'

export default async function VideoPage({ params }: TPageSlugProp) {
	const { slug } = await params

	const data = await getVideo(slug)
	if (!data) notFound()

	const video = data.data
	if (video.slug !== slug) redirect(`/v/${video.slug}`)

	return <SingleVideo video={video} />
}
