import { getDevices } from '@/actions/spotify';
import { response } from '@/lib/server';
import type { APIErrorResponse, APIListResponse } from '@/types/server';
import type { Device } from '@/types/spotify';

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const devices = await getDevices();

    return response<APIListResponse<Device>>({ data: devices });
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
