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
    bio: z.string(),
    image: z.string(),
    email: z.string(), // TODO: proper email check
    twitter: z.string(), // TODO: proper twitter url check
    facebook: z.string(), // TODO: proper facebook url check
    linkedin: z.string(), // TODO: proper linkedin url check
    instagram: z.string() // TODO: proper instagram url
})