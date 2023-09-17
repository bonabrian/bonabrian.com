import { getErrorMessage, response } from '@/lib/api'
import fetcher from '@/lib/fetcher'
import { countAllEndorsements } from '@/services/endorsements'
import { countAllReactions } from '@/services/reactions'
import { countAllViews } from '@/services/views'

export const GET = async () => {
  try {
    const githubUserApiUrl = 'https://api.github.com/users/bonabrian'
    const githubUser: any = await fetcher(githubUserApiUrl, {
      next: { revalidate: 600 },
    })

    const repositories: Array<any> = await fetcher(
      `${githubUserApiUrl}/repos`,
      {
        next: { revalidate: 600 },
      },
    )

    const mine = repositories.filter((repo: { fork: boolean }) => !repo.fork)

    const stars: number = mine.reduce(
      (accumulator: number, repository: { stargazers_count: number }) => {
        const { stargazers_count: stargazers = 0 } = repository
        return accumulator + stargazers
      },
      0,
    )

    const endorsements = await countAllEndorsements()
    const views = await countAllViews()
    const reactions = await countAllReactions()

    return response({
      github: {
        followers: githubUser.followers as number,
        stars,
      },
      endorsements,
      views,
      reactions,
    })
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
