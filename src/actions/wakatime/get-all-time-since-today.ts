'use server'

import { env } from '@/data/env'
import fetcher from '@/lib/fetcher'
import type {
  WakaTimeAllTimeSinceToday,
  WakaTimeResponse,
} from '@/types/wakatime'

const ALL_TIME_SINCE_TODAY_ENDPOINT =
  'https://wakatime.com/api/v1/users/current/all_time_since_today'

const getAllTimeSinceToday = async (): Promise<
  WakaTimeAllTimeSinceToday | undefined
> => {
  const response = await fetcher<WakaTimeResponse<WakaTimeAllTimeSinceToday>>(
    ALL_TIME_SINCE_TODAY_ENDPOINT,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(
          env.WAKATIME_API_KEY ?? '',
        ).toString('base64')}`,
      },
    },
  )

  return response.data
}

export default getAllTimeSinceToday
