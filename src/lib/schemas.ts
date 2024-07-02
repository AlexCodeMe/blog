import { z } from "zod";

export const LoginSchema = z.object({
    username: z.string().min(1, {
        message: 'username required'
    }),
    password: z.string().min(1, {
        message: 'password required'
    })
})

export const RegisterSchema = z.object({
    username: z.string().min(6, {
        message: "username must be at least 6 characters",
    }),
    password: z.string().min(6, {
        message: "password must be at least 6 characters",
    }),
    name: z.string().min(1, {
        message: "please enter a name",
    }),
})

export const ProfileSchema = z.object({
    bio: z.string().optional(),
    image: z.string().optional(),
    email: z.string().email().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
})

export const BlogPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required')
})
