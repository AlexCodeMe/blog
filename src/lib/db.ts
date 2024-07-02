import { PrismaClient, User } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

{/**user utils */ }
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

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({ where: { id } })

    return user
  } catch (error) {
    console.log('getUserById', error)
  }
}

{/**blog post utils */ }
export async function getPostsByAuthor(author: User) {
  try {
    const posts = await db.blogPost.findMany({
      where: {
        authorId: author.id,
      },
      include: {
        author: true, // Including author information
      },
    })

    return { success: true, posts }
  } catch (error) {
    console.error('getPostsByAuthor error', error)
    return { error: 'Failed to get posts by author' }
  }
}

export async function getPostById(id: string) {
  try {
    const post = await db.blogPost.findUnique({
      where: { id },
      include: {
        author: true,
      }
    })

    if (!post) return { error: 'Post not found' }

    return { success: true, post }
  } catch (error) {
    console.error('getPostById error', error)
    return { error: 'Failed to get posts by post id' }
  }
}

export async function getAllPosts() {
  try {
    const posts = await db.blogPost.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' }
    })

    return { success: true, posts }
  } catch (error) {
    console.error('getAllPosts error', error)
    return { error: 'Failed to get all posts' }
  }
}