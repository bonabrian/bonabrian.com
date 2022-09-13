const serialize = (obj: { [key: string | number]: any }) => {
  const str = []
  // eslint-disable-next-line no-restricted-syntax
  for (const p in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    }
  }

  return str.join('&')
}

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const refreshToken = process.env.SPOTIFY_CLIENT_REFRESH_TOKEN

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing'

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

export const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: serialize({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  return response.json()
}

export const getNowPlaying = async () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export interface TrackData {
  title?: string
  artist?: string
  album?: string
  url?: string
  isPlaying?: boolean
  image?: {
    height?: number
    width?: number
    url?: string
  }
}
