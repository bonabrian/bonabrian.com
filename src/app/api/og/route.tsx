import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'

import { getErrorMessage, response } from '@/lib/api'

export const runtime = 'edge'

const fontRegular = fetch(
  new URL('../../../../assets/fonts/Poppins-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer())
const fontBold = fetch(
  new URL('../../../../assets/fonts/Poppins-Bold.ttf', import.meta.url),
).then((res) => res.arrayBuffer())

export const GET = async (req: NextRequest) => {
  const fontDataRegular = await fontRegular
  const fontDataBold = await fontBold

  try {
    const { searchParams } = new URL(req.url)

    const hasTitle = searchParams.has('title')
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : ''

    const hasDescription = searchParams.has('description')
    const description = hasDescription
      ? searchParams.get('description')?.slice(0, 1000)
      : ''

    const hasImage = searchParams.has('image')
    const image = hasImage && searchParams.get('image')?.slice(0, 1000)

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage:
              'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYmQ1ZTEiIHN0cm9rZS1kYXNoYXJyYXk9IjYgMyIgdHJhbnNmb3JtPSJzY2FsZSgxKSI+PHBhdGggZD0iTTM2IC41SDEuNVYzNiIvPjwvc3ZnPgo=")',
            fontFamily: 'Poppins-Regular',
            backgroundRepeat: 'repeat',
          }}
          tw="bg-white flex flex-col relative w-full h-full"
        >
          <div tw="flex flex-col w-full h-full">
            <div tw="flex relative pt-16 pl-12 flex-col h-full">
              <div tw="flex flex-col">
                <h2
                  tw="flex flex-col text-5xl tracking-tight text-left max-w-3/5"
                  style={{
                    fontFamily: 'Poppins-Bold',
                    lineHeight: 1,
                  }}
                >
                  {title}
                </h2>
                <p
                  tw="max-w-3/5 text-xl pr-4"
                  style={{ fontFamily: 'Montserrat-Regular' }}
                >
                  {description}
                </p>
              </div>
            </div>
            <div tw="absolute flex items-center bottom-12 pl-12">
              <div tw="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://github.com/bonabrian.png?size=48"
                  width="48"
                  height="48"
                  alt="author"
                  tw="rounded-full mr-4"
                />
                <p style={{ fontFamily: 'Poppins-Bold' }} tw="mb-1">
                  Bona Brian Siagian
                </p>
              </div>
            </div>
          </div>
          {hasImage && (
            <div
              tw="absolute top-0 -right-12 w-[420px] h-[630px]"
              style={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1200px 630px',
                backgroundPosition: '-50% 100%',
                transform: 'skewX(-6deg)',
              }}
            />
          )}
          <div tw="absolute bottom-0 left-0 right-0 bg-[#B191FF] h-4" />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Poppins-Regular',
            data: fontDataRegular,
            style: 'normal',
          },
          {
            name: 'Poppins-Bold',
            data: fontDataBold,
            style: 'normal',
          },
        ],
      },
    )
  } catch (err) {
    console.error('OG Image Generator: ', getErrorMessage(err))
    return response({ message: 'Failed to generate image' }, 500)
  }
}
