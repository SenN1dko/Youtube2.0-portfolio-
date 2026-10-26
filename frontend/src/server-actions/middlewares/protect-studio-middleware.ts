import { NextResponse, type NextRequest } from "next/server";
import { getTokensFromRequest } from "./utils/get-tokens-from-request";
import { redirectToLogin } from "./utils/redirect-to-login";
import { withAccessToken } from "./utils/with-access-token";

export async function protectStudio(request: NextRequest){
    const tokens = await getTokensFromRequest(request)
    if(!tokens) return redirectToLogin(request)

    const response = NextResponse.next()
    return tokens.refreshed ? withAccessToken(response, tokens.accessToken) : response
}
