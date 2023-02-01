import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import getSkillCategories from '@/lib/getSkillCategories'
import type { SkillCategory } from '@/types'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SkillCategory[] | Object | string>,
) => {
  try {
    if (req.method === 'GET') {
      const skills = await getSkillCategories()
      return res.status(200).json(skills)
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

export default withSentry(handler)
