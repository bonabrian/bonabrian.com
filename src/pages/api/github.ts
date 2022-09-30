import type { NextApiRequest, NextApiResponse } from 'next'

const userApiUrl = 'https://api.github.com/users/bonabrian'

export const config = {
  runtime: 'experimental-edge',
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const userRequest = await fetch(userApiUrl)
      const userRepoRequest = await fetch(`${userApiUrl}/repos`)

      const user = await userRequest.json()
      const repositories = await userRepoRequest.json()
      const mine = repositories.filter((repo: { fork: boolean }) => !repo.fork)

      const stars = mine.reduce(
        (accumulator: number, repository: { stargazers_count: number }) => {
          const { stargazers_count: stargazers = 0 } = repository
          return accumulator + stargazers
        },
        0,
      )

      res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=3600',
      )

      return res.status(200).json({
        followers: user.followers,
        stars,
      })
    }

    return res.status(405).send({
      message: 'Method not allowed',
    })
  } catch (err) {
    return res.status(500).send({
      // @ts-ignore
      message: err?.message || err?.stackTrace.toString() || 'Unexpected error',
    })
  }
}

export default handler
