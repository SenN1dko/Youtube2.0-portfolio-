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
}
