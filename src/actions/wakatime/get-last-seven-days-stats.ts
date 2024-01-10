'use server'

import { env } from '@/data/env'
import fetcher from '@/lib/fetcher'
import type { WakaTimeResponse, WakaTimeStat } from '@/types/wakatime'

const STATS_ENDPOINT = 'https://wakatime.com/api/v1/users/current/stats'

const ALLOWED_LANGUAGES = [
  'TypeScript',
  'JavaScript',
  'Kotlin',
  'PHP',
  'Vue.js',
  'React.js',
  'Java',
]

const getLastSevenDaysStats = async (): Promise<WakaTimeStat | undefined> => {
  const response = await fetcher<WakaTimeResponse<WakaTimeStat>>(
    `${STATS_ENDPOINT}/last_7_days`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(
          env.WAKATIME_API_KEY ?? '',
        ).toString('base64')}`,
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

export default getLastSevenDaysStats
