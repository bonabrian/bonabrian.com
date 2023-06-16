import { createHash } from 'crypto'
import type { NextRequest } from 'next/server'

export const getSessionId = (req: NextRequest) => {
  const ipAddress = req.headers.get('x-forwarded-for') || 'localhost'

  const sessionId = createHash('sha256')
    .update(ipAddress, 'utf-8')
    .digest('hex')

  return sessionId
}
