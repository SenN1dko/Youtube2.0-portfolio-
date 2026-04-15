import { authservice } from "@/services/auth.services"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useRef, useTransition } from "react"
import type { ReCAPTCHA } from "react-google-recaptcha"
import type { IAuthForm } from "./auth-form.type"
import type {  SubmitHandler, UseFormReset } from "react-hook-form"
import { PAGE } from "@/config/public-page.config"
import axios from "axios"
import toast from "react-hot-toast"

export function useAuthForm(type: 'login' | 'register', reset:UseFormReset<IAuthForm>) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const {mutateAsync, isPending:isAuthPending} = useMutation({
    mutationKey:[type],
    mutationFn: (data: IAuthForm) => authservice.main(type, data, recaptchaRef.current?.getValue() || null),

   
  }) 



	const onSubmit: SubmitHandler<IAuthForm> = data => {
        const token = recaptchaRef.current?.getValue()
        if (!token) {
            toast.error('Please complete the reCAPTCHA')
            return
        }
      toast.promise(mutateAsync(data), {
    loading: type === 'login' ? 'Logging in...' : 'Registering...',
    success: () => {
          startTransition(() => {
        reset()
        router.push(PAGE.HOME)
      })
    return type === 'login' ? 'Logged in successfully!' : 'Registered successfully!'
    },
    error: (e) => {
           if(axios.isAxiosError(e)) {
    return e.response?.data?.message 
  	}}
    }
)
    }
    const isLoading = isPending || isAuthPending
    return {   isLoading, onSubmit , recaptchaRef }
} 