import { NextRequest } from "next/server";
import { STUDIO_PAGE } from "./config/studio-page.config";
import { protectStudio } from "./server-actions/middlewares/protect-studio-middleware";
import { PAGE } from "./config/public-page.config";
import { protectLoginPages } from "./server-actions/middlewares/protect-login-middleware";
export function middleware(request:NextRequest ){
    const url = new URL(request.url)
    const pathname = url.pathname
    if(pathname.includes(STUDIO_PAGE.HOME) || pathname.includes(PAGE.MY_CHANNEL) || pathname.includes('/my') ){
        return protectStudio(request)
    }
    if(pathname.includes(PAGE.AUTH)){
        return protectLoginPages(request)
}
}
export const config = {
    matcher:['/studio/:path*'  , '/auth/:path*' , '/my-channel/:path*' , '/subscription/:path*' , '/my/:path*' ]
}
