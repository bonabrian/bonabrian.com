'use server';

import { env } from '@/lib/env';
import fetcher from '@/lib/fetcher';
import type {
  WakaTimeAllTimeSinceToday,
  WakaTimeResponse,
  WakaTimeStats,
} from '@/types/wakatime';

const ALL_TIME_SINCE_TODAY_ENDPOINT =
  'https://wakatime.com/api/v1/users/current/all_time_since_today';
const STATS_ENDPOINT = 'https://wakatime.com/api/v1/users/current/stats';

const ALLOWED_LANGUAGES = [
  'TypeScript',
  'JavaScript',
  'Kotlin',
  'PHP',
  'Vue.js',
  'React.js',
  'Java',
  'Ruby',
];

const generateBasicAuthorizationBase64 = (): string =>
  `Basic ${Buffer.from(env.WAKATIME_API_KEY ?? '').toString('base64')}`;

export const getAllTimeSinceToday =
  async (): Promise<WakaTimeAllTimeSinceToday> => {
    try {
      const response = await fetcher<
        WakaTimeResponse<WakaTimeAllTimeSinceToday>
      >(ALL_TIME_SINCE_TODAY_ENDPOINT, {
        method: 'GET',
        headers: {
          Authorization: generateBasicAuthorizationBase64(),
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const getLastSevenDaysStats = async (): Promise<WakaTimeStats> => {
  try {
    const response = await fetcher<WakaTimeResponse<WakaTimeStats>>(
      `${STATS_ENDPOINT}/last_7_days`,
      {
        method: 'GET',
        headers: {
          Authorization: generateBasicAuthorizationBase64(),
        },
      },
    );

    const data = response.data;

    return {
      ...data,
      languages: data?.languages
        ?.filter((lang) => ALLOWED_LANGUAGES.includes(lang.name))
        ?.map((lang) => lang),
    };
  } catch (error) {
    throw error;
  }
};
