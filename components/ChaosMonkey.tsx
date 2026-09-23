import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

export type ChaosFlags = {
  latency: boolean;
  corrupt: boolean;
  wsDown: boolean;
  gridDown: boolean;
};

export type ChaosState = ChaosFlags & {
  broken: boolean;
  healing: boolean;
  log: string[];
  resetKey: number;
};

export const initialChaos: ChaosState = {
  broken: false,
  healing: false,
  latency: false,
  corrupt: false,
  wsDown: false,
  gridDown: false,
  log: [],
  resetKey: 0,
};

type BoundaryProps = { children: ReactNode; resetKey: number };
type BoundaryState = { error: Error | null };

export class ChaosBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  componentDidUpdate(prev: BoundaryProps) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="border border-accent/50 bg-accent-soft p-4" role="alert">
          <p className="mono-label text-accent">Error boundary</p>
          <p className="mt-2 text-sm text-paper">Render crashed. State isolated.</p>
          <p className="mt-1 font-mono text-[11px] text-mute">{this.state.error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function StateProbe({
  corrupt,
  title,
  artist,
}: {
  corrupt: boolean;
  title: string;
  artist: string;
}) {
  if (corrupt) {
    throw new Error('CORRUPTED_APP_STATE');
  }
  return (
    <>
      <p className="mt-5 font-mono text-sm uppercase tracking-[0.14em] text-paper">{title}</p>
      <p className="mt-1 text-sm text-mute">{artist}</p>
    </>
  );
}

const FLAG_ROWS: Array<{ key: keyof ChaosFlags; label: string; detail: string }> = [
  { key: 'latency', label: 'DB latency', detail: 'Slow catalog queries' },
  { key: 'corrupt', label: 'Corrupt state', detail: 'Crash render tree' },
  { key: 'wsDown', label: 'Drop socket', detail: 'Disconnect realtime' },
  { key: 'gridDown', label: 'Drop CSS grid', detail: 'Collapse layout' },
];

const HEAL_STEPS = [
  'boot: self-healing script',
  'reconcile: error boundary',
  'restore: db pool',
  'reconnect: websocket',
  'rebuild: css grid',
  'verify: all systems nominal',
];

type Props = {
  chaos: ChaosState;
  onBreak: () => void;
  onFix: () => void;
  onToggle: (key: keyof ChaosFlags) => void;
};

export function ChaosMonkey({ chaos, onBreak, onFix, onToggle }: Props) {
  const [armedHover, setArmedHover] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    },
    [],
  );

  const status = (down: boolean, okLabel: string, downLabel: string) =>
    down ? downLabel : okLabel;

  const toggleDisabled = !chaos.broken || chaos.healing;

  return (
    <div className="lofi-panel lofi-panel--chaos lg:col-span-3">
      <div className="flex items-baseline justify-between gap-4">
        <p className="mono-label text-accent">03 / Chaos</p>
        <p className="mono-label">
          {chaos.healing ? 'Healing' : chaos.broken ? 'Broken' : 'Nominal'}
        </p>
      </div>

      <ul className="mt-4 space-y-1.5" aria-label="System status">
        <li className="flex items-center justify-between gap-3 border-b border-line pb-1.5">
          <span className="mono-label">DB</span>
          <span className={`mono-label ${chaos.latency ? 'text-accent' : 'text-mute'}`}>
            {status(chaos.latency, '12ms', '2400ms')}
          </span>
        </li>
        <li className="flex items-center justify-between gap-3 border-b border-line pb-1.5">
          <span className="mono-label">WebSocket</span>
          <span className={`mono-label ${chaos.wsDown ? 'text-accent' : 'text-mute'}`}>
            {status(chaos.wsDown, 'open', 'closed')}
          </span>
        </li>
        <li className="flex items-center justify-between gap-3 border-b border-line pb-1.5">
          <span className="mono-label">State</span>
          <span className={`mono-label ${chaos.corrupt ? 'text-accent' : 'text-mute'}`}>
            {status(chaos.corrupt, 'healthy', 'corrupt')}
          </span>
        </li>
        <li className="flex items-center justify-between gap-3">
          <span className="mono-label">Layout</span>
          <span className={`mono-label ${chaos.gridDown ? 'text-accent' : 'text-mute'}`}>
            {status(chaos.gridDown, 'grid ok', 'grid gone')}
          </span>
        </li>
      </ul>

      {!chaos.broken && (
        <div className="mt-6">
          <p className="text-sm leading-relaxed text-mute">
            Intentionally inject failures into this page, then run the repair script. Defensive
            coding, made visible.
          </p>
          <button
            type="button"
            className="lofi-btn lofi-btn--primary mt-5 w-full"
            onClick={onBreak}
            disabled={chaos.healing}
            onMouseEnter={() => setArmedHover(true)}
            onMouseLeave={() => setArmedHover(false)}
          >
            {armedHover ? 'Arm injectors?' : 'Break my portfolio'}
          </button>
        </div>
      )}

      {chaos.broken && (
        <div className="mt-6 border-t border-line pt-4">
          <p className="mono-label">Failure injectors</p>
          <ul className="mt-3 space-y-2">
            {FLAG_ROWS.map((row) => (
              <li key={row.key}>
                <button
                  type="button"
                  className={`chaos-toggle${chaos[row.key] ? ' is-on' : ''}`}
                  onClick={() => onToggle(row.key)}
                  disabled={toggleDisabled}
                  aria-pressed={chaos[row.key]}
                >
                  <span className="chaos-toggle__dot" aria-hidden="true" />
                  <span className="min-w-0 text-left">
                    <span className="block text-[13px] text-paper">{row.label}</span>
                    <span className="block text-[11px] text-dim">{row.detail}</span>
                  </span>
                  <span className="mono-label ml-auto shrink-0">
                    {chaos[row.key] ? 'on' : 'off'}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-3">
            <button
              type="button"
              className="lofi-btn lofi-btn--primary w-full"
              onClick={onFix}
              disabled={chaos.healing}
            >
              {chaos.healing ? 'Healing…' : 'Fix it'}
            </button>
            <button
              type="button"
              className="lofi-btn w-full"
              onClick={onBreak}
              disabled={chaos.healing}
            >
              Re-arm injectors
            </button>
          </div>

          <div
            className="chaos-log mt-4 max-h-28 overflow-y-auto border border-line bg-ink p-3"
            aria-live="polite"
          >
            {chaos.log.length === 0 ? (
              <p className="font-mono text-[11px] text-dim">injectors armed. try Fix it.</p>
            ) : (
              chaos.log.map((line, i) => (
                <p key={`${line}-${i}`} className="font-mono text-[11px] leading-relaxed text-mute">
                  <span className="text-accent">$</span> {line}
                </p>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function useChaos() {
  const [chaos, setChaos] = useState<ChaosState>(initialChaos);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const onBreak = useCallback(() => {
    clearTimers();
    setChaos({
      broken: true,
      healing: false,
      latency: true,
      corrupt: true,
      wsDown: true,
      gridDown: true,
      log: ['chaos: armed', 'chaos: injectors live'],
      resetKey: 0,
    });
  }, [clearTimers]);

  const onToggle = useCallback((key: keyof ChaosFlags) => {
    setChaos((c) => (c.broken && !c.healing ? { ...c, [key]: !c[key] } : c));
  }, []);

  const onFix = useCallback(() => {
    if (!chaos.broken || chaos.healing) return;
    clearTimers();
    setChaos((c) => ({ ...c, healing: true, log: ['fix: starting self-heal'] }));

    HEAL_STEPS.forEach((step, i) => {
      const id = window.setTimeout(() => {
        setChaos((prev) => {
          const log = [...prev.log, step];
          if (i === HEAL_STEPS.length - 1) {
            return { ...initialChaos, log, resetKey: prev.resetKey + 1 };
          }
          const flags: ChaosFlags = {
            latency: i < 2,
            corrupt: i < 1,
            wsDown: i < 3,
            gridDown: i < 4,
          };
          return { ...prev, ...flags, log };
        });
      }, 400 * (i + 1));
      timers.current.push(id);
    });
  }, [chaos.broken, chaos.healing, clearTimers]);

  return { chaos, onBreak, onFix, onToggle };
}
