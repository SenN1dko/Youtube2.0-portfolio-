import { API_URL } from "@/constants/constants";
import { EnumTokens } from "@/constants/token.constants";
import type { CreateAxiosDefaults } from "axios";
import axios from "axios";
import Cookies from "js-cookie";

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