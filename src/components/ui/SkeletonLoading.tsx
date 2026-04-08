import  { twMerge } from "tailwind-merge"

interface Props {
    count?: number,
    className?: string
    style?: React.CSSProperties
}

export function SkeletonLoading({count=1, className='', style}: Props) {
    return <>
    {Array.from({length: count}).map((_, index) => (
        <div className={twMerge('bg-slate-800 rounded-md h-10 mb-2.5 animate-pulse', className)} style={style} key={index}></div>
    ))
   }   </>
}
