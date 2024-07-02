'use client'

import { createPost } from "@/actions/create-post"
import { BlogPostSchema, ProfileSchema } from "@/lib/schemas"
import { ChangeEvent, FormEvent, useState } from "react"
import { z } from "zod"
import Wrapper from "./wrapper"

export default function NewBlogForm() {
    const [formData, setFormData] = useState<z.infer<typeof BlogPostSchema>>({
        title: '',
        content: ''
    })

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

    function onSubmit(values: z.infer<typeof BlogPostSchema>) {
        createPost(values)
    }
  return (
    <Wrapper
      headerLabel={`New Blog Page`}
      backButtonLabel='create a blog post'
      backButtonHref='/create-post'
    >
      <form className='flex flex-col justify-end items-center space-y-4 w-full'
        onSubmit={handleSubmit}
      >
        <div className='flex items-center w-full'>
          <label className='w-1/4'>Blog Title</label>
          <input
            className='flex-grow border rounded px-2 py-1'
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center w-full'>
          <label className='w-1/4'>Blog Content</label>
          <textarea
            className='flex-grow border rounded px-2 py-1'
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center justify-end gap-10'>
          <button type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit Post
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
