import type { LucideIcon } from "lucide-react"

interface Props {
    children: React.ReactNode
    Icon?: LucideIcon
}

export function Heading({Icon, children}: Props) {
    return <div className="mb-1.5 flex items-center gap-2 opacity-90">
{Icon && <Icon className="text-primary" />}
        <h2 className="text-lg font-bold">{children}</h2>
    </div> 
}
