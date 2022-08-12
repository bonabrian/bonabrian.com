import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getSkillsByCategory } from '@/lib/db'
import type { SkillCategory } from '@/types/skill'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SkillCategory[] | string>,
) => {
  if (req.method === 'GET') {
    const skillsByCategory = await getSkillsByCategory()
    return res.status(200).json(skillsByCategory)
  }
  return res.send('Method not allowed')
}

export default withSentry(handler)
