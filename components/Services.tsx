import React from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { Monitor, Server, Bot, Globe, ShieldCheck, Lightbulb } from 'lucide-react';

const services = [
  {
    id: 'web-apps',
    icon: Monitor,
    title: 'Websites & Web Applications',
    desc: 'Fast, responsive, production-ready web applications built with modern tooling. From marketing sites to complex multi-user platforms. Full lifecycle — design thinking through deployment.',
    items: ['React / Next.js applications', 'Responsive, accessible UI', 'SEO-optimized', 'Full Vercel/Cloudflare deployment'],
    color: '#0ea5e9',
  },
  {
    id: 'software-systems',
    icon: Server,
    title: 'Software Systems',
    desc: 'Backend-heavy systems with complex data models, authentication, and role-based access. Healthcare HMS, client portals, inventory systems. Real software that solves real operational problems.',
    items: ['REST APIs and backends', 'Database design (PostgreSQL)', 'Role-based access control', 'Multi-user, authenticated systems'],
    color: '#10b981',
  },
  {
    id: 'ai-automation',
    icon: Bot,
    title: 'AI & Automation',
    desc: 'AI-integrated workflows, intelligent process automation, and data-driven tooling. I build systems that reduce manual overhead and surface the information that matters.',
    items: ['AI-enabled workflows', 'Generative AI integration', 'Automated data pipelines', 'Intelligent monitoring'],
    color: '#f59e0b',
  },
  {
    id: 'web3',
    icon: Globe,
    title: 'Web3 Development',
    desc: 'Sui ecosystem development, dApp concepts, and blockchain-adjacent tooling. Community-tested understanding of the Sui/Move environment through leading Sui On Campus FUTA.',
    items: ['Sui ecosystem development', 'Move concepts', 'dApp architecture', 'Web3 community tooling'],
    color: '#a78bfa',
  },
  {
    id: 'tech-product',
    icon: ShieldCheck,
    title: 'Technical Product Development',
    desc: 'Taking a product from idea through architecture, implementation, and deployment. Especially for technical founders or organisations that need a builder, not just a developer.',
    items: ['Product architecture', 'Technical co-founder capacity', 'MVP through V1 and beyond', 'Industrial/engineering contexts'],
    color: '#f472b6',
  },
  {
    id: 'prototyping',
    icon: Lightbulb,
    title: 'Prototyping & Experiments',
    desc: 'Fast prototypes that answer real questions. Proof-of-concept builds for novel technical ideas — particularly at the intersection of software and physical engineering systems.',
    items: ['Technical proof of concepts', 'Engineering/software intersections', 'Industrial monitoring concepts', 'Rapid iteration'],
    color: '#60b8f0',
  },
];

export const Services: React.FC = () => {
  return (
    <section
      id={SectionId.SERVICES}
      className="py-24 px-5 md:px-8 border-t border-border/40 bg-surface/10"
      aria-labelledby="services-heading"
    >
      <MotionWrapper className="max-w-6xl mx-auto">

        <div className="mb-14 reveal">
          <div className="mono-label mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            Services
          </div>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-bold text-text-main mb-3"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            What I Can Build
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            What you can bring to me. Every area listed is grounded in actual delivered work or deep active exploration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-lg border border-border bg-surface/30 hover:bg-surface/60 hover:border-border transition-all duration-300 group relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${service.color}50, transparent)` }}
              />

              <div
                className="w-10 h-10 rounded flex items-center justify-center mb-4"
                style={{ background: `${service.color}12`, border: `1px solid ${service.color}25` }}
              >
                <service.icon size={18} style={{ color: service.color }} />
              </div>

              <h3
                className="text-base font-bold text-text-main mb-2 group-hover:text-text-main"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                {service.title}
              </h3>

              <p className="text-xs text-text-muted leading-relaxed mb-4">
                {service.desc}
              </p>

              <ul className="space-y-1.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px] font-mono text-text-dim">
                    <span style={{ color: service.color }} className="mt-0.5 shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-lg border border-border bg-surface/30 text-center reveal">
          <h3
            className="text-xl font-bold text-text-main mb-2"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Have something to build?
          </h3>
          <p className="text-sm text-text-muted mb-6 max-w-md mx-auto">
            Tell me what you're working on. I'll tell you whether I can help and how.
          </p>
          <a
            href={`#${SectionId.CONTACT}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded hover:bg-primary-hover transition-all hover:shadow-glow-sm"
          >
            Get in touch
          </a>
        </div>

      </MotionWrapper>
    </section>
  );
};
