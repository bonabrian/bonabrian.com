'use server'

import { env } from '@/data/env'
import fetcher from '@/lib/fetcher'
import type {
  WakaTimeAllTimeSinceToday,
  WakaTimeResponse,
  WakaTimeStat,
} from '@/types/wakatime'

const WAKATIME_API_KEY = env.WAKATIME_API_KEY ?? ''

const STATS_ENDPOINT = 'https://wakatime.com/api/v1/users/current/stats'
const ALL_TIME_SINCE_TODAY_ENDPOINT =
  'https://wakatime.com/api/v1/users/current/all_time_since_today'

const ALLOWED_LANGUAGES = [
  'TypeScript',
  'JavaScript',
  'Kotlin',
  'PHP',
  'Vue.js',
  'React.js',
  'Java',
]

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

  const data = response.data

  return {
    ...data,
    languages: data?.languages
      ?.filter((language) => ALLOWED_LANGUAGES.includes(language.name))
      ?.map((language) => language),
  }
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
