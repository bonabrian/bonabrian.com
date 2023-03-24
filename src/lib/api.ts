export const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
}

export const getErrorMessage = (error: unknown): string => {
  // @ts-ignore
  return error?.message || error?.stackTrace.toString() || 'Unexpected error'
}
