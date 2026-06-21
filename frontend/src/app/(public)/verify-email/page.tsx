import VerifiedPageContent from './VerifyEmailContent'

interface TVerifyEmailPageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function VerifiedPage({ searchParams }: TVerifyEmailPageProps) {
	const { token } = await searchParams
	console.log(token)
	if (!token || typeof token !== 'string') {
		return <div>Invalid or missing token</div>
	}
	return (
		<>
			<VerifiedPageContent token={token} />
		</>
	)
}
