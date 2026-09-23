import type { NavItem } from '../types';

export const site = {
  name: 'Testimony Owolabi',
  brand: 'TESTYTECH',
  role: 'Full-Stack Software Engineer',
  domain: 'https://testimonyowolabi.pages.dev',
  location: 'Akure, Nigeria · GMT+1',
  email: 'owolabitestimony7724@gmail.com',
  phone: '+2348133583097',
  phoneHref: 'tel:+2348133583097',
  whatsapp: 'https://wa.me/2348133583097',
  github: 'https://github.com/buzzdotsui',
  linkedin: 'https://www.linkedin.com/in/testimony-owolabi/',
  medium: 'https://owolabitestimony.medium.com/',
  cv: '/CV/Testimony_Owolabi_Claude_Campus_Ambassador_Resume-1.pdf',
  portrait: {
    src: '/portrait.jpg',
    alt: 'Black and white portrait of Testimony Owolabi',
    width: 1000,
    height: 1000,
  },
} as const;

export const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const about = {
  label: 'About',
  heading: 'Engineering is the through-line.',
  paragraphs: [
    "I'm a full-stack software engineer. I design and build production systems: the kind with real users, real data, and real failure modes. Client work and product builds across web, AI, and Web3.",
    'Before software took over, I studied Metallurgical & Materials Engineering at FUTA. Materials science teaches you that everything has constraints: load limits, heat tolerances, corrosion, cost. Software has constraints too. Most people learn that in production. I learned it twice.',
    "That background is why I care about how systems behave under pressure, on screen and off. It's the reason Metabotics exists.",
  ],
  pullQuote: 'The physical world is the original legacy system.',
  facts: [
    { label: 'Role', value: 'Full-Stack Software Engineer' },
    { label: 'Background', value: 'B.Eng. Metallurgical & Materials Engineering, FUTA' },
    { label: 'Based', value: 'Akure, Nigeria · GMT+1' },
    { label: 'Working across', value: 'Web · AI · Web3' },
  ],
} as const;

export const beyond = {
  label: 'Beyond Software',
  heading: 'I build software for the physical world.',
  paragraphs: [
    'Screens are not the only place software should live. Metabotics is my long-term direction: intelligent monitoring, automation, and data systems for industrial processes, where materials engineering and software engineering meet.',
    'The scope covers software, industrial systems, automation, AI, manufacturing, digital twins, and materials engineering. Early stage by design: the architecture is set, the infrastructure is being built.',
  ],
  pipeline: [
    {
      step: '01',
      title: 'Sense',
      desc: 'Capture real-world signals through sensors and data acquisition.',
    },
    {
      step: '02',
      title: 'Understand',
      desc: 'Turn raw industrial data into structured, meaningful information.',
    },
    {
      step: '03',
      title: 'Predict',
      desc: 'Surface anomalies, inefficiencies, and potential failures.',
    },
    {
      step: '04',
      title: 'Optimize',
      desc: 'Close the loop between observation and action.',
    },
  ],
  status: 'Status: Research & Prototyping',
  url: 'https://metabotics.vercel.app/',
  urlLabel: 'metabotics.vercel.app',
} as const;

export const stack = {
  label: 'Stack',
  heading: 'What I work with.',
  note: 'Tools I use to build, ship, and explore.',
  groups: [
    {
      title: 'Core',
      featured: true,
      grid:
        'grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5',
      items: [
        { name: 'TypeScript', logo: '/logos/typescript.svg', brand: '#3178C6' },
        { name: 'JavaScript', logo: '/logos/javascript.svg', brand: '#F7DF1E' },
        { name: 'React', logo: '/logos/react.svg', brand: '#61DAFB' },
        { name: 'Next.js', logo: '/logos/nextdotjs.svg', brand: '#FFFFFF' },
        { name: 'Node.js', logo: '/logos/nodedotjs.svg', brand: '#5FA04E' },
        { name: 'PostgreSQL', logo: '/logos/postgresql.svg', brand: '#4169E1' },
        { name: 'Prisma', logo: '/logos/prisma.svg' },
        { name: 'Docker', logo: '/logos/docker.svg', brand: '#2496ED' },
        { name: 'Git / GitHub', logo: '/logos/git.svg', brand: '#F05032' },
      ],
    },
    {
      title: 'Frontend / Web',
      grid: 'grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6',
      items: [
        { name: 'HTML', logo: '/logos/html5.svg', brand: '#E34F26' },
        { name: 'CSS', logo: '/logos/css3.svg', brand: '#1572B6' },
        { name: 'Tailwind CSS', logo: '/logos/tailwindcss.svg', brand: '#06B6D4' },
        { name: 'React', logo: '/logos/react.svg', brand: '#61DAFB' },
        { name: 'Next.js', logo: '/logos/nextdotjs.svg', brand: '#FFFFFF' },
        { name: 'Framer Motion', logo: '/logos/framer.svg', brand: '#0055FF' },
      ],
    },
    {
      title: 'Backend / Data',
      grid: 'grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6',
      items: [
        { name: 'Node.js', logo: '/logos/nodedotjs.svg', brand: '#5FA04E' },
        { name: 'PostgreSQL', logo: '/logos/postgresql.svg', brand: '#4169E1' },
        { name: 'Prisma', logo: '/logos/prisma.svg' },
        { name: 'REST APIs', mark: '{}' },
        { name: 'Authentication / RBAC', mark: 'AUTH' },
        { name: 'Redis', logo: '/logos/redis.svg', brand: '#FF4438' },
      ],
    },
    {
      title: 'Web3',
      tag: 'Additional / Exploring',
      grid: 'grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4',
      items: [
        { name: 'Web3', mark: 'W3' },
        { name: 'Sui', logo: '/logos/sui.svg', brand: '#4DA2FF' },
        { name: 'Move', mark: 'MOVE' },
        { name: 'Solidity', logo: '/logos/solidity.svg' },
      ],
    },
    {
      title: 'AI / Automation',
      tag: 'Additional / Exploring',
      grid: 'grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4',
      items: [
        { name: 'Python', logo: '/logos/python.svg', brand: '#3776AB' },
        { name: 'AI / LLM applications', mark: 'LLM' },
        { name: 'AI-assisted development', mark: 'AI' },
      ],
    },
  ],
} as const;

export const writing = {
  label: 'Writing',
  heading: 'Field notes and long-form work.',
  note: 'Essays on intelligent industry, systems thinking, and the path so far, published on Medium.',
  articles: [
    {
      title: 'I Was Never Meant to Be Average',
      excerpt:
        'At 18, inside Federal University of Technology Akure, I stopped waiting for opportunity and started building systems that could change Africa. Born in Offa, raised in Ado Ekiti, and always feeling like something did not quite fit.',
      date: 'Apr 9, 2026',
      readTime: '4 min read',
      url: 'https://owolabitestimony.medium.com/i-was-never-meant-to-be-average-e974007efee5',
    },
    {
      title: 'Inside Metabotics: Engineering the Brain of Smart Factories',
      excerpt:
        'Across much of the industrial world today, machines are powerful, but factories are still largely blind. Metabotics is built around a simple idea: industrial processes should not just operate, they should understand themselves.',
      date: 'Mar 17, 2026',
      readTime: '4 min read',
      url: 'https://owolabitestimony.medium.com/inside-metabotics-engineering-the-brain-of-smart-factories-2ad030054f79',
    },
    {
      title: 'Engineering the Future of Intelligent Industry in Africa',
      excerpt:
        'Industrial progress has always been driven by people who look at existing systems and ask a simple question: Can this be done better? The question is no longer whether industry will become intelligent, it is who will build the systems that make it possible.',
      date: 'Mar 16, 2026',
      readTime: '5 min read',
      url: 'https://owolabitestimony.medium.com/engineering-the-future-of-intelligent-industry-in-africa-9984c5f2885f',
    },
  ],
} as const;

export const elsewhere = {
  label: 'Elsewhere',
  heading: 'Find me online.',
  links: [
    {
      platform: 'X',
      handle: '@_buzzdotsui',
      description: 'Building in public · Web3 · Sui · Engineering',
      url: 'https://x.com/_buzzdotsui',
      logo: '/logos/x.svg',
      brand: '#FFFFFF',
    },
    {
      platform: 'X',
      handle: '@testytech_pr',
      description: 'Software · Projects · Personal brand',
      url: 'https://x.com/testytech_pr',
      logo: '/logos/x.svg',
      brand: '#FFFFFF',
    },
    {
      platform: 'GitHub',
      handle: 'buzzdotsui',
      url: 'https://github.com/buzzdotsui',
      logo: '/logos/github.svg',
      brand: '#FFFFFF',
    },
    {
      platform: 'LinkedIn',
      handle: 'Testimony Owolabi',
      url: 'https://www.linkedin.com/in/testimony-owolabi/',
      logo: '/logos/linkedin.svg',
      brand: '#0A66C2',
    },
    {
      platform: 'Medium',
      handle: 'owolabitestimony',
      description: 'Essays on industry, systems, and building in public',
      url: 'https://owolabitestimony.medium.com/',
      logo: '/logos/medium.svg',
      brand: '#FFFFFF',
    },
  ],
} as const;

export const contact = {
  label: 'Contact',
  heading: 'Working on something real?',
  paragraphs: [
    "I'm open to software engineering roles and serious collaborations, especially anything at the edge of software and the physical world.",
    'Tell me what you are building. I will tell you honestly whether I can help.',
  ],
} as const;
