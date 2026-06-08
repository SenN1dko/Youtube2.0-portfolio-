'use client'

import { Controller } from 'react-hook-form'

import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'
import { UploadField } from '@/ui/upload-field/UploadField'

import { useSettings } from '@/hooks/useSettings'

export function SettingsForm() {
	const {
		formObject: {
			formState: { errors },
			register,
			handleSubmit,
			control
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
					<div>
						<Controller
							control={control}
							name='channel.avatar'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<UploadField
									error={error}
									label='Avatar:'
									value={value}
									folder='avatars'
									onChange={onChange}
								/>
							)}
						/>
						<Controller
							control={control}
							name='channel.banner'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<UploadField
									error={error}
									label='Banner:'
									value={value}
									folder='banners'
									aspectRatio='16:9'
									onChange={onChange}
								/>
							)}
						/>
					</div>
				</div>
				<div className='text-center mt-6'>
					<Button type='submit'>Update</Button>
				</div>
			</form>
		</div>
	)
}
