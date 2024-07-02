'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { BlogPostSchema } from "@/lib/schemas"
import { z } from "zod"

export async function createPost(values: z.infer<typeof BlogPostSchema>) {
    const validatedFields = BlogPostSchema.safeParse(values)
    if (!validatedFields.success) return { error: 'invalid fields' }

    const { title, content } = validatedFields.data

    const session = await auth()
    if (!session?.user?.id) return { error: 'Unauthorized' }

    try {
        const newPost = await db.blogPost.create({
            data: {
                title,
                content,
                authorId: session.user.id,
            },
        })
        return { success: 'New Post created!', post: newPost }
    } catch (error) {
        console.error('createPost action error', error)
        return { error: 'Failed to create post' }
    }
}
