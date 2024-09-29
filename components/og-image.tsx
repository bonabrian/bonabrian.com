import { BASE_URL, SITE } from '@/constants';

import RenderIf from './shared/render-if';

const OGImage = ({
  title,
  caption,
  date,
}: {
  title: string;
  caption: string | null;
  date: string | null;
}) => {
  const getTitleFontSize = (): string =>
    title.length > 50 ? 'text-5xl' : 'text-6xl';

  return (
    <div
      style={{
        backgroundImage:
          'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYmQ1ZTEiIHN0cm9rZS1kYXNoYXJyYXk9IjYgMyIgdHJhbnNmb3JtPSJzY2FsZSgxKSI+PHBhdGggZD0iTTM2IC41SDEuNVYzNiIvPjwvc3ZnPgo=")',
        backgroundPosition: 'top left',
      }}
      tw="bg-white flex flex-col justify-center h-full w-full relative p-12"
    >
      <h2 tw={getTitleFontSize()} style={{ fontFamily: 'Cal Sans' }}>
        {title}
      </h2>
      <RenderIf isTrue={Boolean(caption)}>
        <p tw="text-xl" style={{ fontFamily: 'Cal Sans' }}>
          {caption}
        </p>
      </RenderIf>
      <div tw="absolute bottom-16 left-12 flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE_URL}/media/site/logo.svg`}
          width="48"
          height="48"
          alt={SITE.author.name}
        />
        <div tw="ml-2 flex items-center">
          <div tw="flex text-xl">{SITE.author.github.username}</div>
          <RenderIf isTrue={Boolean(date)}>
            <div tw="flex items-center" style={{ fontFamily: 'Cal Sans' }}>
              <div tw="ml-2.5 mr-0.5">&middot;</div>
              <div tw="ml-2 mt-1 flex">{date}</div>
            </div>
          </RenderIf>
        </div>
      </div>
      <div tw="absolute bottom-0 left-0 right-0 bg-[#8566ff] h-3" />
    </div>
  );
};

export default OGImage;
