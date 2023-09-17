import type {
  WakaTimeAllTimeSinceToday,
  WakaTimeResponse,
  WakaTimeStat,
} from '@/types/wakatime'

import fetcher from './fetcher'

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY ?? ''

const STATS_ENDPOINT = 'https://wakatime.com/api/v1/users/current/stats'
const ALL_TIME_SINCE_TODAY_ENDPOINT =
  'https://wakatime.com/api/v1/users/current/all_time_since_today'

export const getLastSevenDaysStats = async (): Promise<
  WakaTimeStat | undefined
> => {
  const response = await fetcher<WakaTimeResponse<WakaTimeStat>>(
    `${STATS_ENDPOINT}/last_7_days`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString(
          'base64',
        )}`,
      },
    },
  )

  return response.data
}

export const getAllTimeSinceToday = async (): Promise<
  WakaTimeAllTimeSinceToday | undefined
> => {
  const response = await fetcher<WakaTimeResponse<WakaTimeAllTimeSinceToday>>(
    ALL_TIME_SINCE_TODAY_ENDPOINT,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString(
          'base64',
        )}`,
      },
    },
  )

  return response.data
}
