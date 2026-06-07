'use client'

import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'

import { useSettings } from '@/hooks/useSettings'

export function SettingsForm() {
	const {
		formObject: {
			formState: { errors },
			register,
			handleSubmit
		},
		onSubmit,
		isProfileLoading
	} = useSettings()

	if (isProfileLoading) return <div>Loading...</div>

	return (
		<div className='w-3/5'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 gap-10 '>
					<div>
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
						<Field
							label='Name'
							type='text'
							registration={register('username')}
							error={errors.username?.message}
							placeholder='Enter a name:'
						/>
						<Field
							label='Slug'
							type='text'
							registration={register('channel.slug')}
							error={errors.channel?.slug?.message}
							placeholder='Enter a slug:'
						/>
						<Textarea
							label='Description'
							rows={4}
							registration={register('channel.description')}
							error={errors.channel?.description?.message}
							placeholder='Enter a description:'
						/>
					</div>
					<div></div>
				</div>
				<div className='text-center mt-6'>
					<Button type='submit'>Update</Button>
				</div>
			</form>
		</div>
	)
}
