import {
  getContributions,
  getGitHubRepositories,
  getGitHubUser,
} from '@/actions/github'
import type { MessageResponse } from '@/lib/api'
import { getErrorMessage, response } from '@/lib/api'
import type { GitHubUserContributionsCollection } from '@/types/github'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const user = await getGitHubUser()
    const repositories = await getGitHubRepositories()
    const contributions = await getContributions()

    const mine = repositories.filter((repo) => !repo.fork)

    const stars: number = mine.reduce((acc: number, repo) => {
      const { stargazers_count: stargazers = 0 } = repo
      return acc + stargazers
    }, 0)

    return response<{
      followers: number
      stars: number
      contributions: GitHubUserContributionsCollection | undefined
    }>({
      followers: user.followers,
      stars,
      contributions,
    })
  } catch (err) {
    return response<MessageResponse>({ message: getErrorMessage(err) }, 500)
  }
}
