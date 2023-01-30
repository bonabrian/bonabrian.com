import { ImageResponse } from '@vercel/og'
import type { PageConfig } from 'next'
import type { NextRequest } from 'next/server'

import { siteMetadata } from '@/data'

export const config: PageConfig = {
  runtime: 'edge',
}

const fontBold = fetch(
  new URL('../../../assets/Montserrat-Bold.ttf', import.meta.url),
).then((res) => res.arrayBuffer())
const fontRegular = fetch(
  new URL('../../../assets/Montserrat-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer())
const fontMedium = fetch(
  new URL('../../../assets/Montserrat-Medium.ttf', import.meta.url),
).then((res) => res.arrayBuffer())

const handler = async (req: NextRequest) => {
  const fontDataBold = await fontBold
  const fontDataRegular = await fontRegular
  const fontDataMedium = await fontMedium

  try {
    const { searchParams } = new URL(req.url)

    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Default Title'

    const isArticleLayout = searchParams.has('article')

    const hasImage = searchParams.has('imageSource')
    const imageSource = hasImage
      ? searchParams.get('imageSource')?.slice(0, 1000)
      : null

    const hasDescription = searchParams.has('description')
    const description = hasDescription
      ? searchParams.get('description')?.slice(0, 1000)
      : 'Default Description'

    const isArticleOg = isArticleLayout && hasImage && hasDescription

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: '#B191FF',
          }}
        >
          {isArticleOg ? (
            <div tw="flex h-full">
              <div tw="flex flex-col w-full p-12">
                {hasImage ? (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      width: '530px',
                      height: '630px',
                      backgroundImage: `url(${imageSource})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1260px 630px',
                      backgroundPosition: '-60% 100%',
                    }}
                  />
                ) : null}
                <div
                  style={{
                    transform: 'skewX(-8deg) rotate(90deg)',
                  }}
                  tw="bg-[#B191FF] absolute top-0 left-[-300px] h-[900px] w-full"
                />
                <div
                  style={{
                    transform: 'skewX(-8deg) rotate(90deg)',
                    backgroundImage:
                      'linear-gradient(to left, #F786AA, #F786AA 20%, #D46191 70%)',
                  }}
                  tw="absolute top-[100px] left-[197px] h-[4px] w-full"
                />
                <div tw="text-white mt-27 flex flex-col">
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
                    tw="mt-8 max-w-3/5 text-xl text-white leading-8 pr-4"
                    style={{ fontFamily: 'Montserrat-Regular' }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div tw="flex h-full">
              <div tw="flex flex-col w-full p-12">
                {hasImage ? (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      width: '530px',
                      height: '630px',
                      backgroundImage: `url(${imageSource})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1260px 630px',
                      backgroundPosition: '-60% 100%',
                    }}
                  />
                ) : null}
                <div tw="text-white mt-27 flex flex-col">
                  <h2
                    tw="flex flex-col text-5xl text-left max-w-3/5"
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      lineHeight: '55px',
                    }}
                  >
                    Crafting code to bring ideas to life
                  </h2>
                </div>
                <div tw="absolute top-[530px] left-[50px] text-white text-xl flex flex justify-between w-full">
                  <div tw="flex flex-col">
                    <div tw="flex items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        tw="rounded-full h-14 w-14 mr-4"
                        src={siteMetadata.avatarUrl}
                        alt="Profile Picture"
                      />
                      <div tw="flex flex-col">
                        <h1
                          tw="m-0 text-2xl"
                          style={{ fontFamily: 'Montserrat-Bold' }}
                        >
                          {siteMetadata.author}
                        </h1>
                        <h2
                          tw="m-0"
                          style={{ fontFamily: 'Montserrat-Regular' }}
                        >
                          bonabrian.com
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Montserrat-Bold',
            data: fontDataBold,
            style: 'normal',
          },
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
  } catch (error) {}
}

export default handler
