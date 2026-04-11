import type { LucideIcon } from "lucide-react"

interface Props {
    children: React.ReactNode
    Icon?: LucideIcon
    isH1?: boolean
}

export function Heading({Icon, children, isH1 = false}: Props) {
    return <div className="mb-1.5 flex items-center gap-2 opacity-90">
{Icon && <Icon className="text-primary" />}
        {isH1 ? (
            <h1 className="text-xl font-bold">{children}</h1>
        ) : (
            <h2 className="text-lg font-bold">{children}</h2>
        )}
    </div> 
}
