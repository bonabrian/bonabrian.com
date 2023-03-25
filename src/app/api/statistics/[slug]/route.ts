import type { NextRequest } from 'next/server'

import { getErrorMessage, response } from '@/lib/api'
import fetcher from '@/lib/fetcher'
import prisma from '@/lib/prisma'

export const GET = async (
  _req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params
    switch (slug) {
      case 'github':
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

        const stars = mine.reduce(
          (accumulator: number, repository: { stargazers_count: number }) => {
            const { stargazers_count: stargazers = 0 } = repository
            return accumulator + stargazers
          },
          0,
        )

        return response({ followers: user.followers, stars })

      case 'endorsements':
        const endorsements = await prisma.endorsement.count()
        const totalEndorsements = (endorsements || 0).toString()

        return response({ total: totalEndorsements })

      case 'views':
        const viewsData = await prisma.counter.aggregate({
          _sum: {
            views: true,
          },
        })
        const totalViews = (viewsData._sum.views || 0).toString()
        return response({ total: totalViews })

      case 'reactions':
        const reactionsData = await prisma.counter.aggregate({
          _sum: {
            loves: true,
            likes: true,
            stars: true,
          },
        })

        const totalReactions = {
          loves: (reactionsData._sum.loves || 0).toString(),
          likes: (reactionsData._sum.likes || 0).toString(),
          stars: (reactionsData._sum.stars || 0).toString(),
        }

        return response(totalReactions)

      default:
        return response({ message: 'Invalid statistics key' }, 409)
    }
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
