import { GITHUB_ACCOUNTS } from '@/data/app'
import fetcher from '@/lib/fetcher'
import type {
  AccountType,
  GithubUserContributionsCollection,
  GithubUserContributionsResponse,
} from '@/types/github'

const GITHUB_USER_ENDPOINT = 'https://api.github.com/graphql'

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

export const fetchAccountContributions = async (
  username: string,
  token?: string,
): Promise<GithubUserContributionsCollection | undefined> => {
  const response = await fetcher<GithubUserContributionsResponse>(
    GITHUB_USER_ENDPOINT,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: GITHUB_USER_QUERY,
        variables: {
          username,
        },
      }),
    },
  )

  return response?.data?.user
}

export const getAccountContributions = async (
  type: AccountType,
): Promise<GithubUserContributionsCollection | undefined> => {
  const account = GITHUB_ACCOUNTS.find(
    (account) => account?.type === type && account?.isActive,
  )

  if (!account) throw new Error('Invalid user type')

  const { username, token } = account
  return await fetchAccountContributions(username, token)
}
