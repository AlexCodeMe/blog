import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      console.log({ sessionToken: token })

      return session
    },
    async jwt({ token, user }) {
      console.log({ token })

      return token
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})