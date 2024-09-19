import type { NextRequest } from 'next/server';

import { countViewsBySlug } from '@/actions/views';
import { response } from '@/lib/server';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';

export const GET = async (
  _req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params;
    const total = await countViewsBySlug(slug);

    return response<APISingleResponse<{ total: number }>>({ data: { total } });
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
