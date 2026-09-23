import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SectionLabel } from './SectionLabel';

const FOCUS_SEC = 25 * 60;
const BREAK_SEC = 5 * 60;
const STORAGE_KEY = 'lofi-wall-notes-v1';

const TRACKS = [
  { id: 'rain', title: 'Rain on Glass', artist: 'Field Recording', kind: 'rain' as const },
  { id: 'tape', title: 'Tape Hiss', artist: 'Analog Texture', kind: 'tape' as const },
  { id: 'drone', title: 'Night Study', artist: 'Soft Drone', kind: 'drone' as const },
  { id: 'cafe', title: 'Corner Booth', artist: 'Warm Room', kind: 'cafe' as const },
];

type TrackKind = (typeof TRACKS)[number]['kind'];

type Note = { id: string; text: string; created: number };

function formatTime(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Note[];
    return Array.isArray(parsed) ? parsed.slice(0, 24) : [];
  } catch {
    return [];
  }
}

function makeNoise(ctx: AudioContext, seconds = 2): AudioBuffer {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

export function FocusRoom() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_SEC);
  const [timerRunning, setTimerRunning] = useState(false);
  const [syncRadio, setSyncRadio] = useState(true);
  const [cycles, setCycles] = useState(0);
  const [noteDraft, setNoteDraft] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  const audioRef = useRef<{
    ctx: AudioContext | null;
    master: GainNode | null;
    nodes: AudioNode[];
    kind: TrackKind | null;
  }>({ ctx: null, master: null, nodes: [], kind: null });

  const track = TRACKS[trackIndex];

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      /* ignore quota */
    }
  }, [notes]);

  const stopSynth = useCallback(() => {
    const a = audioRef.current;
    a.nodes.forEach((n) => {
      try {
        const anyN = n as unknown as { stop?: (t?: number) => void; disconnect: () => void };
        anyN.stop?.();
        anyN.disconnect();
      } catch {
        /* already stopped */
      }
    });
    a.nodes = [];
    a.kind = null;
  }, []);

  const startSynth = useCallback((kind: TrackKind) => {
    const a = audioRef.current;
    if (!a.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      a.ctx = new Ctor();
      a.master = a.ctx.createGain();
      a.master.gain.value = volume;
      a.master.connect(a.ctx.destination);
    }
    const ctx = a.ctx;
    if (ctx.state === 'suspended') void ctx.resume();
    if (a.master) a.master.gain.value = volume;

    stopSynth();
    a.kind = kind;

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
      const freqs = [110, 164.81, 220, 277.18];
      freqs.forEach((f, i) => {
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
  }, [stopSynth, volume]);

  const playTrack = useCallback(
    (index: number) => {
      setTrackIndex(index);
      startSynth(TRACKS[index].kind);
      setPlaying(true);
    },
    [startSynth],
  );

  const togglePlay = useCallback(() => {
    if (playing) {
      stopSynth();
      setPlaying(false);
    } else {
      startSynth(track.kind);
      setPlaying(true);
    }
  }, [playing, startSynth, stopSynth, track.kind]);

  const nextTrack = useCallback(() => {
    const next = (trackIndex + 1) % TRACKS.length;
    playTrack(next);
  }, [playTrack, trackIndex]);

  const prevTrack = useCallback(() => {
    const prev = (trackIndex - 1 + TRACKS.length) % TRACKS.length;
    playTrack(prev);
  }, [playTrack, trackIndex]);

  useEffect(() => {
    const a = audioRef.current;
    if (a.master && a.ctx) {
      a.master.gain.setTargetAtTime(volume, a.ctx.currentTime, 0.05);
    }
  }, [volume]);

  useEffect(() => () => stopSynth(), [stopSynth]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;
        if (mode === 'focus') {
          setMode('break');
          setCycles((c) => c + 1);
          return BREAK_SEC;
        }
        setMode('focus');
        return FOCUS_SEC;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, mode]);

  const startTimer = useCallback(() => {
    setTimerRunning(true);
    if (syncRadio && !playing) {
      startSynth(track.kind);
      setPlaying(true);
    }
  }, [syncRadio, playing, startSynth, track.kind]);

  const pauseTimer = useCallback(() => setTimerRunning(false), []);

  const resetTimer = useCallback(() => {
    setTimerRunning(false);
    setMode('focus');
    setSecondsLeft(FOCUS_SEC);
  }, []);

  const addNote = useCallback(() => {
    const text = noteDraft.trim();
    if (!text) return;
    const note: Note = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text: text.slice(0, 280),
      created: Date.now(),
    };
    setNotes((n) => [note, ...n].slice(0, 24));
    setNoteDraft('');
  }, [noteDraft]);

  const removeNote = useCallback((id: string) => {
    setNotes((n) => n.filter((x) => x.id !== id));
  }, []);

  const total = mode === 'focus' ? FOCUS_SEC : BREAK_SEC;
  const progress = 1 - secondsLeft / total;

  const timeDisplay = useMemo(() => formatTime(secondsLeft), [secondsLeft]);

  return (
    <section id="focus" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="04" label="Lo-Fi Radio" />
          <h2 className="display display-md mt-5">Focus room.</h2>
          <p className="lede mt-4">
            A full-stack style workspace: queue royalty-free ambient audio, run a synced Pomodoro,
            and leave sticky notes on a shared wall. Built into the portfolio, no install.
          </p>
        </div>

        <div data-reveal className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Radio */}
          <div className="lofi-panel lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="mono-label text-accent">01 / Radio</p>
              <p className="mono-label">{playing ? 'On air' : 'Standby'}</p>
            </div>

            <p className="mt-5 font-mono text-sm uppercase tracking-[0.14em] text-paper">
              {track.title}
            </p>
            <p className="mt-1 text-sm text-mute">{track.artist}</p>

            <div className="mt-5 flex items-center gap-3">
              <button type="button" className="lofi-btn" onClick={prevTrack} aria-label="Previous track">
                ‹‹
              </button>
              <button
                type="button"
                className="lofi-btn lofi-btn--primary"
                onClick={togglePlay}
                aria-label={playing ? 'Pause radio' : 'Play radio'}
              >
                {playing ? 'Pause' : 'Play'}
              </button>
              <button type="button" className="lofi-btn" onClick={nextTrack} aria-label="Next track">
                ››
              </button>
              <label className="ml-auto flex min-w-0 flex-1 max-w-[10rem] items-center gap-2">
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

            <ul className="mt-6 border-t border-line" aria-label="Audio queue">
              {TRACKS.map((t, i) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className={`lofi-queue-row${i === trackIndex ? ' is-active' : ''}`}
                    onClick={() => playTrack(i)}
                    aria-current={i === trackIndex ? 'true' : undefined}
                  >
                    <span className="mono-label w-8 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-left text-[15px] text-paper">
                      {t.title}
                    </span>
                    <span className="mono-label shrink-0">{t.artist}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mono-label mt-4">Synthesized ambient · royalty-free</p>
          </div>

          {/* Pomodoro */}
          <div className="lofi-panel lg:col-span-3">
            <div className="flex items-baseline justify-between gap-4">
              <p className="mono-label text-accent">02 / Timer</p>
              <p className="mono-label">{mode === 'focus' ? 'Focus' : 'Break'}</p>
            </div>

            <p
              className="mt-6 font-mono text-[clamp(3rem,8vw,4.5rem)] font-medium leading-none tracking-[-0.04em] text-paper"
              aria-live="polite"
            >
              {timeDisplay}
            </p>

            <div
              className="mt-4 h-1 w-full bg-line"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              aria-label="Timer progress"
            >
              <div
                className="h-full bg-accent transition-[width] duration-1000 ease-linear"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {!timerRunning ? (
                <button type="button" className="lofi-btn lofi-btn--primary" onClick={startTimer}>
                  Start
                </button>
              ) : (
                <button type="button" className="lofi-btn" onClick={pauseTimer}>
                  Pause
                </button>
              )}
              <button type="button" className="lofi-btn" onClick={resetTimer}>
                Reset
              </button>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 border-t border-line pt-5">
              <input
                type="checkbox"
                checked={syncRadio}
                onChange={(e) => setSyncRadio(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#ff6b35]"
              />
              <span className="text-sm leading-snug text-mute">
                Sync radio with timer
                <span className="mt-1 block text-[13px] text-dim">
                  Starting focus queues the current track.
                </span>
              </span>
            </label>

            <p className="mono-label mt-6">Cycles completed · {cycles}</p>
          </div>

          {/* Sticky wall */}
          <div className="lofi-panel lg:col-span-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="mono-label text-accent">03 / Wall</p>
              <p className="mono-label">{notes.length} notes</p>
            </div>

            <div className="mt-5">
              <label htmlFor="wall-note" className="sr-only">
                Sticky note
              </label>
              <textarea
                id="wall-note"
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    addNote();
                  }
                }}
                maxLength={280}
                rows={3}
                placeholder="Leave a note on the wall…"
                className="lofi-textarea"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="mono-label">{noteDraft.length}/280</p>
                <button
                  type="button"
                  className="lofi-btn lofi-btn--primary"
                  onClick={addNote}
                  disabled={!noteDraft.trim()}
                >
                  Pin note
                </button>
              </div>
            </div>

            <ul className="lofi-wall mt-5" aria-label="Sticky notes">
              {notes.length === 0 && (
                <li className="lofi-note lofi-note--empty">
                  <p className="text-sm text-mute">
                    Empty wall. Pin a thought, a lyric, or a reminder for the next session.
                  </p>
                </li>
              )}
              {notes.map((note) => (
                <li key={note.id} className="lofi-note">
                  <p className="whitespace-pre-wrap break-words text-[14px] leading-snug text-ink">
                    {note.text}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <time className="font-mono text-[10px] uppercase tracking-label text-ink/50">
                      {new Date(note.created).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <button
                      type="button"
                      onClick={() => removeNote(note.id)}
                      className="font-mono text-[10px] uppercase tracking-label text-ink/50 transition-colors hover:text-ink"
                      aria-label="Delete note"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
