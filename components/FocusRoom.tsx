import { useCallback, useEffect, useRef, useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { Terminal } from './Terminal';

const SPOTIFY_PLAYLIST_SRC =
  'https://open.spotify.com/embed/playlist/6SmTtBvUybmRcBLGqqFuaw?utm_source=generator&theme=0';

const STATIONS = [
  { id: 'rain', title: 'Rain on Glass', artist: 'Field Recording', kind: 'rain' as const },
  { id: 'tape', title: 'Tape Hiss', artist: 'Analog Texture', kind: 'tape' as const },
  { id: 'drone', title: 'Night Study', artist: 'Soft Drone', kind: 'drone' as const },
  { id: 'cafe', title: 'Corner Booth', artist: 'Warm Room', kind: 'cafe' as const },
];

type StationKind = (typeof STATIONS)[number]['kind'];

type QueueItem = { id: string; title: string; artist: string };

function makeNoise(ctx: AudioContext, seconds = 2): AudioBuffer {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

export function FocusRoom() {
  const [volume, setVolume] = useState(0.7);
  const [queue] = useState<QueueItem[]>(() =>
    STATIONS.map((s) => ({ id: s.id, title: s.title, artist: s.artist })),
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [favoritesKey, setFavoritesKey] = useState(0);

  const stationRef = useRef<{
    ctx: AudioContext | null;
    master: GainNode | null;
    nodes: AudioNode[];
  }>({ ctx: null, master: null, nodes: [] });

  const stopFavorites = useCallback(() => {
    setFavoritesKey((k) => k + 1);
  }, []);

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

  const pauseRadio = useCallback(() => {
    stopStations();
    setPlaying(false);
  }, [stopStations]);

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
      stopFavorites();
      stopStations();
      setActiveId(item.id);
      setPlaying(true);
      const station = STATIONS.find((s) => s.id === item.id);
      if (station) startStation(station.kind);
    },
    [startStation, stopFavorites, stopStations],
  );

  const togglePlay = useCallback(() => {
    if (playing) {
      stopStations();
      setPlaying(false);
      return;
    }
    const current = queue.find((q) => q.id === activeId) || queue[0];
    if (current) playItem(current);
  }, [activeId, playItem, playing, queue, stopStations]);

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
  }, [volume]);

  useEffect(() => () => stopStations(), [stopStations]);

  const current = queue.find((q) => q.id === activeId);

  return (
    <section id="focus" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="05" label="Lo-Fi Radio" />
          <h2 className="display display-md mt-5">Listen & focus.</h2>
          <p className="lede mt-4">
            Ambient stations, your favorite playlist, and a terminal you can type into. Built into
            the portfolio.
          </p>
        </div>

        <div data-reveal className="focus-grid mt-12 grid gap-5 lg:grid-cols-2">
          {/* 01 Radio */}
          <div className="lofi-panel lofi-panel--premium h-full">
            <div className="lofi-panel__head">
              <p className="mono-label text-accent">01 / Radio</p>
              <span className={`lofi-status${playing ? ' is-live' : ''}`}>
                {playing ? 'On air' : 'Standby'}
              </span>
            </div>

            <div className="lofi-nowplaying">
              <p className="lofi-nowplaying__title">{current?.title || 'Nothing selected'}</p>
              <p className="lofi-nowplaying__meta">
                {current?.artist || 'Pick a station below'}
              </p>
            </div>

            <div className="lofi-controls">
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
              <label className="lofi-volume">
                <span className="sr-only">Volume (ambient stations)</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="lofi-range"
                  aria-label="Volume (ambient stations)"
                />
              </label>
            </div>

            <div className="lofi-panel__section">
              <p className="mono-label">Queue</p>
            </div>
            <ul className="lofi-queue" aria-label="Playback queue">
              {queue.map((item, i) => (
                <li key={item.id}>
                  <div className={`lofi-queue-row${item.id === activeId ? ' is-active' : ''}`}>
                    <button
                      type="button"
                      className="lofi-queue-row__main"
                      onClick={() => playItem(item)}
                    >
                      <span className="mono-label w-7 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] leading-snug text-paper">
                          {item.title}
                        </span>
                        <span className="block truncate text-[12px] text-mute">
                          {item.artist}
                        </span>
                      </span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="lofi-footnote">Ambient stations synthesized in the browser</p>
          </div>

          <Terminal />
        </div>

        {/* Favorites */}
        <div data-reveal className="lofi-favorites">
          <div className="lofi-panel__head">
            <p className="mono-label text-accent">Favorites</p>
            <div className="flex items-center gap-4">
              <span className={`lofi-status${playing ? '' : ' is-live'}`}>
                {playing ? 'Radio on' : 'Standby'}
              </span>
              <a
                href="https://open.spotify.com/playlist/6SmTtBvUybmRcBLGqqFuaw"
                target="_blank"
                rel="noopener noreferrer"
                className="lofi-status hover:text-paper"
              >
                Open in Spotify
              </a>
            </div>
          </div>
          <p className="lofi-footnote !pt-0">
            Playing Favorites stops Radio. Playing Radio restarts Favorites paused.
          </p>
          <div className="lofi-favorites__frame">
            <iframe
              key={favoritesKey}
              data-testid="embed-iframe"
              title="Spotify playlist embed"
              src={SPOTIFY_PLAYLIST_SRC}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block w-full"
              onPointerDown={pauseRadio}
              onFocus={pauseRadio}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
