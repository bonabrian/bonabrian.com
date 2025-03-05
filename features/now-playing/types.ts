type PlayingType = 'track' | 'episode' | 'ad' | 'unknown';
type DeviceType = 'Computer' | 'Smartphone' | 'Speaker';

interface ImageObject {
  url: string;
  width: number;
  height: number;
}

interface AlbumObject {
  name: string;
  album_type: 'album' | 'single' | 'compilation';
  total_tracks: number;
  artists: Array<ArtistObject>;
  images: Array<ImageObject>;
}

interface ArtistObject {
  id: string;
  name: string;
}

interface TrackObject {
  name: string;
  album: AlbumObject;
  artists: Array<ArtistObject>;
  external_urls: {
    spotify: string;
  };
}

export interface CurrentlyPlaying {
  is_playing: boolean;
  item: TrackObject | null;
  currently_playing_type: PlayingType;
}

export interface DeviceObject {
  is_active: boolean;
  name: string;
  type: DeviceType;
}

export interface Device {
  id: string;
  isActive: boolean;
  name: string;
  type: DeviceType;
  model: string;
  icon?: React.ReactNode;
}

export interface NowPlaying {
  isPlaying: boolean;
  currentlyPlayingType?: PlayingType;
  album?: string;
  artist?: string;
  songUrl?: string;
  title?: string;
  albumImageUrl?: string;
}
