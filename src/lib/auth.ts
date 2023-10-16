import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/data/env'
import prisma from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID!,
      clientSecret: env.GITHUB_SECRET!,
      checks: 'none',
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID!,
      clientSecret: env.GOOGLE_SECRET!,
      checks: 'none',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    session: async ({ session, user }) => {
      // eslint-disable-next-line no-param-reassign
      session.id = user.id
      return Promise.resolve(session)
    },
  },
}
