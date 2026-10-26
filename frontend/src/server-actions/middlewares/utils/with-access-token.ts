import { EnumTokens } from "@/constants/token.constants"
import type { NextResponse } from "next/server"

export function withAccessToken(response: NextResponse, accessToken: string) {
    response.cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
        path: "/",
        sameSite: "strict",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    return response
}
