import type { NextRequest } from "next/server"
import { nextRedirect } from "./next-redirect"
import { PAGE } from "@/config/public-page.config"

export const redirectToLogin = (request:NextRequest) => {
    return nextRedirect(PAGE.AUTH , request.url)
}