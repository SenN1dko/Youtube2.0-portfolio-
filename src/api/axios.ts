import { API_URL } from "@/constants/constants";
import type { CreateAxiosDefaults } from "axios";
import axios from "axios";

const options:CreateAxiosDefaults = {
    baseURL:API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}
export const axiosCLassic = axios.create(options)
