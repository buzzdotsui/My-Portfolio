import { useCallback, useEffect, useRef, useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { Terminal } from './Terminal';

const QUEUE_KEY = 'lofi-song-queue-v1';

const SPOTIFY_PLAYLIST_SRC =
  'https://open.spotify.com/embed/playlist/6SmTtBvUybmRcBLGqqFuaw?utm_source=generator&theme=0';

const STATIONS = [
  { id: 'rain', title: 'Rain on Glass', artist: 'Field Recording', kind: 'rain' as const },
  { id: 'tape', title: 'Tape Hiss', artist: 'Analog Texture', kind: 'tape' as const },
  { id: 'drone', title: 'Night Study', artist: 'Soft Drone', kind: 'drone' as const },
  { id: 'cafe', title: 'Corner Booth', artist: 'Warm Room', kind: 'cafe' as const },
];

type StationKind = (typeof STATIONS)[number]['kind'];

type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  preview: string;
};

type QueueItem =
  | { type: 'station'; id: string; title: string; artist: string }
  | { type: 'song'; id: string; title: string; artist: string; preview: string; artwork: string };

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function makeNoise(ctx: AudioContext, seconds = 2): AudioBuffer {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

async function searchDeezer(query: string): Promise<Song[]> {
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=12`;
  const candidates = [url, `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`];

  let lastErr: unknown;
  for (const candidate of candidates) {
    try {
      const res = await fetch(candidate);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as {
        data?: Array<{
          id: number;
          title: string;
          preview: string;
          artist?: { name?: string };
          album?: { title?: string; cover_medium?: string };
        }>;
      };
      if (!Array.isArray(data.data)) continue;
      return data.data
        .filter((t) => Boolean(t.preview))
        .map((t) => ({
          id: String(t.id),
          title: t.title,
          artist: t.artist?.name || 'Unknown artist',
          album: t.album?.title || '',
          artwork: t.album?.cover_medium || '',
          preview: t.preview,
        }));
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('Search failed');
}

export function FocusRoom() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Song[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [volume, setVolume] = useState(0.7);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const stationRef = useRef<{
    ctx: AudioContext | null;
    master: GainNode | null;
    nodes: AudioNode[];
  }>({ ctx: null, master: null, nodes: [] });

  const songAudioRef = useRef<HTMLAudioElement | null>(null);

  const defaultQueue: QueueItem[] = STATIONS.map((s) => ({
    type: 'station',
    id: s.id,
    title: s.title,
    artist: s.artist,
  }));

  useEffect(() => {
    const saved = loadJson<QueueItem[]>(QUEUE_KEY, []);
    const songsOnly = saved.filter((q) => q.type === 'song');
    setQueue(songsOnly.length > 0 ? [...songsOnly, ...defaultQueue] : defaultQueue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.filter((q) => q.type === 'song')));
  }, [queue]);

  const stopStations = useCallback(() => {
    const a = stationRef.current;
    a.nodes.forEach((n) => {
      try {
        const anyN = n as unknown as { stop?: (t?: number) => void; disconnect: () => void };
        anyN.stop?.();
        anyN.disconnect();
      } catch {
        /* already gone */
      }
    });
    a.nodes = [];
  }, []);

  const stopSong = useCallback(() => {
    const el = songAudioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  }, []);

  const startStation = useCallback(
    (kind: StationKind) => {
      const a = stationRef.current;
      if (!a.ctx) {
        const Ctor =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        a.ctx = new Ctor();
        a.master = a.ctx.createGain();
        a.master.connect(a.ctx.destination);
      }
      const ctx = a.ctx;
      if (ctx.state === 'suspended') void ctx.resume();
      if (a.master) a.master.gain.value = volume;

      stopStations();
      const master = a.master!;
      const noise = makeNoise(ctx, 3);

      if (kind === 'rain' || kind === 'tape' || kind === 'cafe') {
        const src = ctx.createBufferSource();
        src.buffer = noise;
        src.loop = true;
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        if (kind === 'rain') {
          filter.type = 'bandpass';
          filter.frequency.value = 1800;
          filter.Q.value = 0.6;
          gain.gain.value = 0.35;
        } else if (kind === 'tape') {
          filter.type = 'highpass';
          filter.frequency.value = 2400;
          gain.gain.value = 0.12;
        } else {
          filter.type = 'lowpass';
          filter.frequency.value = 700;
          gain.gain.value = 0.4;
        }
        src.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        src.start();
        a.nodes.push(src, filter, gain);

        if (kind === 'cafe') {
          const osc = ctx.createOscillator();
          const og = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = 90;
          og.gain.value = 0.03;
          osc.connect(og);
          og.connect(master);
          osc.start();
          a.nodes.push(osc, og);
        }
      } else {
        [110, 164.81, 220, 277.18].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.value = f;
          filter.type = 'lowpass';
          filter.frequency.value = 900;
          g.gain.value = 0.045;
          osc.connect(filter);
          filter.connect(g);
          g.connect(master);
          osc.start();
          a.nodes.push(osc, g, filter);
        });
        const src = ctx.createBufferSource();
        src.buffer = noise;
        src.loop = true;
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 400;
        const ng = ctx.createGain();
        ng.gain.value = 0.06;
        src.connect(lp);
        lp.connect(ng);
        ng.connect(master);
        src.start();
        a.nodes.push(src, lp, ng);
      }
    },
    [stopStations, volume],
  );

  const playItem = useCallback(
    (item: QueueItem) => {
      stopSong();
      stopStations();
      setActiveId(item.id);
      setPlaying(true);

      if (item.type === 'station') {
        const station = STATIONS.find((s) => s.id === item.id);
        if (station) startStation(station.kind);
        return;
      }

      if (!songAudioRef.current) {
        songAudioRef.current = new Audio();
        songAudioRef.current.addEventListener('ended', () => setPlaying(false));
      }
      const el = songAudioRef.current;
      el.src = item.preview;
      el.volume = volume;
      void el.play().catch(() => setPlaying(false));
    },
    [startStation, stopSong, stopStations, volume],
  );

  const togglePlay = useCallback(() => {
    if (playing) {
      stopSong();
      stopStations();
      setPlaying(false);
      return;
    }
    const current = queue.find((q) => q.id === activeId) || queue[0];
    if (current) playItem(current);
  }, [activeId, playItem, playing, queue, stopSong, stopStations]);

  const stepQueue = useCallback(
    (dir: 1 | -1) => {
      if (queue.length === 0) return;
      const idx = queue.findIndex((q) => q.id === activeId);
      const next = queue[(idx + dir + queue.length) % queue.length];
      playItem(next);
    },
    [activeId, playItem, queue],
  );

  useEffect(() => {
    if (stationRef.current.master && stationRef.current.ctx) {
      stationRef.current.master.gain.setTargetAtTime(
        volume,
        stationRef.current.ctx.currentTime,
        0.05,
      );
    }
    if (songAudioRef.current) songAudioRef.current.volume = volume;
  }, [volume]);

  useEffect(
    () => () => {
      stopStations();
      stopSong();
    },
    [stopSong, stopStations],
  );

  const runSearch = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearching(true);
    setSearchError('');
    try {
      const songs = await searchDeezer(q);
      setResults(songs);
      if (songs.length === 0) setSearchError('No matches. Try another title or artist.');
    } catch {
      setResults([]);
      setSearchError('Search is unavailable right now. Check your connection and try again.');
    } finally {
      setSearching(false);
    }
  }, [query]);

  const enqueueSong = useCallback((song: Song) => {
    const item: QueueItem = {
      type: 'song',
      id: `song-${song.id}`,
      title: song.title,
      artist: song.artist,
      preview: song.preview,
      artwork: song.artwork,
    };
    setQueue((q) => {
      if (q.some((x) => x.id === item.id)) return q;
      const stations = q.filter((x) => x.type === 'station');
      const songs = q.filter((x) => x.type === 'song');
      return [...songs, item, ...stations];
    });
  }, []);

  const playResult = useCallback(
    (song: Song) => {
      enqueueSong(song);
      playItem({
        type: 'song',
        id: `song-${song.id}`,
        title: song.title,
        artist: song.artist,
        preview: song.preview,
        artwork: song.artwork,
      });
    },
    [enqueueSong, playItem],
  );

  const removeQueueItem = useCallback(
    (id: string) => {
      setQueue((q) => q.filter((x) => x.id !== id));
      if (activeId === id) {
        stopSong();
        stopStations();
        setPlaying(false);
        setActiveId(null);
      }
    },
    [activeId, stopSong, stopStations],
  );

  const current = queue.find((q) => q.id === activeId);

  return (
    <section id="focus" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="04" label="Lo-Fi Radio" />
          <h2 className="display display-md mt-5">Listen & focus.</h2>
          <p className="lede mt-4">
            Ambient stations, searchable tracks, your Spotify favorites, and a terminal you can
            type into. Built into the portfolio.
          </p>
        </div>

        <div data-reveal className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Now playing + queue */}
          <div className="lofi-panel lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="mono-label text-accent">01 / Radio</p>
              <p className="mono-label">{playing ? 'On air' : 'Standby'}</p>
            </div>

            <p className="mt-5 font-mono text-sm uppercase tracking-[0.14em] text-paper">
              {current?.title || 'Nothing selected'}
            </p>
            <p className="mt-1 text-sm text-mute">{current?.artist || 'Pick a station or song'}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="lofi-btn"
                onClick={() => stepQueue(-1)}
                aria-label="Previous"
              >
                ‹‹
              </button>
              <button
                type="button"
                className="lofi-btn lofi-btn--primary"
                onClick={togglePlay}
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? 'Pause' : 'Play'}
              </button>
              <button
                type="button"
                className="lofi-btn"
                onClick={() => stepQueue(1)}
                aria-label="Next"
              >
                ››
              </button>
              <label className="ml-auto flex w-full max-w-[10rem] min-w-[8rem] items-center gap-2">
                <span className="sr-only">Volume</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="lofi-range"
                  aria-label="Volume"
                />
              </label>
            </div>

            <p className="mono-label mt-6 border-t border-line pt-4">Queue</p>
            <ul className="mt-2" aria-label="Playback queue">
              {queue.map((item, i) => (
                <li key={item.id}>
                  <div
                    className={`lofi-queue-row${item.id === activeId ? ' is-active' : ''}`}
                  >
                    <button
                      type="button"
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                      onClick={() => playItem(item)}
                    >
                      <span className="mono-label w-8 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] text-paper">
                          {item.title}
                        </span>
                        <span className="block truncate text-[13px] text-mute">
                          {item.artist}
                        </span>
                      </span>
                      {item.type === 'song' && (
                        <span className="mono-label shrink-0 text-accent/80">Song</span>
                      )}
                    </button>
                    {item.type === 'song' && (
                      <button
                        type="button"
                        className="mono-label shrink-0 px-2 text-dim transition-colors hover:text-paper"
                        onClick={() => removeQueueItem(item.id)}
                        aria-label={`Remove ${item.title} from queue`}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mono-label mt-4">
              Ambient synthesized · songs via Deezer open API (30s previews)
            </p>
          </div>

          {/* Song search */}
          <div className="lofi-panel lg:col-span-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="mono-label text-accent">02 / Songs</p>
              <p className="mono-label">Search catalog</p>
            </div>

            <form onSubmit={runSearch} className="mt-5" role="search">
              <label htmlFor="song-search" className="sr-only">
                Search songs
              </label>
              <div className="flex gap-2">
                <input
                  id="song-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Artist, title, album…"
                  className="lofi-input"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="lofi-btn lofi-btn--primary shrink-0"
                  disabled={searching || !query.trim()}
                >
                  {searching ? '…' : 'Search'}
                </button>
              </div>
            </form>

            {searchError && (
              <p className="mt-3 text-sm text-accent" role="status">
                {searchError}
              </p>
            )}

            <ul className="mt-4 max-h-[16rem] overflow-y-auto" aria-label="Search results">
              {results.map((song) => (
                <li key={song.id} className="border-b border-line">
                  <div className="flex items-center gap-3 py-3">
                    {song.artwork ? (
                      <img
                        src={song.artwork}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        className="h-10 w-10 shrink-0 border border-line object-cover"
                      />
                    ) : (
                      <span
                        className="h-10 w-10 shrink-0 border border-line bg-raised"
                        aria-hidden="true"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] text-paper">{song.title}</p>
                      <p className="truncate text-[13px] text-mute">
                        {song.artist}
                        {song.album ? ` · ${song.album}` : ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="lofi-btn h-9 shrink-0 px-3"
                      onClick={() => playResult(song)}
                    >
                      Play
                    </button>
                    <button
                      type="button"
                      className="lofi-btn h-9 shrink-0 px-3"
                      onClick={() => enqueueSong(song)}
                      aria-label={`Queue ${song.title}`}
                    >
                      +Q
                    </button>
                  </div>
                </li>
              ))}
              {!results.length && !searching && (
                <li className="py-6 text-sm text-mute">
                  Search millions of tracks. Play uses official 30&nbsp;second previews; queue
                  keeps them ready for the next listen.
                </li>
              )}
            </ul>
          </div>

          <Terminal />
        </div>

        <div data-reveal className="mt-6 border border-line bg-surface p-4 sm:p-5">
          <div className="flex items-baseline justify-between gap-4">
            <p className="mono-label text-accent">Favorites</p>
            <a
              href="https://open.spotify.com/playlist/6SmTtBvUybmRcBLGqqFuaw"
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label text-dim transition-colors hover:text-paper"
            >
              Open in Spotify
            </a>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-line">
            <iframe
              data-testid="embed-iframe"
              title="Spotify playlist embed"
              src={SPOTIFY_PLAYLIST_SRC}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
