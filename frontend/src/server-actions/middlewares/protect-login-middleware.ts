import { NextResponse, type NextRequest } from "next/server";
import { getTokensFromRequest } from "./utils/get-tokens-from-request";
import { nextRedirect } from "./utils/next-redirect";
import { STUDIO_PAGE } from "@/config/studio-page.config";
import { withAccessToken } from "./utils/with-access-token";

export async function protectLoginPages(request: NextRequest){
    const tokens = await getTokensFromRequest(request)
    if(!tokens) return NextResponse.next()

    const response = nextRedirect(STUDIO_PAGE.HOME, request.url)
    return tokens.refreshed ? withAccessToken(response, tokens.accessToken) : response
}
