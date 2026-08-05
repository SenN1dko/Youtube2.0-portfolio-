'use client'

import dynamic from 'next/dynamic'
import { forwardRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { Logo } from '@/ui/logo/Logo'

import type { IAuthForm } from './auth-form.type'
import { useAuthForm } from './useAuthForm'

const DynamicRecaptcha = dynamic(() => import('./Recaptcha').then(mod => mod.Recaptcha))

const ForwardedRefRecaptcha = forwardRef<ReCAPTCHA>((props, ref) => (
	<DynamicRecaptcha
		{...props}
		forwardedRef={ref}
	/>
))

ForwardedRefRecaptcha.displayName = 'ForwardedRefRecaptcha'

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

						<ForwardedRefRecaptcha ref={recaptchaRef} />

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
