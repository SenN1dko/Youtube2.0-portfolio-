'use client'

import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { Logo } from '@/ui/logo/Logo'

import type { IAuthForm } from './auth-form.type'
import styles from './captcha.module.scss'
import { useAuthForm } from './useAuthForm'

export function Auth() {
	const [isLogin, setIsLogin] = useState(true)
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset
	} = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit, recaptchaRef } = useAuthForm(isLogin ? 'login' : 'register', reset)

	return (
		<>
			<div className='flex items-center justify-center w-screen h-screen '>
				<div className='w-1/6 py-4 px-5 border border-border rounded'>
					<div className='text-center mb-3'>
						<Logo />
					</div>
					<div className='flex justify-center mb-6'>
						<button
							type='button'
							className={`px-4 py-2 cursor-pointer font-semibold ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
							onClick={() => setIsLogin(true)}
						>
							Login
						</button>
						<button
							type='button'
							className={`px-4 py-2 font-semibold cursor-pointer ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
							onClick={() => setIsLogin(false)}
						>
							Sign Up
						</button>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Field
							label='Email'
							type='email'
							registration={register('email', { required: 'Email is required' })}
							error={errors.email?.message}
							placeholder='Enter an email:'
						/>
						<Field
							label='Password'
							type='password'
							registration={register('password', { required: 'Password is required' })}
							error={errors.password?.message}
							placeholder='Enter a password:'
						/>
						{!isLogin && (
							<Field
								label='Password confirmation'
								type='password'
								registration={register('passwordConfirmation', {
									required: 'Passwords don`t match',
									validate: value => value === watch('password') || 'Passwords don`t match'
								})}
								error={errors.passwordConfirmation?.message}
								placeholder='Enter password again:'
							/>
						)}

						<ReCAPTCHA
							size='normal'
							sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
							ref={recaptchaRef}
							className={styles.recaptcha}
							theme='light'
						/>

						<div className='text-center mt-6'>
							<Button
								type='submit'
								isLoading={isLoading}
							>
								{isLogin ? 'Login' : 'Sign Up'}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
