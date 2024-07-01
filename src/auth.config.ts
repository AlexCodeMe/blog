import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import bcrypt from 'bcryptjs'

import { LoginSchema } from "./lib/schemas"
import { getUserByUsername } from "./lib/db"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { username, password } = validatedFields.data

          const user = await getUserByUsername(username)
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          )
          if (passwordsMatch) return user
        }

        return null
      }
    })
  ],
} satisfies NextAuthConfig