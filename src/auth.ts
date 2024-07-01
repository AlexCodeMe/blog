import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"

import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db, getUserById } from "./lib/db"

declare module 'next-auth' {
  interface Session {
    user: {
      email?: string
      image?: string
      bio?: string
      twitter?: string
      facebook?: string
      linkedin?: string
      instagram?: string
    } & DefaultSession['user']
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      console.log({ sessionToken: token })
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      return session
    },
    async jwt({ token }) {
      console.log({ token })
      if (!token.sub) return token

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})