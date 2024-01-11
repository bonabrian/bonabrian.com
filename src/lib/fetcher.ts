const fetcher = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(input, init)
  return (await res.json()) as T
}

export default fetcher
