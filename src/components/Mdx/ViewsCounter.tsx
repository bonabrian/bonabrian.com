import { useEffect } from 'react'

import { useRequest } from '@/hooks'

import LoadingSpinner from '../LoadingSpinner'
import type { ViewsCounterProps } from './types'

export const ViewsCounter = ({ slug, draft }: ViewsCounterProps) => {
  // fix useEffect called twice
  // https://github.com/facebook/react/issues/24502#issuecomment-1118867879
  let ignored = false
  useEffect(() => {
    if (!ignored) {
      const hostname = window?.location?.hostname || 'localhost'
      // count views in production only
      if (hostname === 'bonabrian.com' && draft !== true) {
        const registerView = () =>
          fetch(`/api/views/${slug}`, {
            method: 'POST',
          })
        registerView()
      }
    }
    return () => {
      ignored = true
    }
  }, [slug])

  const { data: views, loading: isLoadViews } = useRequest<{ total?: string }>(
    `/api/views/${slug}`,
  )

  return (
    <span>
      {isLoadViews ? (
        <LoadingSpinner />
      ) : (
        <span>{`${views?.total} views`}</span>
      )}
    </span>
  )
}
