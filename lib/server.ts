import { createHash } from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const response = <T>(
  data: T,
  status: number = 200,
  options?: ResponseInit,
) => {
  return new NextResponse(JSON.stringify(data), {
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json',
    },
    status,
    ...options,
  });
};

export const getSessionId = (req: NextRequest): string => {
  const ipAddress = req.headers.get('x-forwarded-for') ?? 'localhost';

  const sessionId = createHash('sha256')
    .update(ipAddress, 'utf-8')
    .digest('hex');

  return sessionId;
};
