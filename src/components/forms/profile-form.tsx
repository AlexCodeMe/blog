'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Wrapper from './wrapper'
import { z } from 'zod'
import { ProfileSchema } from '@/lib/schemas'
import { updateProfile } from '@/actions/profile'

export default function ProfileForm() {
  const [formData, setFormData] = useState<z.infer<typeof ProfileSchema>>({
    bio: '',
    image: '',
    email: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    onSubmit(formData)
  }

  function onSubmit(values: z.infer<typeof ProfileSchema>) {
    updateProfile(values)
  }

  return (
    <Wrapper className='!w-full'
      headerLabel='Hello! Update your profile.'
      backButtonLabel='create a blog post'
      backButtonHref='/create-post'
    >
      <form className='flex flex-col justify-end items-center space-y-4 w-full' onSubmit={handleSubmit}>
        <div className='flex items-center w-full'>
          <label className='w-1/4'>Email</label>
          <input
            className='flex-grow border rounded px-2 py-1'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center w-full'>
          <label className='w-1/4'>Bio</label>
          <input
            className='flex-grow border rounded px-2 py-1'
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center w-full'>
          <label className='w-1/4'>Image</label>
          <input
            className='flex-grow border rounded px-2 py-1'
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center w-full'>
          <label className='w-1/4'>LinkedIn</label>
          <input
            className='flex-grow border rounded px-2 py-1'
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center w-full'>
          <label className='w-1/4'>Twitter</label>
          <input
            className='flex-grow border rounded px-2 py-1'
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center w-full'>
          <label className='w-1/4'>Facebook</label>
          <input
            className='flex-grow border rounded px-2 py-1'
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center w-full'>
          <label className='w-1/4'>Instagram</label>
          <input
            className='flex-grow border rounded px-2 py-1'
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
        </div>
        <button type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Profile
        </button>
      </form>
    </Wrapper>
  )
}
