'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Wrapper from "./wrapper"
import { z } from 'zod'
import { RegisterSchema } from '@/lib/schemas'
import { login } from '@/actions/login'
import { register } from '@/actions/register'

export default function RegisterForm() {
    const [formData, setFormData] = useState<z.infer<typeof RegisterSchema>>({
        username: '',
        password: '',
        name: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        onSubmit(formData)
    }

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        register(values)
    }

    return (
        <Wrapper headerLabel='Welcome!'
            backButtonLabel='Already have an account?'
            backButtonHref='/auth/login'
        >
            <form className='flex flex-col justify-end items-center space-y-4 w-full'
                onSubmit={handleSubmit}
            >
                <div className='flex items-center w-full'>
                    <label className='w-1/4'>Name</label>
                    <input
                        className='flex-grow border rounded px-2 py-1'
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex items-center w-full'>
                    <label className='w-1/4'>Username</label>
                    <input
                        className='flex-grow border rounded px-2 py-1'
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex items-center w-full'>
                    <label className='w-1/4'>Password</label>
                    <input
                        className='flex-grow border rounded px-2 py-1'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Register
                </button>
            </form>
        </Wrapper>
    )
}
