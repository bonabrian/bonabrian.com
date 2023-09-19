import type { NextRequest } from 'next/server'

import { getErrorMessage, response } from '@/lib/api'
import fetcher from '@/lib/fetcher'
import { countAllEndorsements } from '@/services/endorsements'
import { countAllReactions } from '@/services/reactions'
import { countAllViews } from '@/services/views'

export const GET = async (
  _req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params
    switch (slug) {
      case 'profile':
        const userApiUrl = 'https://api.github.com/users/bonabrian'
        const user: any = await fetcher(userApiUrl, {
          next: { revalidate: 600 },
        })

        const repositories: Array<any> = await fetcher(`${userApiUrl}/repos`, {
          next: { revalidate: 600 },
        })

        const mine = repositories.filter(
          (repo: { fork: boolean }) => !repo.fork,
        )

        const stars: number = mine.reduce(
          (accumulator: number, repository: { stargazers_count: number }) => {
            const { stargazers_count: stargazers = 0 } = repository
            return accumulator + stargazers
          },
          0,
        )

        const endorsements = await countAllEndorsements()

        return response({
          followers: user.followers as number,
          stars,
          endorsements,
        })

      case 'site':
        const views = await countAllViews()
        const reactions = await countAllReactions()

        return response({ views, reactions })

      default:
        return response({ message: 'Invalid statistics key' }, 409)
    }
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
