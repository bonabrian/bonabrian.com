import fetcher from './fetcher'

interface AccessTokenResponse {
  access_token: string
}

interface ExternalUrls {
  spotify: string
}

interface SongArtist {
  name: string
}

interface SongImage {
  height: number
  width: number
  url: string
}

interface SongAlbum {
  name: string
  artists: Array<SongArtist>
  images: Array<SongImage>
}

interface SongItem {
  name: string
  album: SongAlbum
  external_urls: ExternalUrls
}

interface NowPlayingResponse {
  is_playing: boolean
  item: SongItem
  currently_playing_type: string
}

export interface NowPlaying {
  title: string
  artist: string
  album: string
  url: string
  isPlaying: boolean
  image?: SongImage
}

const nowPlayingDataSelector = (
  nowPlayingData: NowPlayingResponse,
): NowPlaying => {
  const { item, is_playing } = nowPlayingData

  return {
    title: item.name,
    artist: item.album.artists.map(({ name }) => name).join(', '),
    album: item.album.name,
    url: item.external_urls.spotify,
    isPlaying: is_playing,
    image: item.album.images.pop(),
  }
}

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const refreshToken = process.env.SPOTIFY_CLIENT_REFRESH_TOKEN

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing'

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

export const getAccessToken = async () => {
  const response = await fetcher<AccessTokenResponse>(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken || '',
    }),
  })

  return response
}

export const getNowPlaying = async (): Promise<NowPlaying> => {
  const { access_token } = await getAccessToken()

  const response = await fetcher<NowPlayingResponse>(NOW_PLAYING_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  return nowPlayingDataSelector(response)
}
