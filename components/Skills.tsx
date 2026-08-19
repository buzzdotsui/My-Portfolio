import React from 'react';
import { SectionId, SkillCategory } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { Terminal, Cpu, FlaskConical, Layers } from 'lucide-react';

const skillCategories: SkillCategory[] = [
  {
    title: 'Software Engineering',
    icon: Terminal,
    skills: [
      'TypeScript / JavaScript',
      'React / Next.js',
      'Node.js / Express',
      'PostgreSQL',
      'Prisma ORM',
      'Full-Stack Architecture',
      'REST APIs',
      'Authentication & Auth Systems',
      'Cloud Deployment',
      'Git / GitHub',
    ],
  },
  {
    title: 'Intelligent Systems',
    icon: Cpu,
    note: 'Exploration & R&D — not claimed mastery',
    skills: [
      'Automation Systems',
      'Data-Driven Architectures',
      'AI / ML Exploration',
      'Industrial Monitoring',
      'Edge Computing Concepts',
      'Sensor Systems',
      'Predictive Analytics',
    ],
  },
  {
    title: 'Engineering',
    icon: FlaskConical,
    note: 'Formal academic study — FUTA',
    skills: [
      'Materials Science',
      'Metallurgy',
      'Materials Processing',
      'Heat Treatment',
      'Manufacturing Systems',
      'Corrosion Analysis',
      'Industrial Systems',
    ],
  },
  {
    title: 'Additional Experience',
    icon: Layers,
    note: 'Secondary capabilities',
    skills: [
      'Sui / Move (Web3)',
      'Blockchain Concepts',
      'Cybersecurity Fundamentals',
      'DevSecOps',
      'CI/CD Automation',
      'Community Building',
      'Technical Leadership',
    ],
  },
];

const categoryColors = [
  { border: 'border-primary/20', bg: 'bg-primary/5', icon: 'text-primary', dot: '#0ea5e9' },
  { border: 'border-secondary/20', bg: 'bg-secondary/5', icon: 'text-secondary', dot: '#10b981' },
  { border: 'border-accent/20', bg: 'bg-accent/5', icon: 'text-accent', dot: '#f59e0b' },
  { border: 'border-border', bg: 'bg-surface/30', icon: 'text-text-dim', dot: '#4a6070' },
];

export const Skills: React.FC = () => {
  return (
    <section id={SectionId.SKILLS} className="py-28 px-5 md:px-8 border-t border-border/40 relative overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 bg-surface/20 pointer-events-none" />

      <MotionWrapper className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-14 reveal">
          <div className="mono-label mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            04 — Technical Competencies
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-3" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            Skills &amp; Capabilities
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            Organized into meaningful domains, not just a flat list of technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
          {skillCategories.map((category, idx) => {
            const colors = categoryColors[idx];
            return (
              <div
                key={category.title}
                className={`rounded-lg border ${colors.border} ${colors.bg} p-6 relative overflow-hidden group hover:shadow-card transition-all duration-300`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center border ${colors.border} bg-background`}>
                      <category.icon size={16} className={colors.icon} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text-main uppercase tracking-wide">{category.title}</h3>
                      {category.note && (
                        <p className="text-[10px] font-mono text-text-dim mt-0.5">{category.note}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-text-dim">{category.skills.length} items</span>
                </div>

                {/* Skills list */}
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5 text-xs text-text-muted font-mono group/item hover:text-text-main transition-colors cursor-default">
                      <span
                        className="w-1 h-1 rounded-full shrink-0 opacity-50 group-hover/item:opacity-100 transition-opacity"
                        style={{ background: colors.dot }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>

                {/* Decorative corner */}
                <div className={`absolute bottom-0 right-0 w-12 h-12 opacity-5 pointer-events-none flex items-end justify-end pb-2 pr-2`}>
                  <category.icon size={32} className={colors.icon} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Philosophy note */}
        <div className="mt-10 p-5 rounded-lg border border-border/40 bg-transparent reveal">
          <p className="text-xs text-text-dim font-mono leading-relaxed">
            <span className="text-text-muted font-medium">Note:</span> Skills listed under "Intelligent Systems" are areas of active exploration and R&amp;D — they represent learning trajectories, not claimed professional mastery. All engineering skills reflect formal academic study at FUTA.
          </p>
        </div>

      </MotionWrapper>
    </section>
  );
};