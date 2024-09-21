'use server';

import { PAIR_DEVICES } from '@/constants';
import { env } from '@/lib/env';
import fetcher from '@/lib/fetcher';
import type {
  CurrentlyPlaying,
  Device,
  DeviceObject,
  NowPlaying,
} from '@/types/spotify';

const BASE_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const REFRESH_TOKEN = env.SPOTIFY_CLIENT_REFRESH_TOKEN;
const API_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = `${BASE_URL}/me/player/currently-playing`;
const PLAYER_DEVICES_ENDPOINT = `${BASE_URL}/me/player/devices`;

const getAccessToken = async (): Promise<{ access_token: string }> => {
  const response = await fetcher<{ access_token: string }>(API_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN ?? '',
    }),
  });

  return response;
};

const nowPlayingDataMapper = (data: CurrentlyPlaying): NowPlaying => {
  const { item, is_playing, currently_playing_type } = data;

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

export const getNowPlaying = async (): Promise<NowPlaying> => {
  const { access_token } = await getAccessToken();

  const response = await fetcher<CurrentlyPlaying>(NOW_PLAYING_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return nowPlayingDataMapper(response);
};

export const getDevices = async (): Promise<Array<Device>> => {
  const { access_token } = await getAccessToken();

  const response = await fetcher<{ devices?: Array<DeviceObject> }>(
    PLAYER_DEVICES_ENDPOINT,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const deviceList = response.devices ?? [];

  const devices: Array<Device> = deviceList.map((device) => ({
    name: device.name,
    isActive: device.is_active,
    type: device.type,
    model: PAIR_DEVICES[device.type].model ?? 'Unknown Device',
    id: PAIR_DEVICES[device.type].id ?? 'unknown-device-id',
  }));

  return devices;
};
