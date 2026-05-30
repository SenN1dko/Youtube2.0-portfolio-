import { EnumTokens } from "@/constants/token.constants"
import { authservice } from "@/services/auth.services"
import { AxiosError } from "axios"
import type { NextRequest } from "next/server"
export async function getTokensFromRequest(request: NextRequest) {
    const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
    let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

    if(!refreshToken){
        request.cookies.delete(EnumTokens.ACCESS_TOKEN)
        return null         
    }
    if(!accessToken){
        try{
            const data = await authservice.getNewTokenWithRefresh(refreshToken)
            accessToken = data.accessToken
    }catch(error){
        if(error instanceof AxiosError){
        if(error.message === 'jwt expired'){
            console.log('invalid refresh token')
            request.cookies.delete(EnumTokens.ACCESS_TOKEN)
            request.cookies.delete(EnumTokens.REFRESH_TOKEN)
            return null     
        }
    }
    return null
    }

}
return {accessToken,refreshToken}
}