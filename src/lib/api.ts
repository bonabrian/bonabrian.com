import { NextResponse } from 'next/server'

export const getErrorMessage = (error: unknown): string => {
  // @ts-ignore
  return error?.message || error?.stackTrace.toString() || 'Unexpected error'
}

const headers: HeadersInit = {
  'Content-Type': 'application/json',
}

export const response = (data: any, status: number = 200) => {
  return new NextResponse(JSON.stringify(data), { status, headers })
}
