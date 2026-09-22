import React from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { OptimizedImage } from './ui/OptimizedImage';

const capabilities = [
  {
    id: 'software',
    label: 'SOFTWARE',
    title: 'Full-stack applications',
    desc: 'Production web applications, APIs, backend systems, databases, authentication, dashboards, and deployment. Built and shipped across healthcare, manufacturing, and technology contexts.',
    items: ['React / Next.js', 'Node.js / Express', 'TypeScript', 'PostgreSQL / Prisma', 'REST APIs', 'Cloud deployment'],
    color: '#0ea5e9',
    level: 'Core',
  },
  {
    id: 'ai',
    label: 'AI & INTELLIGENT SYSTEMS',
    title: 'AI-enabled software',
    desc: 'AI-integrated applications, intelligent workflows, generative AI tooling, and data-driven system architecture. Building toward intelligent industrial systems through Metabotics.',
    items: ['AI integration', 'Intelligent workflows', 'Generative AI', 'Data-driven architecture'],
    color: '#10b981',
    level: 'Working',
  },
  {
    id: 'automation',
    label: 'AUTOMATION',
    title: 'Workflow automation',
    desc: 'Process automation, integrations, automated pipelines, and infrastructure systems that reduce manual overhead and create reliable automated workflows.',
    items: ['Workflow systems', 'API integrations', 'Process automation', 'Infrastructure automation'],
    color: '#f59e0b',
    level: 'Working',
  },
  {
    id: 'web3',
    label: 'WEB3',
    title: 'Sui ecosystem',
    desc: 'Active in the Sui blockchain ecosystem — community leadership, education, and developer onboarding. Exploring Move language, smart contract concepts, and decentralized application architecture.',
    items: ['Sui', 'Move', 'Blockchain concepts', 'Web3 community'],
    color: '#a78bfa',
    level: 'Working',
  },
  {
    id: 'security',
    label: 'SECURITY',
    title: 'Security-minded engineering',
    desc: 'Security-first development practices, authentication systems, role-based access control, and active exploration of cybersecurity principles and secure-by-design software.',
    items: ['Secure development', 'Auth systems', 'RBAC', 'Security exploration'],
    color: '#f472b6',
    level: 'Exploring',
  },
  {
    id: 'engineering',
    label: 'ENGINEERING',
    title: 'Materials & metallurgical',
    desc: 'Formal academic engineering study at FUTA — materials science, metallurgy, thermal processes, manufacturing systems, and corrosion. The physical-world foundation that drives Metabotics.',
    items: ['Materials Science', 'Metallurgy', 'Thermal Processes', 'Manufacturing', 'Industrial Systems'],
    color: '#60b8f0',
    level: 'Academic',
  },
];

const levelColors: Record<string, string> = {
  Core: 'text-secondary',
  Working: 'text-primary',
  Exploring: 'text-accent',
  Academic: 'text-text-muted',
};

const mindsetPoints = [
  { label: 'Build before you over-explain.', desc: 'Working software teaches you things no amount of planning can.' },
  { label: 'Learn deeply enough to build.', desc: 'Surface knowledge produces surface work. Go deeper.' },
  { label: 'Make technology useful outside the screen.', desc: 'The physical world is full of problems software hasn\'t touched yet.' },
  { label: 'Leadership is creating room for others.', desc: 'The best technical leaders make the people around them better.' },
  { label: 'Africa should build its own infrastructure.', desc: 'Not just consume technology — shape the systems that shape the future.' },
];

export const Craft: React.FC = () => {
  return (
    <>
      {/* ── CRAFT ── */}
      <section
        id={SectionId.CRAFT}
        className="py-24 px-5 md:px-8 border-t border-border/40 bg-background"
        aria-labelledby="craft-heading"
      >
        <MotionWrapper className="max-w-6xl mx-auto">

          <div className="mb-14 reveal">
            <div className="mono-label mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-primary/50" />
              Craft
            </div>
            <h2
              id="craft-heading"
              className="text-3xl md:text-4xl font-bold text-text-main mb-3"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              What I build with.
            </h2>
            <p className="text-base text-text-muted max-w-xl">
              Capabilities organized by domain. Evidence level shown honestly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {capabilities.map((cap) => (
              <div
                key={cap.id}
                className="p-6 rounded-lg border border-border bg-surface/30 hover:bg-surface/60 hover:border-border transition-all duration-300 group relative overflow-hidden"
              >
                {/* Color accent at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${cap.color}60, transparent)` }}
                />

                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-1 rounded-sm"
                    style={{ background: `${cap.color}12`, color: cap.color, border: `1px solid ${cap.color}25` }}
                  >
                    {cap.label}
                  </div>
                  <span className={`text-[10px] font-mono font-semibold ${levelColors[cap.level]}`}>
                    {cap.level}
                  </span>
                </div>

                <h3
                  className="text-base font-bold text-text-main mb-2"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  {cap.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed mb-4">
                  {cap.desc}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {cap.items.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-background border border-border/60 text-text-dim"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MotionWrapper>
      </section>

      {/* ── MINDSET ── */}
      <section
        className="py-24 px-5 md:px-8 border-t border-border/40 bg-surface/10"
        aria-labelledby="mindset-heading"
      >
        <MotionWrapper className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left: philosophy */}
            <div className="lg:col-span-7">
              <div className="mono-label mb-4 flex items-center gap-2 reveal">
                <span className="w-4 h-px bg-primary/50" />
                Mindset
              </div>
              <h2
                id="mindset-heading"
                className="text-3xl md:text-4xl font-bold text-text-main mb-6 reveal"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                How I think about building.
              </h2>

              <p className="text-base text-text-muted leading-relaxed mb-8 reveal-left">
                I came to software through curiosity, not a career plan. The question that changed my direction was simple: what happens when you apply computational thinking to physical engineering problems? That question became Metabotics. It became the reason I study materials science while shipping production software.
              </p>

              <div className="space-y-5 stagger-children">
                {mindsetPoints.map((point) => (
                  <div key={point.label} className="flex gap-4 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0 group-hover:bg-primary transition-colors" />
                    <div>
                      <p className="text-sm font-semibold text-text-main mb-0.5" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                        {point.label}
                      </p>
                      <p className="text-xs text-text-muted leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: photo + location context */}
            <div className="lg:col-span-5 reveal-right">
              {/* Portrait */}
              <div className="relative rounded-lg overflow-hidden border border-border mb-6 aspect-[3/4] max-w-sm mx-auto lg:max-w-none">
                <OptimizedImage
                  src="/profile.jpg"
                  alt="Testimony Owolabi"
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, var(--color-surface) 0%, transparent 100%)' }}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-mono text-text-dim">Testimony Owolabi</p>
                  <p className="text-[10px] font-mono text-text-dim/60">Akure, Nigeria · FUTA</p>
                </div>
              </div>

              {/* Location context */}
              <div className="p-5 rounded-lg border border-border bg-surface/40">
                <div className="mono-label mb-4">Location & Context</div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-text-main" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                      Akure, Nigeria
                    </p>
                    <p className="text-xs text-text-dim font-mono">GMT+1</p>
                  </div>
                  <div className="border-t border-border/40 pt-3">
                    <p className="text-xs text-text-muted leading-relaxed">
                      Studying Metallurgical & Materials Engineering at the Federal University of Technology, Akure — while building software, leading communities, and developing Metabotics.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['FUTA', 'Nigeria', 'Sui Ecosystem', 'Engineering', 'Technology'].map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-background border border-border/60 text-text-dim">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </MotionWrapper>
      </section>
    </>
  );
};
