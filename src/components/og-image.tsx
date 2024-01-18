import { GITHUB_ACCOUNT } from '@/config/github'
import site from '@/config/site'

interface OGImageProps {
  title: string
  caption?: string | null
  date?: string | null
}

const OGImage = ({ title, caption, date }: OGImageProps) => {
  const getTitleFontSize = () => {
    if (title.length > 50) return 'text-5xl'
    return 'text-6xl'
  }

  return (
    <div
      style={{
        backgroundImage:
          'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYmQ1ZTEiIHN0cm9rZS1kYXNoYXJyYXk9IjYgMyIgdHJhbnNmb3JtPSJzY2FsZSgxKSI+PHBhdGggZD0iTTM2IC41SDEuNVYzNiIvPjwvc3ZnPgo=")',
        backgroundPosition: 'top left',
      }}
      tw="bg-white flex flex-col justify-center h-full w-full relative py-12 px-12"
    >
      <h2 tw={getTitleFontSize()} style={{ fontFamily: 'Cal Sans' }}>
        {title}
      </h2>
      {caption && (
        <p tw="text-xl" style={{ fontFamily: 'Plus Jakarta Sans' }}>
          {caption}
        </p>
      )}
      <div tw="absolute bottom-16 left-12 flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://github.com/bonabrian.png?size=48"
          width="48"
          height="48"
          alt={site.author.name}
          tw="rounded-full"
        />
        <div tw="ml-2 flex items-center">
          <div tw="flex text-xl">@{GITHUB_ACCOUNT.username}</div>
          {date && (
            <div
              tw="flex items-center"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              <div tw="ml-2.5 mr-0.5">&middot;</div>
              <div tw="ml-2 mt-1 flex">{date}</div>
            </div>
          )}
        </div>
      </div>
      <div tw="absolute bottom-0 left-0 right-0 bg-[#ff337c] h-3" />
    </div>
  )
}

export default OGImage
