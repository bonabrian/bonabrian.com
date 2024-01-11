import { useEffect } from 'react'

import useRequest from './use-request'

const useView = ({
  slug,
  trackView,
}: {
  slug: string
  trackView?: boolean
}) => {
  const { data, loading } = useRequest<{ total: number }>(`/api/views/${slug}`)

  const registerView = (slug: string) => {
    fetch(`/api/views/${slug}`, { method: 'POST' })
  }

  useEffect(() => {
    if (trackView) {
      registerView(slug)
    }
  }, [slug, trackView])

  return { views: data, loading }
}

export default useView
