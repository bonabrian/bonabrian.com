import { env } from '@/data/env'

export type AccountType = 'personal' | 'work'

export interface GithubAccount {
  username: string
  endpoint: string
  token?: string
  type: AccountType
  isActive: boolean
}

export interface ContributionCalendar {
  colors: string[]
  totalContributions: number
  months: {
    firstDay: string
    name: string
    totalWeeks: number
  }[]
  weeks: {
    contributionDays: {
      color: string
      contributionCount: number
      date: string
    }[]
    firstDay: string
  }[]
}

export interface GithubUserContributionsCollection {
  contributionsCollection: {
    contributionCalendar: ContributionCalendar
  }
}

export interface GithubUserContributionsResponse {
  data?: {
    user?: GithubUserContributionsCollection
  }
}

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
