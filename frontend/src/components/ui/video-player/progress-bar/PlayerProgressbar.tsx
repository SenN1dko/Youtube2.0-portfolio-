export function PlayerProgressbar({ progress }: { progress: number }) {
	console.log(progress)
	return (
		<>
			<div className='absolute -top-0.5 left-0 w-full bg-gray-200 '>
				<div
					style={{
						width: `${progress}%`
					}}
					className='h-1 bg-primary relative'
				></div>
			</div>
		</>
	)
}
