import { useEffect, useRef, useState } from 'react';

type Line = { id: number; kind: 'in' | 'out' | 'err' | 'ok'; text: string };

const BANNER: Line[] = [
  { id: 0, kind: 'ok', text: 'testimonyowolabi portfolio shell v1.0' },
  { id: 1, kind: 'out', text: 'Type `help` to list commands. Click the panel first.' },
];

const HELP = [
  'Available commands:',
  '  help                 Show this list',
  '  skills               Tech stack highlights',
  '  contact               Email and social links',
  '  about                 Who am I',
  '  cat experience.txt    Work experience',
  '  work                  Selected projects',
  '  hire <name>           Log interest (POST /api/hire)',
  '  curl visitor-stats    Live visitor / geo stats',
  '  date                  Current time',
  '  clear                 Clear the terminal',
];

const SKILLS = [
  'TypeScript  React  Next.js  Node',
  'Tailwind  Prisma  Postgres  Redis',
  'System design  DX  shipping under pressure',
];

const CONTACT = [
  'email     testimony@example.com',
  'github    github.com/testimony',
  'linkedin  linkedin.com/in/testimony',
  'x         @testimony',
];

const ABOUT = [
  'Full-stack engineer. I design and build',
  'products end to end: interface, API, deploy.',
  'Currently open to interesting work.',
];

const EXPERIENCE = [
  'Accurate Medical Center HMS  Full-stack',
  '  Patient records, appointments, RBAC.',
  'Juphil Aluminum  Design / Dev / Deploy',
  '  Production site, end to end.',
  'Metabotics  Engineering',
  '  Intelligent industry systems.',
];

const WORK = [
  '01  juphilaluminum.com',
  '02  accurate-medical.vercel.app',
  '03  reubx.vercel.app',
  '04  gilgal-dental.vercel.app',
];

const VISITS_KEY = 'cli-visitor-count';
const HIRES_KEY = 'cli-hires';
const BASE_VISITS = 4218;

function readCount(key: string, base: number): number {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return base;
    const n = Number(raw);
    return Number.isFinite(n) ? n : base;
  } catch {
    return base;
  }
}

function writeCount(key: string, value: number) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    /* ignore */
  }
}

async function fetchGeo(): Promise<{ country?: string; city?: string; ip?: string }> {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error('geo');
    const data = (await res.json()) as {
      country_name?: string;
      city?: string;
      ip?: string;
    };
    return { country: data.country_name, city: data.city, ip: data.ip };
  } catch {
    return {};
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const idRef = useRef(BANNER.length);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const visitsRef = useRef<number | null>(null);

  const push = (text: string, kind: Line['kind'] = 'out') => {
    idRef.current += 1;
    setLines((prev) => [...prev, { id: idRef.current, kind, text }]);
  };

  const pushAll = (texts: string[], kind: Line['kind'] = 'out') => {
    idRef.current += 1;
    const start = idRef.current;
    setLines((prev) => [
      ...prev,
      ...texts.map((text, i) => ({ id: start + i, kind, text })),
    ]);
    idRef.current = start + texts.length - 1;
  };

  useEffect(() => {
    const n = readCount(VISITS_KEY, BASE_VISITS) + 1;
    visitsRef.current = n;
    writeCount(VISITS_KEY, n);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' });
  }, [lines]);

  const runVisitorStats = async () => {
    setBusy(true);
    push('$ curl visitor-stats', 'in');
    push('...', 'out');
    const geo = await fetchGeo();
    const visits = visitsRef.current ?? readCount(VISITS_KEY, BASE_VISITS);
    const payload = {
      visitor: `#${visits.toLocaleString('en-US')}`,
      country: geo.country || 'unknown',
      city: geo.city || 'unknown',
      ip: geo.ip || 'hidden',
      endpoint: 'GET /api/visitor-stats',
      status: 200,
    };
    pushAll(
      [
        JSON.stringify(payload, null, 2),
        'ok  stats served from edge cache',
      ],
      'ok',
    );
    setBusy(false);
  };

  const runHire = async (name: string) => {
    if (!name) {
      push('usage: hire <your-name>', 'err');
      return;
    }
    setBusy(true);
    push(`$ hire ${name}`, 'in');
    push('POST /api/hire', 'out');
    const geo = await fetchGeo();
    let hires: string[] = [];
    try {
      hires = JSON.parse(localStorage.getItem(HIRES_KEY) || '[]') as string[];
    } catch {
      hires = [];
    }
    const entry = `${name} | ${new Date().toISOString()} | ${geo.country || 'unknown'}`;
    hires.push(entry);
    try {
      localStorage.setItem(HIRES_KEY, JSON.stringify(hires.slice(-50)));
    } catch {
      /* ignore */
    }
    pushAll(
      [
        `{ "name": "${name}", "logged": true, "count": ${hires.length} }`,
        `Thanks, ${name}. Testimony will follow up.`,
      ],
      'ok',
    );
    setBusy(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const raw = value.trim();
    setValue('');
    if (!raw) return;
    idRef.current += 1;
    setLines((prev) => [...prev, { id: idRef.current, kind: 'in', text: `$ ${raw}` }]);

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
      case '?':
        pushAll(HELP);
        break;
      case 'skills':
      case 'stack':
        pushAll(SKILLS);
        break;
      case 'contact':
        pushAll(CONTACT);
        break;
      case 'about':
      case 'whoami':
        pushAll(ABOUT);
        break;
      case 'cat':
      case 'type': {
        const file = (args[0] || '').toLowerCase();
        if (file === 'experience.txt' || file === './experience.txt') {
          pushAll(EXPERIENCE);
        } else if (file === 'about.txt' || file === 'readme.md') {
          pushAll(ABOUT);
        } else if (!file) {
          push('usage: cat experience.txt', 'err');
        } else {
          push(`cat: ${file}: No such file`, 'err');
        }
        break;
      }
      case 'work':
      case 'projects':
      case 'ls':
        pushAll(cmd === 'ls' ? ['experience.txt  skills  contact  work'] : WORK);
        break;
      case 'hire':
        await runHire(args.join(' ').trim() || args[0]);
        break;
      case 'curl': {
        const target = (args[0] || '').toLowerCase();
        if (target === 'visitor-stats' || target === 'visitor_stats') {
          await runVisitorStats();
        } else {
          push(`curl: ${args[0] || ''}: unsupported endpoint (try visitor-stats)`, 'err');
        }
        break;
      }
      case 'date':
        push(new Date().toString());
        break;
      case 'clear':
      case 'cls':
        setLines([]);
        break;
      case 'echo':
        push(args.join(' '));
        break;
      case 'sudo':
        push('nice try. permission denied.', 'err');
        break;
      default:
        push(`command not found: ${cmd}. Try \`help\`.`, 'err');
    }
  };

  const lineClass = (kind: Line['kind']) => {
    if (kind === 'in') return 'text-paper';
    if (kind === 'err') return 'text-accent';
    if (kind === 'ok') return 'text-zinc-300';
    return 'text-mute';
  };

  return (
    <div className="lofi-panel lofi-panel--term lg:col-span-3">
      <div className="flex items-baseline justify-between gap-4">
        <p className="mono-label text-accent">03 / CLI</p>
        <p className="mono-label">{busy ? 'busy' : 'ready'}</p>
      </div>

      <div
        className="cli-screen mt-4"
        onClick={() => inputRef.current?.focus()}
        role="presentation"
      >
        <div className="max-h-[18rem] overflow-y-auto pr-1" aria-live="polite">
          {lines.map((line) => (
            <p key={line.id} className={`cli-line ${lineClass(line.kind)}`}>
              {line.text}
            </p>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2" role="search">
          <label htmlFor="cli-input" className="sr-only">
            Terminal command
          </label>
          <span className="cli-prompt" aria-hidden="true">
            $
          </span>
          <input
            ref={inputRef}
            id="cli-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="help"
            autoComplete="off"
            spellCheck={false}
            className="cli-input"
            disabled={busy}
          />
        </form>
      </div>

      <p className="mono-label mt-3">try: help · skills · cat experience.txt · curl visitor-stats</p>
    </div>
  );
}
