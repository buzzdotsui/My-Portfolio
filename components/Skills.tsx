import React from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { Terminal, Cpu, Zap, Globe, Shield, FlaskConical } from 'lucide-react';

const skillGroups = [
  {
    id: 'software',
    title: 'Software Engineering',
    icon: Terminal,
    color: '#0ea5e9',
    skills: [
      { name: 'TypeScript / JavaScript', level: 'Core' },
      { name: 'React / Next.js', level: 'Core' },
      { name: 'Node.js / Express', level: 'Core' },
      { name: 'PostgreSQL', level: 'Core' },
      { name: 'Prisma ORM', level: 'Core' },
      { name: 'REST API Design', level: 'Core' },
      { name: 'Authentication & RBAC', level: 'Core' },
      { name: 'Full-Stack Architecture', level: 'Core' },
      { name: 'Cloud Deployment (Vercel, CF)', level: 'Working' },
      { name: 'Git / GitHub', level: 'Core' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Intelligent Systems',
    icon: Cpu,
    color: '#10b981',
    note: 'Working knowledge + active R&D',
    skills: [
      { name: 'AI-integrated applications', level: 'Working' },
      { name: 'Generative AI tooling', level: 'Working' },
      { name: 'Intelligent workflow design', level: 'Working' },
      { name: 'Data-driven architecture', level: 'Working' },
      { name: 'Industrial monitoring systems', level: 'Exploring' },
      { name: 'Predictive analytics', level: 'Exploring' },
      { name: 'Edge computing concepts', level: 'Exploring' },
    ],
  },
  {
    id: 'automation',
    title: 'Automation & Systems',
    icon: Zap,
    color: '#f59e0b',
    skills: [
      { name: 'Workflow automation', level: 'Working' },
      { name: 'API integrations', level: 'Core' },
      { name: 'Process automation', level: 'Working' },
      { name: 'CI/CD concepts', level: 'Working' },
      { name: 'Infrastructure automation', level: 'Exploring' },
    ],
  },
  {
    id: 'web3',
    title: 'Web3',
    icon: Globe,
    color: '#a78bfa',
    note: 'Active ecosystem participation',
    skills: [
      { name: 'Sui Ecosystem', level: 'Working' },
      { name: 'Move Language', level: 'Exploring' },
      { name: 'Blockchain concepts', level: 'Working' },
      { name: 'Smart contract concepts', level: 'Exploring' },
      { name: 'Web3 community building', level: 'Core' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    color: '#f472b6',
    note: 'Security-first development + active learning',
    skills: [
      { name: 'Secure development practices', level: 'Working' },
      { name: 'Auth system design (JWT/RBAC)', level: 'Core' },
      { name: 'Cybersecurity fundamentals', level: 'Working' },
      { name: 'Security-minded architecture', level: 'Working' },
      { name: 'Penetration testing concepts', level: 'Exploring' },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    icon: FlaskConical,
    color: '#60b8f0',
    note: 'Formal academic study — FUTA',
    skills: [
      { name: 'Materials Science', level: 'Working' },
      { name: 'Metallurgy', level: 'Working' },
      { name: 'Thermal Processing', level: 'Working' },
      { name: 'Manufacturing Systems', level: 'Working' },
      { name: 'Corrosion Analysis', level: 'Working' },
      { name: 'Industrial Systems', level: 'Working' },
    ],
  },
];

const levelStyle: Record<string, { color: string; bg: string; border: string }> = {
  Core:      { color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.25)' },
  Working:   { color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)',  border: 'rgba(14,165,233,0.25)' },
  Exploring: { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
};

export const Skills: React.FC = () => {
  return (
    <section
      id={SectionId.SKILLS}
      className="py-24 px-5 md:px-8 border-t border-border/40 bg-background"
      aria-labelledby="skills-heading"
    >
      <MotionWrapper className="max-w-6xl mx-auto">

        <div className="mb-14 reveal">
          <div className="mono-label mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            Technical Skills
          </div>
          <h2
            id="skills-heading"
            className="text-3xl md:text-4xl font-bold text-text-main mb-3"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Skills & Capabilities
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            Organized by domain. Evidence level reflects actual depth — not aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="p-6 rounded-lg border border-border bg-surface/30 hover:bg-surface/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${group.color}50, transparent)` }}
              />

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ background: `${group.color}12`, border: `1px solid ${group.color}25` }}
                >
                  <group.icon size={16} style={{ color: group.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-main uppercase tracking-wide">
                    {group.title}
                  </h3>
                  {group.note && (
                    <p className="text-[10px] font-mono text-text-dim">{group.note}</p>
                  )}
                </div>
              </div>

              {/* Skills list */}
              <ul className="space-y-2">
                {group.skills.map((skill) => {
                  const style = levelStyle[skill.level];
                  return (
                    <li key={skill.name} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-text-muted font-mono">{skill.name}</span>
                      <span
                        className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-sm shrink-0"
                        style={{ color: style.color, background: style.bg, border: `1px solid ${style.border}` }}
                      >
                        {skill.level}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 p-5 rounded-lg border border-border/40 bg-transparent reveal">
          <div className="flex flex-wrap gap-6">
            {Object.entries(levelStyle).map(([level, style]) => (
              <div key={level} className="flex items-center gap-2">
                <span
                  className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-sm"
                  style={{ color: style.color, background: style.bg, border: `1px solid ${style.border}` }}
                >
                  {level}
                </span>
                <span className="text-xs text-text-dim font-mono">
                  {level === 'Core' && '— primary expertise, used in production'}
                  {level === 'Working' && '— applied knowledge, actively using'}
                  {level === 'Exploring' && '— learning, experimenting, R&D'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </MotionWrapper>
    </section>
  );
};