import type { SatoriOptions } from 'next/dist/compiled/@vercel/og/satori';
import { ImageResponse } from 'next/og';
import { type NextRequest, NextResponse } from 'next/server';

import OGImage from '@/components/og-image';
import type { APIErrorResponse } from '@/types/server';

export const runtime = 'edge';

const getFont = async (): Promise<SatoriOptions['fonts'] | undefined> => {
  try {
    const fontCalSansUrl = new URL(
      '../../../assets/fonts/CalSans-SemiBold.ttf',
      import.meta.url,
    );

    const fontCalSans = await fetch(fontCalSansUrl)
      .then((res) => res.arrayBuffer())
      .catch(null);

    if (!fontCalSans) return undefined;

    return [
      {
        name: 'Cal Sans',
        data: fontCalSans,
        style: 'normal',
      },
    ];
  } catch {
    return undefined;
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  const caption = searchParams.get('caption');
  const date = searchParams.get('date');

  if (!title) {
    return NextResponse.json<APIErrorResponse>(
      { message: 'Missing title' },
      { status: 422 },
    );
  }

  return new ImageResponse(
    <OGImage title={title} caption={caption} date={date} />,
    {
      width: 1200,
      height: 630,
      emoji: 'fluent',
      fonts: await getFont(),
    },
  );
};
