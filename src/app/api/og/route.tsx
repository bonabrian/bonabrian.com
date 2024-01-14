import type { SatoriOptions } from 'next/dist/compiled/@vercel/og/satori'
import { ImageResponse } from 'next/og'
import { type NextRequest, NextResponse } from 'next/server'

import OGImage from '@/components/og-image'

export const runtime = 'edge'

const getCalFont = async (): Promise<SatoriOptions['fonts'] | undefined> => {
  const fontCalSansUrl = new URL(
    '../../../../public/static/fonts/CalSans-SemiBold.ttf',
    import.meta.url,
  )

  const fontPlusJakartaSansUrl = new URL(
    '../../../../public/static/fonts/PlusJakartaSans-Regular.ttf',
    import.meta.url,
  )

  try {
    const fontCalSans = await fetch(fontCalSansUrl)
      .then((res) => res.arrayBuffer())
      .catch(null)

    const fontPlusJakartaSans = await fetch(fontPlusJakartaSansUrl)
      .then((res) => res.arrayBuffer())
      .catch(null)

    if (!fontCalSans || !fontPlusJakartaSans) return undefined

    return [
      {
        name: 'Cal Sans',
        data: fontCalSans,
        style: 'normal',
      },
      {
        name: 'Plus Jakarta Sans',
        data: fontPlusJakartaSans,
        style: 'normal',
      },
    ]
  } catch (e) {
    return undefined
  }
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title')
  const caption = searchParams.get('caption')
  const date = searchParams.get('date')

  if (!title) {
    return NextResponse.json({ message: 'Missing title' }, { status: 400 })
  }

  return new ImageResponse(
    <OGImage title={title} caption={caption} date={date} />,
    {
      width: 1200,
      height: 630,
      emoji: 'fluent',
      fonts: await getCalFont(),
    },
  )
}
