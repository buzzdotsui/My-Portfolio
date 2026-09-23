const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string | undefined;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string | undefined;

type SpotifyImage = { url: string } | null;

type SpotifyTrack = {
  id: string;
  name: string;
  artists?: Array<{ name?: string }>;
  album?: { name?: string; images?: SpotifyImage[] };
  external_urls?: { spotify?: string };
};

type SpotifySearchResponse = {
  tracks?: { items?: SpotifyTrack[] };
};

export type SpotifySong = {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  url: string;
  embedUrl: string;
};

let token: { value: string; expiresAt: number } | null = null;

export function hasSpotifyCredentials(): boolean {
  return Boolean(CLIENT_ID && CLIENT_SECRET);
}

async function getToken(): Promise<string> {
  if (token && token.expiresAt > Date.now() + 5000) return token.value;
  if (!hasSpotifyCredentials()) {
    throw new Error('missing_credentials');
  }

  const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basic}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error(`token_${res.status}`);
  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error('token_missing');

  token = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return token.value;
}

export async function searchSpotify(query: string): Promise<SpotifySong[]> {
  const accessToken = await getToken();
  const url = `https://api.spotify.com/v1/search?type=track&limit=12&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`search_${res.status}`);

  const data = (await res.json()) as SpotifySearchResponse;
  const items = data.tracks?.items ?? [];

  return items.map((track) => {
    const images = track.album?.images ?? [];
    const artwork = images[0]?.url || images[1]?.url || images[2]?.url || '';
    return {
      id: track.id,
      title: track.name,
      artist: track.artists?.map((a) => a.name).filter(Boolean).join(', ') || 'Unknown artist',
      album: track.album?.name || '',
      artwork,
      url: track.external_urls?.spotify || `https://open.spotify.com/track/${track.id}`,
      embedUrl: `https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`,
    };
  });
}
