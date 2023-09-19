import type { GithubAccount } from '@/app/dashboard/types/github'

export const GITHUB_ACCOUNTS: GithubAccount[] = [
  {
    username: 'bonabrian',
    endpoint: '/api/github?type=personal',
    token: process.env.GITHUB_READ_USER_TOKEN_PERSONAL,
    type: 'personal',
    isActive: true,
  },
  // add another github accounts below
]
