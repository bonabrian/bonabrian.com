'use server'

import { GITHUB_ACCOUNT } from '@/config/github'
import fetcher from '@/lib/fetcher'
import type {
  GitHubUserContributionsCollection,
  GitHubUserContributionsResponse,
} from '@/types/github'

const GITHUB_USER_API_URL = `https://api.github.com/users/${GITHUB_ACCOUNT.username}`
const GITHUB_USER_GRAPHQL_URL = 'https://api.github.com/graphql'
const PERSONAL_ACCESS_TOKEN = GITHUB_ACCOUNT.token

const GITHUB_USER_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
          firstDay
        }
      }
    }
  }
}`

export const getGitHubUser = async (): Promise<{ followers: number }> => {
  return await fetcher(GITHUB_USER_API_URL, {
    headers: {
      Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
    },
    next: { revalidate: 600 },
  })
}

export const getGitHubRepositories = async (): Promise<
  Array<{
    fork: boolean
    stargazers_count: number
  }>
> => {
  return await fetcher(`${GITHUB_USER_API_URL}/repos`, {
    headers: {
      Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
    },
    next: { revalidate: 600 },
  })
}

export const getContributions = async (): Promise<
  GitHubUserContributionsCollection | undefined
> => {
  const response = await fetcher<GitHubUserContributionsResponse>(
    GITHUB_USER_GRAPHQL_URL,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: GITHUB_USER_QUERY,
        variables: {
          username: GITHUB_ACCOUNT.username,
        },
      }),
    },
  )

  return response?.data?.user
}
