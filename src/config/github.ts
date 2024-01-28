import { env } from '@/lib/env'

export const GITHUB_ACCOUNT = {
  username: 'bonabrian',
  url: 'https://github.com/bonabrian',
  token: env.GITHUB_READ_USER_TOKEN_PERSONAL,
  type: 'personal',
  isActive: true,
}
