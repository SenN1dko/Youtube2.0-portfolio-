import { EnumTokens } from "@/constants/token.constants"
import type { NextRequest } from "next/server"
import { getNewTokensByRefresh } from "./get-new-token-by-refresh"
import { jwtVerifyServer } from "./jwt-verify"

export interface ITokensFromRequest {
    accessToken: string
    refreshed: boolean
}

export async function getTokensFromRequest(
    request: NextRequest
): Promise<ITokensFromRequest | null> {
    const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
    const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

    if (accessToken && (await jwtVerifyServer(accessToken))) {
        return { accessToken, refreshed: false }
    }

    if (!refreshToken) return null

    try {
        const data = await getNewTokensByRefresh(refreshToken)
        return { accessToken: data.accessToken, refreshed: true }
    } catch (error) {
        console.log("failed to refresh access token", error)
        return null
    }
}
