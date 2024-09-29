import type { DefaultSession } from 'next-auth';
// eslint-disable-next-line unused-imports/no-unused-imports
import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id?: string;
    user: {} & DefaultSession['user'];
  }
}
