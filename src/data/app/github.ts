import { env } from '@/data/env'
import type { GithubAccount } from '@/types/github'

export const GITHUB_ACCOUNTS: GithubAccount[] = [
  {
    username: 'bonabrian',
    endpoint: '/api/github?type=personal',
    token: env.GITHUB_READ_USER_TOKEN_PERSONAL,
    type: 'personal',
    isActive: true,
  },
  // add another github accounts below
]
