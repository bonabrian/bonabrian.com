import { PAIR_DEVICES } from '@/constants/devices'
import { env } from '@/env'
import type {
  AccessTokenResponse,
  AvailableDevicesResponse,
  ContextResponse,
  Device,
  NowPlaying,
} from '@/types/spotify'

import fetcher from './fetcher'

const BASE_URL = 'https://api.spotify.com/v1'
const CLIENT_ID = env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET
const TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
const REFRESH_TOKEN = env.SPOTIFY_CLIENT_REFRESH_TOKEN
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = `${BASE_URL}/me/player/currently-playing`
const AVAILABLE_DEVICES_ENDPOINT = `${BASE_URL}/me/player/devices`

const nowPlayingDataMapper = (context: ContextResponse): NowPlaying => {
  const { item, is_playing } = context

  return {
    isPlaying: is_playing,
    album: item?.album.name ?? '',
    albumImageUrl:
      item?.album?.images?.find((image) => image?.width === 640)?.url ??
      undefined,
    artist: item?.artists?.map(({ name }) => name).join(', ') ?? '',
    songUrl: item?.external_urls?.spotify ?? '',
    title: item?.name ?? '',
  }
}

export const getAccessToken = async (): Promise<AccessTokenResponse> => {
  const response = await fetcher<AccessTokenResponse>(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN ?? '',
    }),
  })

  return response
}

export const getNowPlaying = async (): Promise<NowPlaying> => {
  const { access_token } = await getAccessToken()

  const response = await fetcher<ContextResponse>(NOW_PLAYING_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  return nowPlayingDataMapper(response)
}

export const getAvailableDevices = async (): Promise<Device[]> => {
  const { access_token } = await getAccessToken()

  const response = await fetcher<AvailableDevicesResponse>(
    AVAILABLE_DEVICES_ENDPOINT,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  )

  const devices = response?.devices?.map((device) => ({
    name: device.name,
    is_active: device.is_active,
    type: device.type,
    model: PAIR_DEVICES[device?.type]?.model ?? 'Unknown Device',
    id: PAIR_DEVICES[device?.type]?.id ?? 'bonabrian-device',
  }))

  return devices
}
