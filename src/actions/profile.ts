'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { ProfileSchema } from '@/lib/schemas'
import { z } from 'zod'

export async function updateProfile(values: z.infer<typeof ProfileSchema>) {
  const validatedFields = ProfileSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'invalid fields' }
  console.log('validatedFields.data', validatedFields.data)
  const {
    bio,
    image,
    email,
    twitter,
    facebook,
    linkedin,
    instagram
  } = validatedFields.data

  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }
  console.log('updateProfile session', session)

  try {
    await db.user.update({
      where: {
        id: session.user.id
      },
      data: {
        bio,
        image,
        email,
        twitter,
        facebook,
        linkedin,
        instagram
      }
    })

    return { success: 'Profile updated!' }
  } catch (error) {
    console.error('updateProfile action', error)
    return { error: 'Failed to update profile' }
  }
}
