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
