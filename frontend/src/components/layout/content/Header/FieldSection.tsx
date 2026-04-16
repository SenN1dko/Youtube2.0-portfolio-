import { useState } from "react"
import { useRouter } from "next/navigation"
import { PAGE } from "@/config/public-page.config"
// interface Props {

// }

export function FieldSection() {
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return
        e.preventDefault()
        if (searchTerm.trim() === ''){
              router.push(PAGE.HOME)
              return
        }
        router.push(PAGE.SEARCH(searchTerm))
    }

    return <div className="w-2/3 ">
        <input type="search" className="bg-transparent py-2 px-4 w-1/3 outline-none border-none" placeholder="Search for videos" 
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onKeyDown={onKeyDown}
        />
    </div>
}
