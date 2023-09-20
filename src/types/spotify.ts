export interface AccessTokenResponse {
  access_token: string
}

interface SongImage {
  width: number
  height: number
  url: string
}

interface SongArtist {
  name: string
}

interface SongAlbum {
  name: string
  images: SongImage[]
  artists: SongArtist[]
}

interface ExternalUrls {
  spotify: string
}

interface SongItem {
  name: string
  album: SongAlbum
  artists: SongArtist[]
  external_urls: ExternalUrls
}

export interface ContextResponse {
  is_playing: boolean
  item: SongItem
  currently_playing_type: string
}

export interface NowPlaying {
  isPlaying: boolean
  album: string
  albumImageUrl?: string
  artist: string
  songUrl: string
  title: string
}

export interface Device {
  is_active: boolean
  name: string
  type: string
  icon?: React.ReactNode
  id?: string
  model?: string
}

export interface AvailableDevicesResponse {
  devices: Device[]
}

export type DeviceInfo = Pick<Device, 'icon' | 'id' | 'model'>
