'use server'

import { jwtVerify } from "jose"

interface ITokenInside { 
    id:string
}

export const jwtVerifyServer = async (accessToken:string) => {
 try{
    const {payload}:{payload:ITokenInside} = await jwtVerify(accessToken , 
        new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)
    )
    return payload
 }catch(error){
console.log('error verifying token' , error)
return null
}
}