import { NextResponse } from 'next/server'

export const response = <T>(data: T, status: number = 200) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  return new NextResponse(data === null ? null : JSON.stringify(data), {
    status,
    headers,
  })
}

export const getErrorMessage = (error: string | Error | any): string => {
  if (error instanceof Error) {
    return error?.message
  }

  return 'Unexpected error'
}
