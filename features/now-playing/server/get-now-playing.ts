'use server';

import fetcher from '@/lib/fetcher';

import { NOW_PLAYING_ENDPOINT } from '../constants';
import type { CurrentlyPlaying, NowPlaying } from '../types';
import { getAccessToken } from './get-access-token';

export const getNowPlaying = async (): Promise<NowPlaying> => {
  const { access_token } = await getAccessToken();

  const response = await fetcher<CurrentlyPlaying>(NOW_PLAYING_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const { item, is_playing, currently_playing_type } = response;

  return {
    isPlaying: is_playing,
    album: item?.album?.name,
    albumImageUrl: item?.album?.images?.find((image) => image?.width === 640)
      ?.url,
    artist: item?.artists?.map(({ name }) => name).join(', '),
    songUrl: item?.external_urls?.spotify,
    title: item?.name,
    currentlyPlayingType: currently_playing_type,
  };
};
