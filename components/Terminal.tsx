import { useCallback, useEffect, useRef, useState } from 'react';
import { site } from '../data/site';

type Line = { id: number; kind: 'in' | 'out' | 'err' | 'ok'; text: string };

type FsNode =
  | { type: 'dir'; children: Record<string, FsNode> }
  | { type: 'file'; content: string };

const BANNER: Line[] = [
  { id: 0, kind: 'ok', text: 'testimonyowolabi portfolio shell v1.0' },
  { id: 1, kind: 'out', text: 'Type `help` to list commands. Click the panel first.' },
];

const SKILLS = [
  'TypeScript  React  Next.js  Node',
  'Tailwind  Prisma  Postgres  Redis',
  'System design  DX  shipping under pressure',
];

const CONTACT = [
  `email     ${site.email}`,
  `phone     ${site.phone}`,
  `github    ${site.github.replace('https://', '')}`,
  `linkedin  ${site.linkedin.replace('https://', '')}`,
  `medium    ${site.medium.replace('https://', '')}`,
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

const README = [
  '# Testimony Owolabi',
  '',
  'Full-stack software engineer. Akure, Nigeria.',
  '',
  'Explore with: ls, cd, cat, pwd',
  'Meta: help, about, skills, contact, whoami',
];

const HELP_NAV = [
  'Navigation:',
  '  pwd                  Print working directory',
  '  ls [-a] [path]       List directory entries',
  '  cd [path]            Change directory (.., ~, -)',
  '  tree [path]          Show directory tree',
  '  cat <file>           Print file contents',
  '  head/tail <file>     First/last lines of a file',
  '  wc <file>            Count lines/words/chars',
  '  find <name>          Find files by name',
  '  mkdir <name>         Create a directory (session)',
  '  touch <name>         Create a file (session)',
  '  rm <name>            Remove a session entry',
  '  echo <text>          Print text',
  '  history              Command history',
];

const HELP_META = [
  'Meta:',
  '  help [topic]         This list (nav|info|sys)',
  '  about | whoami | skills | contact | work',
  '  cat readme.md | experience.txt',
  '  hire <name>          Log interest',
  '  curl visitor-stats   Live visitor / geo stats',
  '  date | uptime | uname | hostname | id',
  '  which <cmd>          Locate a command',
  '  man <cmd>            Short manual',
  '  clear | cls           Clear the screen',
  '  exit                 Clear prompt input',
  '  sudo <cmd>           Permission denied (always)',
];

const VISITS_KEY = 'cli-visitor-count';
const HIRES_KEY = 'cli-hires';
const HISTORY_KEY = 'cli-history-v1';
const BASE_VISITS = 4218;
const HOME = '/';

function file(content: string): FsNode {
  return { type: 'file', content };
}

function dir(children: Record<string, FsNode>): FsNode {
  return { type: 'dir', children };
}

function createRootFs(): Record<string, FsNode> {
  return {
    'readme.md': file(README.join('\n')),
    'experience.txt': file(EXPERIENCE.join('\n')),
    'about.txt': file(ABOUT.join('\n')),
    'skills.txt': file(SKILLS.join('\n')),
    'contact.txt': file(CONTACT.join('\n')),
    'work.txt': file(WORK.join('\n')),
    projects: dir({
      'juphil.txt': file('juphilaluminum.com  Design / Dev / Deploy'),
      'accurate.txt': file('accurate-medical.vercel.app  HMS'),
      'reubx.txt': file('reubx.vercel.app'),
      'gilgal.txt': file('gilgal-dental.vercel.app'),
    }),
    experience: dir({
      'accurate.md': file('Accurate Medical Center HMS  Full-stack'),
      'juphil.md': file('Juphil Aluminum  Design / Dev / Deploy'),
      'metabotics.md': file('Metabotics  Engineering'),
    }),
    '.config': dir({
      'shell': file('editorial dark · ease cubic-bezier(0.16,1,0.3,1)'),
    }),
  };
}

function normalizePath(cwd: string, input: string): string {
  let path = input.trim() || cwd;
  if (path === '~' || path === '$HOME') path = HOME;
  if (path.startsWith('~/')) path = HOME + path.slice(1);
  if (!path.startsWith('/')) {
    path = cwd === '/' ? `/${path}` : `${cwd}/${path}`;
  }
  const parts: string[] = [];
  for (const seg of path.split('/')) {
    if (!seg || seg === '.') continue;
    if (seg === '..') {
      if (parts.length > 0) parts.pop();
      continue;
    }
    parts.push(seg);
  }
  return `/${parts.join('/')}`.replace(/\/+$/, '') || '/';
}

function resolveNode(root: Record<string, FsNode>, path: string): FsNode | null {
  if (path === '/') return { type: 'dir', children: root };
  const parts = path.split('/').filter(Boolean);
  let node: FsNode = { type: 'dir', children: root };
  for (const part of parts) {
    if (node.type !== 'dir') return null;
    const next = node.children[part];
    if (!next) return null;
    node = next;
  }
  return node;
}

function listEntries(node: FsNode, showAll: boolean): string[] {
  if (node.type !== 'dir') return [node.content];
  return Object.keys(node.children)
    .filter((name) => showAll || !name.startsWith('.'))
    .sort((a, b) => {
      const ad = node.children[a].type === 'dir';
      const bd = node.children[b].type === 'dir';
      if (ad !== bd) return ad ? -1 : 1;
      return a.localeCompare(b);
    })
    .map((name) => (node.children[name].type === 'dir' ? `${name}/` : name));
}

function treeLines(
  rootDir: Record<string, FsNode>,
  path: string,
  prefix = '',
  depth = 0,
): string[] {
  if (depth > 4) return [];
  const node = resolveNode(rootDir, path);
  if (!node) return [`tree: ${path}: No such directory`];
  if (node.type === 'file') return [path.split('/').pop() || path];
  const names = Object.keys(node.children).sort((a, b) => a.localeCompare(b));
  const out: string[] = depth === 0 ? [path === '/' ? '/' : path] : [];
  names.forEach((name, i) => {
    const last = i === names.length - 1;
    const child = node.children[name];
    out.push(`${prefix}${last ? '└── ' : '├── '}${name}${child.type === 'dir' ? '/' : ''}`);
    if (child.type === 'dir') {
      const childPath = path === '/' ? `/${name}` : `${path}/${name}`;
      const nextPrefix = prefix + (last ? '    ' : '│   ');
      out.push(...treeLines(rootDir, childPath, nextPrefix, depth + 1));
    }
  });
  return out;
}

function findNames(
  rootDir: Record<string, FsNode>,
  path: string,
  needle: string,
  acc: string[] = [],
  depth = 0,
): string[] {
  if (depth > 6) return acc;
  const node = resolveNode(rootDir, path);
  if (!node) return acc;
  const base = path === '/' ? '' : path;
  if (node.type === 'file') {
    const name = path.split('/').pop() || path;
    if (name.toLowerCase().includes(needle.toLowerCase())) acc.push(path);
    return acc;
  }
  for (const name of Object.keys(node.children).sort()) {
    const childPath = `${base}/${name}`.replace('//', '/');
    if (name.toLowerCase().includes(needle.toLowerCase())) acc.push(childPath);
    if (node.children[name].type === 'dir') {
      findNames(rootDir, childPath, needle, acc, depth + 1);
    }
  }
  return acc;
}

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

const WELCOME_TEXT = 'WELCOME TO MY TERMINAL';

const MAN_PAGES: Record<string, string[]> = {
  ls: ['ls [-a] [path]', 'List directory contents. -a includes dotfiles.'],
  cd: ['cd [path]', 'Change directory. .. parent, ~ home, - previous.'],
  pwd: ['pwd', 'Print the current working directory.'],
  cat: ['cat <file>', 'Concatenate and print file contents.'],
  mkdir: ['mkdir <name>', 'Create a directory in the session filesystem.'],
  touch: ['touch <name>', 'Create an empty file in the session filesystem.'],
  rm: ['rm <name>', 'Remove a session-created file or empty directory.'],
  echo: ['echo <text>', 'Print arguments to the terminal.'],
  help: ['help [nav|info|sys]', 'List available commands.'],
  whoami: ['whoami', 'Print the current user.'],
  clear: ['clear', 'Clear the terminal buffer.'],
  history: ['history', 'Show recent command history.'],
  curl: ['curl visitor-stats', 'Fetch visitor and geo stats.'],
  hire: ['hire <name>', 'Log interest in working together.'],
};

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [cwd, setCwd] = useState(HOME);
  const [prevCwd, setPrevCwd] = useState(HOME);
  const idRef = useRef(BANNER.length);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const visitsRef = useRef<number | null>(null);
  const welcomedRef = useRef(false);
  const welcomeTimerRef = useRef<number | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const fsRef = useRef<Record<string, FsNode> | null>(null);

  if (fsRef.current === null) {
    fsRef.current = createRootFs();
  }

  const push = (text: string, kind: Line['kind'] = 'out') => {
    idRef.current += 1;
    setLines((prev) => [...prev, { id: idRef.current, kind, text }]);
  };

  const pushAll = (texts: string[], kind: Line['kind'] = 'out') => {
    if (texts.length === 0) return;
    idRef.current += 1;
    const start = idRef.current;
    setLines((prev) => [
      ...prev,
      ...texts.map((text, i) => ({ id: start + i, kind, text })),
    ]);
    idRef.current = start + texts.length - 1;
  };

  const displayPath = (path: string) => (path === '/' ? '~' : path);

  useEffect(() => {
    const n = readCount(VISITS_KEY, BASE_VISITS) + 1;
    visitsRef.current = n;
    writeCount(VISITS_KEY, n);
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) historyRef.current = JSON.parse(raw) as string[];
    } catch {
      historyRef.current = [];
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' });
  }, [lines]);

  useEffect(() => {
    return () => {
      if (welcomeTimerRef.current) window.clearTimeout(welcomeTimerRef.current);
    };
  }, []);

  const onScreenClick = () => {
    inputRef.current?.focus();
    if (welcomedRef.current) return;
    welcomedRef.current = true;
    setWelcome(true);
    welcomeTimerRef.current = window.setTimeout(() => setWelcome(false), 3200);
  };

  const runVisitorStats = async () => {
    setBusy(true);
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
    pushAll([JSON.stringify(payload, null, 2), 'ok  stats served from edge cache'], 'ok');
    setBusy(false);
  };

  const runHire = async (name: string) => {
    if (!name) {
      push('usage: hire <your-name>', 'err');
      return;
    }
    setBusy(true);
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

  const readFileAt = (path: string): { ok: boolean; text: string; msg: string } => {
    const root = fsRef.current!;
    const abs = normalizePath(cwd, path);
    const node = resolveNode(root, abs);
    if (!node) return { ok: false, text: '', msg: `cat: ${path}: No such file or directory` };
    if (node.type === 'dir') return { ok: false, text: '', msg: `cat: ${path}: Is a directory` };
    return { ok: true, text: node.content, msg: '' };
  };

  const writeSessionFile = (path: string, content: string): string | null => {
    const root = fsRef.current!;
    const abs = normalizePath(cwd, path);
    const parts = abs.split('/').filter(Boolean);
    const name = parts.pop();
    if (!name) return 'invalid path';
    let node: FsNode = { type: 'dir', children: root };
    for (const part of parts) {
      if (node.type !== 'dir') return 'not a directory';
      const next = node.children[part];
      if (!next) return `mkdir: ${part}: No such file or directory`;
      node = next;
    }
    if (node.type !== 'dir') return 'not a directory';
    node.children[name] = file(content);
    return null;
  };

  const makeSessionDir = (path: string): string | null => {
    const root = fsRef.current!;
    const abs = normalizePath(cwd, path);
    const parts = abs.split('/').filter(Boolean);
    const name = parts.pop();
    if (!name) return 'invalid path';
    let node: FsNode = { type: 'dir', children: root };
    for (const part of parts) {
      if (node.type !== 'dir') return 'not a directory';
      const next = node.children[part];
      if (!next) return `mkdir: ${part}: No such file or directory`;
      node = next;
    }
    if (node.type !== 'dir') return 'not a directory';
    if (node.children[name]) return `mkdir: ${name}: File exists`;
    node.children[name] = dir({});
    return null;
  };

  const removeSessionEntry = (path: string): string | null => {
    const root = fsRef.current!;
    const abs = normalizePath(cwd, path);
    const parts = abs.split('/').filter(Boolean);
    const name = parts.pop();
    if (!name) return 'invalid path';
    let node: FsNode = { type: 'dir', children: root };
    for (const part of parts) {
      if (node.type !== 'dir') return 'not a directory';
      const next = node.children[part];
      if (!next) return `rm: ${part}: No such file or directory`;
      node = next;
    }
    if (node.type !== 'dir') return 'not a directory';
    const target = node.children[name];
    if (!target) return `rm: ${path}: No such file or directory`;
    if (target.type === 'dir' && Object.keys(target.children).length > 0) {
      return `rm: ${path}: Directory not empty`;
    }
    delete node.children[name];
    return null;
  };

  const changeDir = (target: string) => {
    const next = normalizePath(cwd, target || HOME);
    const node = resolveNode(fsRef.current!, next);
    if (!node) {
      push(`cd: ${target || next}: No such file or directory`, 'err');
      return;
    }
    if (node.type !== 'dir') {
      push(`cd: ${target}: Not a directory`, 'err');
      return;
    }
    setPrevCwd(cwd);
    setCwd(next);
  };

  const handleNav = useCallback(
    (cmd: string, args: string[]): boolean => {
      const root = fsRef.current!;

      if (cmd === 'pwd') {
        push(displayPath(cwd));
        return true;
      }

      if (cmd === 'cd') {
        const target = args[0];
        if (!target) {
          changeDir(HOME);
          return true;
        }
        if (target === '-') {
          const swap = prevCwd;
          setPrevCwd(cwd);
          setCwd(swap);
          push(displayPath(swap));
          return true;
        }
        changeDir(target);
        return true;
      }

      if (cmd === 'ls' || cmd === 'dir') {
        const flags = args.filter((a) => a.startsWith('-'));
        const paths = args.filter((a) => !a.startsWith('-'));
        const showAll = flags.some((f) => f.includes('a'));
        const target = paths[0] ? normalizePath(cwd, paths[0]) : cwd;
        const node = resolveNode(root, target);
        if (!node) {
          push(`ls: ${paths[0] || target}: No such file or directory`, 'err');
          return true;
        }
        if (node.type === 'file') {
          push(paths[0] || target.split('/').pop() || target);
          return true;
        }
        const entries = listEntries(node, showAll);
        if (entries.length === 0) return true;
        if (flags.some((f) => f.includes('l'))) {
          pushAll(
            entries.map((name) => {
              const rawName = name.replace(/\/$/, '');
              const child = node.children[rawName];
              const kind = child.type === 'dir' ? 'd' : '-';
              const size = child.type === 'file' ? String(child.content.length).padStart(6) : '  4096';
              return `${kind}rwxr-xr-x  testimony  ${size}  ${rawName}${child.type === 'dir' ? '/' : ''}`;
            }),
          );
        } else {
          const width = Math.max(...entries.map((e) => e.length));
          const cols = Math.max(1, Math.floor(60 / (width + 2)));
          for (let i = 0; i < entries.length; i += cols) {
            push(
              entries
                .slice(i, i + cols)
                .map((e) => e.padEnd(width))
                .join('  ')
                .trimEnd(),
            );
          }
        }
        return true;
      }

      if (cmd === 'tree') {
        const target = args[0] ? normalizePath(cwd, args[0]) : cwd;
        pushAll(treeLines(root, target));
        return true;
      }

      if (cmd === 'cat' || cmd === 'type') {
        if (!args[0]) {
          push('usage: cat <file>', 'err');
          return true;
        }
        for (const arg of args) {
          const result = readFileAt(arg);
          if (result.ok) {
            pushAll(result.text.split('\n'));
          } else {
            push(result.msg, 'err');
          }
        }
        return true;
      }

      if (cmd === 'head' || cmd === 'tail') {
        const nFlag = args.findIndex((a) => a === '-n');
        let count = 10;
        let fileArg = '';
        if (nFlag >= 0 && args[nFlag + 1]) {
          count = Number(args[nFlag + 1]) || 10;
          fileArg = args[nFlag + 2] || '';
        } else {
          fileArg = args.find((a) => !a.startsWith('-')) || '';
        }
        if (!fileArg) {
          push(`usage: ${cmd} [-n N] <file>`, 'err');
          return true;
        }
        const result = readFileAt(fileArg);
        if (result.ok) {
          const parts = result.text.split('\n');
          pushAll(cmd === 'head' ? parts.slice(0, count) : parts.slice(-count));
        } else {
          push(result.msg, 'err');
        }
        return true;
      }

      if (cmd === 'wc') {
        const fileArg = args.find((a) => !a.startsWith('-'));
        if (!fileArg) {
          push('usage: wc <file>', 'err');
          return true;
        }
        const result = readFileAt(fileArg);
        if (result.ok) {
          const text = result.text;
          const linesCount = text.split('\n').length;
          const words = text.split(/\s+/).filter(Boolean).length;
          const chars = text.length;
          if (args.includes('-l')) push(String(linesCount));
          else if (args.includes('-w')) push(String(words));
          else if (args.includes('-c')) push(String(chars));
          else push(`${String(linesCount).padStart(6)} ${String(words).padStart(6)} ${String(chars).padStart(6)}  ${fileArg}`);
        } else {
          push(result.msg, 'err');
        }
        return true;
      }

      if (cmd === 'find') {
        const needle = args.find((a) => !a.startsWith('-')) || '';
        if (!needle) {
          push('usage: find <name>', 'err');
          return true;
        }
        const hits = findNames(root, cwd, needle);
        if (hits.length === 0) push('(no matches)');
        else pushAll(hits);
        return true;
      }

      if (cmd === 'mkdir') {
        if (!args[0]) {
          push('usage: mkdir <name>', 'err');
          return true;
        }
        const err = makeSessionDir(args[0]);
        if (err) push(err, 'err');
        return true;
      }

      if (cmd === 'touch') {
        if (!args[0]) {
          push('usage: touch <name>', 'err');
          return true;
        }
        const err = writeSessionFile(args[0], '');
        if (err) push(err, 'err');
        return true;
      }

      if (cmd === 'rm' || cmd === 'rmdir') {
        const targets = args.filter((a) => !a.startsWith('-'));
        if (targets.length === 0) {
          push(`usage: ${cmd} <name>`, 'err');
          return true;
        }
        for (const t of targets) {
          const err = removeSessionEntry(t);
          if (err) push(err, 'err');
        }
        return true;
      }

      if (cmd === 'cd~') {
        changeDir(HOME);
        return true;
      }

      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cwd, prevCwd],
  );

  const handleMeta = useCallback(
    (cmd: string, args: string[]): boolean => {
      switch (cmd) {
        case 'help':
        case '?': {
          const topic = (args[0] || '').toLowerCase();
          if (topic === 'nav' || topic === 'navi') pushAll(HELP_NAV);
          else if (topic === 'info') pushAll(['info', ...CONTACT, ...ABOUT]);
          else if (topic === 'sys' || topic === 'system') pushAll(HELP_META);
          else pushAll([...HELP_NAV, '', ...HELP_META]);
          return true;
        }
        case 'skills':
        case 'stack':
          pushAll(SKILLS);
          return true;
        case 'contact':
          pushAll(CONTACT);
          return true;
        case 'about':
        case 'whoami':
          if (cmd === 'whoami') {
            push('testimony');
            return true;
          }
          pushAll(ABOUT);
          return true;
        case 'work':
        case 'projects':
          pushAll(WORK);
          return true;
        case 'hire':
          void runHire(args.join(' ').trim() || args[0]);
          return true;
        case 'curl': {
          const target = (args[0] || '').toLowerCase();
          if (target === 'visitor-stats' || target === 'visitor_stats') {
            void runVisitorStats();
          } else {
            push(`curl: ${args[0] || ''}: unsupported endpoint (try visitor-stats)`, 'err');
          }
          return true;
        }
        case 'date':
          push(new Date().toString());
          return true;
        case 'uptime': {
          const up = Math.floor(performance.now() / 1000);
          push(`up ${up}s, 1 user, load average: 0.42, 0.31, 0.28`);
          return true;
        }
        case 'uname':
          if (args.includes('-a')) push('PortfolioOS 1.0 browser x86_64 JavaScript');
          else push('PortfolioOS');
          return true;
        case 'hostname':
          push('testimonyowolabi');
          return true;
        case 'id':
          push('uid=1000(testimony) gid=1000(testimony) groups=1000(testimony),27(sudo)');
          return true;
        case 'which': {
          const target = args[0];
          if (!target) {
            push('usage: which <cmd>', 'err');
            return true;
          }
          const known = new Set([
            'ls','cd','pwd','cat','head','tail','wc','find','mkdir','touch','rm',
            'echo','help','about','skills','contact','work','hire','curl','date',
            'clear','history','whoami','uname','hostname','id','tree','man','sudo','exit',
          ]);
          if (known.has(target)) push(`/usr/bin/${target}`);
          else push(`which: no ${target} in (/usr/bin:/bin)`, 'err');
          return true;
        }
        case 'man': {
          const page = (args[0] || '').toLowerCase();
          if (!page) {
            push('What manual page do you want?', 'err');
            return true;
          }
          const entry = MAN_PAGES[page];
          if (!entry) {
            push(`No manual entry for ${page}`, 'err');
            return true;
          }
          pushAll([entry[0], '', entry[1] || '']);
          return true;
        }
        case 'history': {
          const hist = historyRef.current;
          if (hist.length === 0) {
            push('(history empty)');
            return true;
          }
          pushAll(hist.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`));
          return true;
        }
        case 'clear':
        case 'cls':
          setLines([]);
          return true;
        case 'echo':
          push(args.join(' ').replace(/^\$\{?HOME\}?/, '~'));
          return true;
        case 'exit':
          setValue('');
          push('session input cleared. type help to continue.', 'ok');
          return true;
        case 'sudo':
          push('nice try. permission denied.', 'err');
          return true;
        default:
          return false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cwd],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const raw = value.trim();
    setValue('');
    if (!raw) return;

    historyRef.current = [...historyRef.current.slice(-49), raw];
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(historyRef.current));
    } catch {
      /* ignore */
    }
    historyIndexRef.current = -1;

    idRef.current += 1;
    setLines((prev) => [
      ...prev,
      { id: idRef.current, kind: 'in', text: `${displayPath(cwd)} $ ${raw}` },
    ]);

    const parts = raw.match(/(?:[^\s"]+|"[^"]*")+/g)?.map((p) => p.replace(/^"|"$/g, '')) || [];
    const cmd = (parts[0] || '').toLowerCase();
    const args = parts.slice(1);
    if (!cmd) return;

    if (handleNav(cmd, args)) return;
    if (handleMeta(cmd, args)) return;

    push(`command not found: ${cmd}. Try \`help\`.`, 'err');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const hist = historyRef.current;
      if (hist.length === 0) return;
      if (historyIndexRef.current === -1) historyIndexRef.current = hist.length;
      historyIndexRef.current = Math.max(0, historyIndexRef.current - 1);
      setValue(hist[historyIndexRef.current] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const hist = historyRef.current;
      if (historyIndexRef.current === -1) return;
      historyIndexRef.current += 1;
      if (historyIndexRef.current >= hist.length) {
        historyIndexRef.current = -1;
        setValue('');
      } else {
        setValue(hist[historyIndexRef.current] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = value.split(/\s+/);
      const last = parts[parts.length - 1] || '';
      if (!last) return;
      const cmds = [
        'help','ls','cd','pwd','cat','tree','mkdir','touch','rm','echo','history',
        'about','skills','contact','work','hire','curl','date','clear','whoami','man',
      ];
      const matches = cmds.filter((c) => c.startsWith(last.toLowerCase()));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        setValue(parts.join(' '));
      }
    }
  };

  const lineClass = (kind: Line['kind']) => {
    if (kind === 'in') return 'text-paper';
    if (kind === 'err') return 'text-accent';
    if (kind === 'ok') return 'text-zinc-300';
    return 'text-mute';
  };

  return (
    <div className="lofi-panel lofi-panel--premium h-full">
      <div className="lofi-panel__head">
        <p className="mono-label text-accent">02 / CLI</p>
        <p className="lofi-status">{busy ? 'busy' : 'ready'}</p>
      </div>

      <div
        className="cli-screen mt-5 flex-1"
        onClick={onScreenClick}
        role="presentation"
      >
        {welcome && (
          <div className="cli-welcome" aria-live="polite">
            <p className="cli-welcome__text">
              {WELCOME_TEXT.split('').map((ch, i) => (
                <span
                  key={`${ch}-${i}`}
                  className="cli-welcome__ch"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  {ch === ' ' ? ' ' : ch}
                </span>
              ))}
            </p>
          </div>
        )}

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
          <span className="cli-prompt shrink-0" aria-hidden="true">
            {displayPath(cwd)} $
          </span>
          <input
            ref={inputRef}
            id="cli-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="help"
            autoComplete="off"
            spellCheck={false}
            className="cli-input"
            disabled={busy}
          />
        </form>
      </div>

      <p className="mono-label mt-3">try: help · ls · cd projects · cat readme.md · pwd</p>
    </div>
  );
}
