import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

{/**user utils */}
export async function getUserByUsername(username: string) {
  try {
    const user = await db.user.findUnique({
      where: { username }
    })

    return user
  } catch (error) {
    console.error('getUserByUserName', error)
    return null
  }
}