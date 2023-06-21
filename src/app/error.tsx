'use client'

import { useEffect } from 'react'

import cn from '@/lib/cn'

interface ErrorProps {
  error: Error
  reset: () => void
}
// eslint-disable-next-line unused-imports/no-unused-vars
const ErrorPage = ({ error, reset: _reset }: ErrorProps) => {
  useEffect(() => {
    // log the error to error reporting service
    console.log(error)
  }, [error])

  return (
    <div className={cn('flex items-center justify-center')}>
      <p>Oh no, something went wrong... maybe refresh?</p>
    </div>
  )
}

export default ErrorPage
