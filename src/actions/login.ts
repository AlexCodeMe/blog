'use server'

import { LoginSchema } from "@/lib/schemas";
import { z } from "zod";
import bcrypt from 'bcryptjs'
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { AuthError } from "next-auth";

export async function login(values: z.infer<typeof LoginSchema>) {
    const validatedFields = LoginSchema.safeParse(values)
    if (!validatedFields.success) return { error: 'invalid fields' }

    const { username, password } = validatedFields.data

    try {
        await signIn('credentials', {
            username,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error
    }
}