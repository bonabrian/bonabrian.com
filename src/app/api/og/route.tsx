import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'

import { getErrorMessage, response } from '@/lib/api'

export const runtime = 'edge'

const fontRegular = fetch(
  new URL('../../../../assets/fonts/Montserrat-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer())
const fontMedium = fetch(
  new URL('../../../../assets/fonts/Montserrat-Medium.ttf', import.meta.url),
).then((res) => res.arrayBuffer())

export const GET = async (req: NextRequest) => {
  const fontDataRegular = await fontRegular
  const fontDataMedium = await fontMedium

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
        <div tw="w-full h-full flex flex-col items-center justify-center relative bg-[#B191FF]">
          <div tw="flex h-full">
            <div tw="flex flex-col w-full pl-12">
              {hasImage ? (
                <div tw="relative flex w-full">
                  <div
                    tw="absolute top-0 right-0 w-[530px] h-[630px]"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1200px 630px',
                      backgroundPosition: '-50% 100%',
                    }}
                  />
                  <div
                    style={{
                      transform: 'skewX(-8deg) rotate(90deg)',
                    }}
                    tw="bg-[#B191FF] absolute top-0 left-[-350px] h-[900px] w-full"
                  />
                  <div
                    style={{
                      transform: 'skewX(-8deg) rotate(90deg)',
                      backgroundImage:
                        'linear-gradient(to left, #F786AA, #F786AA 20%, #D46191 70%)',
                    }}
                    tw="absolute top-[100px] left-[150px] h-[4px] w-full"
                  />
                </div>
              ) : (
                <div tw="relative flex w-full">
                  <div
                    tw="absolute top-0 right-0 w-[530px] h-[630px]"
                    style={{
                      backgroundImage: `url(https://res.cloudinary.com/bonabrian/image/upload/v1675009995/avatar_davtqo.png)`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '560px 630px',
                      backgroundPosition: '0 100%',
                    }}
                  />
                  <div
                    style={{
                      transform: 'skewX(-8deg) rotate(90deg)',
                    }}
                    tw="bg-[#B191FF] absolute top-0 left-[-350px] h-[900px] w-full"
                  />
                  <div
                    style={{
                      transform: 'skewX(-8deg) rotate(90deg)',
                      backgroundImage:
                        'linear-gradient(to left, #F786AA, #F786AA 20%, #D46191 70%)',
                    }}
                    tw="absolute top-[100px] left-[150px] h-[4px] w-full"
                  />
                </div>
              )}
              <div tw="text-white mt-27 flex flex-col justify-between">
                <div tw="flex flex-col">
                  <h2
                    tw="flex flex-col text-5xl tracking-tight text-left max-w-3/5"
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      lineHeight: '55px',
                    }}
                  >
                    {title}
                  </h2>
                  <p
                    tw="mt-4 max-w-3/5 text-xl text-white leading-8 pr-4"
                    style={{ fontFamily: 'Montserrat-Regular' }}
                  >
                    {description}
                  </p>
                  <div tw="flex flex-col mt-16">
                    <h1
                      tw="m-0 text-2xl mb-0"
                      style={{ fontFamily: 'Montserrat-Bold' }}
                    >
                      Bona Brian Siagian
                    </h1>
                    <h2 tw="mt-0" style={{ fontFamily: 'Montserrat-Regular' }}>
                      bonabrian.com
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Montserrat-Regular',
            data: fontDataRegular,
            style: 'normal',
          },
          {
            name: 'Montserrat-Medium',
            data: fontDataMedium,
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
