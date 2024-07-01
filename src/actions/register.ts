'use server'

import bcrypt from 'bcryptjs'
import { z } from "zod"

import { RegisterSchema } from "@/lib/schemas"
import { db, getUserByUsername } from '@/lib/db'

export async function register(values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values)
    if (!validatedFields.success) return { error: 'invalid fields' }

    const { username, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByUsername(username)
    if (existingUser) return { error: 'username must be unique' }

    await db.user.create({
        data: {
            name,
            username,
            password: hashedPassword,
        }
    })

    return { success: 'user created' }
} 