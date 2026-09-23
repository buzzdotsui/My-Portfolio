import type { Project } from '../types';

export const projects: Project[] = [
  {
    number: '01',
    name: 'Juphil Aluminum',
    description:
      'Production website for an aluminum roofing manufacturer in Akure, designed, built, and deployed end to end.',
    stack: ['Next.js', 'TypeScript', 'Resend', 'Vercel'],
    role: 'Design / Development / Deployment',
    status: 'Live · Client work',
    url: 'https://juphilaluminum.com',
    urlLabel: 'juphilaluminum.com',
    image: {
      src: '/work/juphil.jpg',
      alt: 'Juphil Aluminum website homepage showing the headline “Built to last. Designed to protect.”',
      width: 1361,
      height: 658,
    },
  },
  {
    number: '02',
    name: 'Accurate Medical Center HMS',
    description:
      'Hospital management system for a working medical facility: patient records, appointments, staff roles, and clinical workflows in one product.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'Better Auth',
      'Supabase',
      'Redis',
      'Cloudinary',
      'Docker',
      'RBAC',
    ],
    role: 'Full-stack engineering',
    status: 'Live · Ongoing',
    url: 'https://accurate-medical.vercel.app',
    urlLabel: 'accurate-medical.vercel.app',
    image: {
      src: '/work/accurate.jpg',
      alt: 'Accurate Medical Center HMS admin dashboard showing hospital overview metrics and navigation',
      width: 1366,
      height: 665,
    },
  },
  {
    number: '03',
    name: 'ReubX World',
    description:
      'E-commerce platform for a premium fashion brand: product collections, browsing, and an ordering flow through WhatsApp.',
    stack: [],
    role: 'Design & development',
    status: 'Live · Product',
    url: 'https://reubx.vercel.app',
    urlLabel: 'reubx.vercel.app',
    image: {
      src: '/work/reub.jpg',
      alt: 'ReubX World homepage with the headline “Elevate Your Every Step” and collection browsing',
      width: 1352,
      height: 657,
    },
  },
  {
    number: '04',
    name: 'Gilgal Dental Clinics',
    description:
      'Website redesign concept for a dental practice in Ikoyi, Lagos: premium visual system, appointment request flow, and a live frontend implementation.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    role: 'UX / UI / Frontend',
    status: 'Live · Design concept',
    url: 'https://gilgal-dental.vercel.app',
    urlLabel: 'gilgal-dental.vercel.app',
    image: {
      src: '/work/gilgal.jpg',
      alt: 'Gilgal Dental Clinics website redesign concept, service overview preview',
      width: 1363,
      height: 651,
    },
  },
];
