import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { DRAFT_COOKIE } from '@/lib/draft'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // JWT strategy so the Credentials (email/password) provider works alongside
  // OAuth. The adapter still persists users/accounts for Google.
  session: { strategy: 'jwt' },
  providers: [
    // Reads AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET from the environment.
    Google({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        const email = String(creds?.email ?? '').toLowerCase().trim()
        const password = String(creds?.password ?? '')
        if (!email || !password) return null
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user?.passwordHash) return null
        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) return null
        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  pages: { signIn: '/auth/sign-in' },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (token?.id && session.user) session.user.id = token.id as string
      return session
    },
  },
  events: {
    // On sign-in, claim the anonymous draft created at /start (cov_draft cookie)
    // and attach it to the account.
    async signIn({ user }) {
      if (!user?.id) return
      try {
        const token = (await cookies()).get(DRAFT_COOKIE)?.value
        if (!token) return
        await prisma.willApplication.updateMany({
          where: { draftToken: token, userId: null },
          data: { userId: user.id },
        })
      } catch {
        // Non-fatal: sign-in should still succeed even if claiming fails.
      }
    },
  },
})
