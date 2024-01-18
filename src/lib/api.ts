import { NextResponse } from 'next/server'

export interface MessageResponse {
  message: string
}

export const response = <T>(data: T, status: number = 200) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  return new NextResponse(data === null ? null : JSON.stringify(data), {
    status,
    headers,
  })
}

export const getErrorMessage = (error: string | Error | unknown): string => {
  if (error instanceof Error) {
    return error?.message
  }

  return 'Unexpected error'
}
