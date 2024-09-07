import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import prisma from './db';
import { env } from './env';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
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
    signIn: '/authentication',
  },
  callbacks: {
    session: async ({ session, user }) => {
      session.id = user.id;
      return Promise.resolve(session);
    },
  },
};
