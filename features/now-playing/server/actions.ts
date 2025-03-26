'use server';

import fetcher from '@/lib/fetcher';

import {
  API_SPOTIFY_TOKEN_ENDPOINT,
  NOW_PLAYING_ENDPOINT,
  PLAYER_DEVICES_ENDPOINT,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
} from '../constants';
import { pairDevices } from '../pair-devices';
import type {
  CurrentlyPlaying,
  Device,
  DeviceObject,
  NowPlaying,
} from '../types';

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

  const deviceList = response?.devices ?? [];

  const devices: Array<Device> = deviceList.map((device) => ({
    name: device.name,
    isActive: device.is_active,
    type: device.type,
    model: pairDevices[device.type]?.model ?? 'Unknown device',
    id: pairDevices[device.type].id ?? 'unknown-device-id',
  }));

  return devices;
};

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
