import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getGroupedSkillsByCategory } from '@/services/skills'
import type { SkillCategory } from '@/types'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SkillCategory[] | Object | string>,
) => {
  try {
    if (req.method === 'GET') {
      const skills = await getGroupedSkillsByCategory()
      return res.status(200).json(skills)
    }

    return res.status(405).send({
      error: 'Method not allowed',
    })
  } catch (err) {
    return res.status(500).send({
      // @ts-ignore
      error: err?.message || err?.stackTrace.toString() || 'Unexpected error',
    })
  }
}

export default withSentry(handler)
