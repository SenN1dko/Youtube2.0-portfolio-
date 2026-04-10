import { STUDIO_PAGE } from "@/config/studio-page.config";
import {   Bell, LayoutGrid, PlusSquare } from "lucide-react";
import Link from "next/link";

export function HeaderLinks() {
    return <div className="flex items-center gap-4.5">
        <Link href={STUDIO_PAGE.UPLOAD_VIDEO}  className="transition-opacity hover:opacity-100 opacity-75">
            <PlusSquare size={20}/>
        </Link>
        <Link href={STUDIO_PAGE.HOME}className="transition-opacity hover:opacity-100 opacity-75">
            <LayoutGrid size={20}/>
        </Link>
        <Link href={STUDIO_PAGE.HOME }className="transition-opacity hover:opacity-100 opacity-75">
            <Bell size={20} />
        </Link>

    </div>
}
