'use server';

import fetcher from '@/lib/fetcher';

import {
  API_SPOTIFY_TOKEN_ENDPOINT,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
} from '../constants';

export const getAccessToken = async (): Promise<{ access_token: string }> => {
  const response = await fetcher<{ access_token: string }>(
    API_SPOTIFY_TOKEN_ENDPOINT,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${SPOTIFY_ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN ?? '',
      }),
    },
  );

  return response;
};
