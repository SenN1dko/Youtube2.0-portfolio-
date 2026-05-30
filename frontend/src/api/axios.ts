import { API_URL } from "@/constants/constants";
import { EnumTokens } from "@/constants/token.constants";
import type { CreateAxiosDefaults } from "axios";
import axios from "axios";
import Cookies from "js-cookie";
import { errorCatch } from "./api.helper";
import { authservice } from "@/services/auth.services";

const options:CreateAxiosDefaults = {
    baseURL:API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}
export const axiosCLassic = axios.create(options)
export const instance = axios.create(options)

instance.interceptors.request.use(config => {
const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)

if(config.headers && accessToken){
    config.headers.Authorization = `Bearer ${accessToken}`
}
return config 
})

instance.interceptors.response.use(response => response , async error =>{
    const originalRequest = error.config

    if(error.response.status === 401 || errorCatch(error) === 'You are not authorized' || errorCatch(error) === 'jwt expired'
    && !originalRequest._retry && originalRequest){
        originalRequest._retry = true
        try{
            await authservice.getNewToken()
            return instance.request(originalRequest)
        }catch(error){
            if(errorCatch(error) === 'Refresh token is missing'){
                authservice.removeFromStorage()
                throw error
                }      
            }
        }
    throw error 
    }
)