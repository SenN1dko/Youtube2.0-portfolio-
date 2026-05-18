import { NextRequest, NextResponse } from "next/server";
import {PAGE} from '@/config//public-page.config'
import { EnumTokens } from "@/constants/token.constants";
export function middleware(request:NextRequest){
    const token = request.cookies.get(EnumTokens.ACCESS_TOKEN)
    // const isStudioPage = request.nextUrl.pathname.startsWith('/studio')
    // const isUploadPage = request.nextUrl.pathname.startsWith('/upload')
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

    if(isAuthPage && token){
        return NextResponse.redirect(new URL(PAGE.HOME , request.url))
    }
    return NextResponse.next()
}
export const config = {
    matcher:['/studio/:path*' ,'/upload/:path*' , '/auth/:path*' ]
}