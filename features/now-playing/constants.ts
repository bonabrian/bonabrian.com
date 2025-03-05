import { env } from '@/lib/env';

export const API_SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
export const SPOTIFY_CLIENT_ID = env.SPOTIFY_CLIENT_ID;
export const SPOTIFY_CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
export const SPOTIFY_ACCESS_TOKEN = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
).toString('base64');
export const SPOTIFY_REFRESH_TOKEN = env.SPOTIFY_CLIENT_REFRESH_TOKEN;
export const API_SPOTIFY_TOKEN_ENDPOINT =
  'https://accounts.spotify.com/api/token';
export const NOW_PLAYING_ENDPOINT = `${API_SPOTIFY_BASE_URL}/me/player/currently-playing`;
export const PLAYER_DEVICES_ENDPOINT = `${API_SPOTIFY_BASE_URL}/me/player/devices`;
