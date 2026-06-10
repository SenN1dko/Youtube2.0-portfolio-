import VerifiedPageContent from './VerifyEmailContent'
import type { TPageSlugProp } from '@/types/page.types'

export default async function VerifiedPage({ params }: TPageSlugProp) {
	const { slug } = await params

	return (
		<>
			<VerifiedPageContent token={slug} />
		</>
	)
}
