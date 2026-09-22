import React, { useState } from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { ExternalLink } from 'lucide-react';

type FilterCategory = 'All' | 'Software' | 'AI' | 'Automation' | 'Web3' | 'Security' | 'Engineering' | 'Academic' | 'Experiments' | 'Community';

const filters: FilterCategory[] = ['All', 'Software', 'AI', 'Automation', 'Web3', 'Security', 'Engineering', 'Academic', 'Experiments', 'Community'];

interface WorkEntry {
  title: string;
  category: FilterCategory;
  description: string;
  status: string;
  statusColor: string;
  tags: string[];
  liveUrl?: string;
}

const workEntries: WorkEntry[] = [
  {
    title: 'Accurate Medical Center HMS',
    category: 'Software',
    description: 'Full-stack hospital management system — patient records, role-based access, appointments, clinical workflows. Live in production.',
    status: 'LIVE',
    statusColor: '#10b981',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://accurate-medical.vercel.app/',
  },
  {
    title: 'Juphil Aluminum Platform',
    category: 'Software',
    description: 'Digital platform for a Nigerian aluminum manufacturing company. Responsive, performant, deployed.',
    status: 'LIVE',
    statusColor: '#10b981',
    tags: ['React', 'Next.js', 'TailwindCSS'],
    liveUrl: 'https://juphil.vercel.app/',
  },
  {
    title: 'Metabotics',
    category: 'AI',
    description: 'Technology initiative developing intelligent monitoring and automation systems for industrial processes. Sense → Understand → Predict → Optimize.',
    status: 'RESEARCH',
    statusColor: '#f59e0b',
    tags: ['Systems Design', 'Industrial IoT', 'Automation'],
    liveUrl: 'https://metabotics.vercel.app/',
  },
  {
    title: 'Metabotics — Automation Architecture',
    category: 'Automation',
    description: 'Designing automation and feedback loop architecture for industrial process control within Metabotics.',
    status: 'EXPLORING',
    statusColor: '#f59e0b',
    tags: ['Automation', 'Systems Design', 'Data Infrastructure'],
  },
  {
    title: 'Sui On Campus FUTA',
    category: 'Community',
    description: 'Community Lead for Sui On Campus at FUTA — organizing workshops, developer onboarding, technical education, and ecosystem growth.',
    status: 'ACTIVE',
    statusColor: '#a78bfa',
    tags: ['Sui', 'Community', 'Leadership', 'Education'],
    liveUrl: 'https://x.com/_buzzdotsui',
  },
  {
    title: 'Web3 Ecosystem Exploration — Sui / Move',
    category: 'Web3',
    description: 'Active participation in the Sui blockchain ecosystem. Exploring Move language, smart contract concepts, and decentralized application architecture.',
    status: 'EXPLORING',
    statusColor: '#a78bfa',
    tags: ['Sui', 'Move', 'Blockchain'],
  },
  {
    title: 'Cybersecurity Fundamentals',
    category: 'Security',
    description: 'Active study of cybersecurity principles, secure development practices, and security-first software design. Applying to all production work.',
    status: 'LEARNING',
    statusColor: '#f472b6',
    tags: ['Security', 'Secure Development'],
  },
  {
    title: 'B.Eng. Metallurgical & Materials Engineering',
    category: 'Engineering',
    description: 'Formal engineering study at the Federal University of Technology Akure. Materials science, metallurgy, thermal processes, manufacturing, corrosion.',
    status: 'ONGOING',
    statusColor: '#60b8f0',
    tags: ['FUTA', 'Materials Science', 'Metallurgy', 'Engineering'],
  },
  {
    title: 'Writing — Engineering & Technology',
    category: 'Academic',
    description: 'Published essays on intelligent industrial systems, Metabotics architecture, and personal philosophy. Published on Medium.',
    status: 'PUBLISHED',
    statusColor: '#10b981',
    tags: ['Writing', 'Industrial Tech', 'Personal'],
    liveUrl: 'https://medium.com/@owolabitestimony',
  },
];

export const WorkIndex: React.FC = () => {
  const [active, setActive] = useState<FilterCategory>('All');

  const filtered = active === 'All' ? workEntries : workEntries.filter((w) => w.category === active);

  return (
    <section
      id={SectionId.WORK}
      className="py-24 px-5 md:px-8 border-t border-border/40 bg-surface/10"
      aria-labelledby="work-index-heading"
    >
      <MotionWrapper className="max-w-6xl mx-auto">

        <div className="mb-12 reveal">
          <div className="mono-label mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            All Work
          </div>
          <h2
            id="work-index-heading"
            className="text-2xl md:text-3xl font-bold text-text-main mb-3"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Complete Work Index
          </h2>
          <p className="text-sm text-text-muted max-w-xl">
            Every meaningful project, initiative, and area of work. Filter by domain.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8 reveal" role="group" aria-label="Filter work by category">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`text-[11px] font-mono px-3 py-1.5 rounded-sm border transition-all ${
                active === f
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-text-dim hover:border-border hover:text-text-muted bg-background'
              }`}
              aria-pressed={active === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Work list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children" role="list">
          {filtered.map((entry) => (
            <div
              key={entry.title}
              role="listitem"
              className="p-5 rounded-lg border border-border bg-surface/30 hover:bg-surface/60 hover:border-border transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[9px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-sm"
                    style={{ background: `${entry.statusColor}15`, color: entry.statusColor, border: `1px solid ${entry.statusColor}25` }}
                  >
                    {entry.status}
                  </span>
                  <span className="text-[9px] font-mono text-text-dim uppercase tracking-wider">{entry.category}</span>
                </div>
                {entry.liveUrl && (
                  <a
                    href={entry.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-dim hover:text-primary transition-colors shrink-0"
                    aria-label={`Visit ${entry.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>

              <h3
                className="text-sm font-bold text-text-main mb-2 group-hover:text-primary transition-colors"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                {entry.title}
              </h3>

              <p className="text-xs text-text-muted leading-relaxed mb-3">{entry.description}</p>

              <div className="flex flex-wrap gap-1">
                {entry.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-background border border-border/50 text-text-dim">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-dim font-mono text-sm">
            No work entries in this category yet.
          </div>
        )}

      </MotionWrapper>
    </section>
  );
};
