import React from 'react';
import { SectionId, WritingPost } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { ExternalLink, ArrowRight } from 'lucide-react';

const writings: WritingPost[] = [
  {
    title: 'Engineering the Future of Intelligent Industry in Africa',
    url: 'https://owolabitestimony.medium.com/engineering-the-future-of-intelligent-industry-in-africa-9984c5f2885f',
    desc: 'Industrial progress has always been driven by people who look at existing systems and ask a simple question: Can this be done better? A look at what it means to build intelligent industrial systems in an African context.',
    tag: 'Industrial Technology',
    date: '2024',
    verified: true,
  },
  {
    title: 'Inside Metabotics: Engineering the Brain of Smart Factories',
    url: 'https://owolabitestimony.medium.com/inside-metabotics-engineering-the-brain-of-smart-factories-2ad030054f79',
    desc: 'Metabotics designs intelligent monitoring and automation systems that transform industrial processes into self-optimizing, data-driven assets. An inside view of the architecture and thinking.',
    tag: 'Metabotics',
    date: '2024',
    verified: true,
  },
  {
    title: 'I Was Never Meant to Be Average',
    url: 'https://owolabitestimony.medium.com/i-was-never-meant-to-be-average-e974007efee5',
    desc: 'A personal essay on choosing to build at the intersection of software, engineering, and industry — and what it costs to resist the path of least resistance.',
    tag: 'Personal',
    date: '2024',
    verified: true,
  },
];


const tagColors: Record<string, string> = {
  'Industrial Technology': 'rgba(14,165,233,0.12)',
  'Metabotics': 'rgba(16,185,129,0.12)',
  'Software Engineering': 'rgba(245,158,11,0.12)',
  'Security': 'rgba(167,139,250,0.12)',
  'Personal': 'rgba(244,114,182,0.12)',
};

const tagTextColors: Record<string, string> = {
  'Industrial Technology': '#0ea5e9',
  'Metabotics': '#10b981',
  'Software Engineering': '#f59e0b',
  'Security': '#a78bfa',
  'Personal': '#f472b6',
};

export const Writing: React.FC = () => {
  return (
    <section id={SectionId.WRITING} className="py-28 px-5 md:px-8 border-t border-border/40 bg-background">
      <MotionWrapper className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 reveal">
          <div>
            <div className="mono-label mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-primary/50" />
              05 — Writing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-3" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
              Ideas &amp; Essays
            </h2>
            <p className="text-base text-text-muted max-w-xl">
              Technical and personal writing on intelligent industry, software, and engineering published on Medium.
            </p>
          </div>

          <a
            href="https://medium.com/@owolabitestimony"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors group shrink-0"
          >
            All articles on Medium
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
          {writings.map((post) => (
            <a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-lg border border-border bg-surface/40 hover:bg-surface hover:border-primary/30 transition-all duration-300 signal-card"
            >
              {/* Tag + external link */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span
                  className="text-[10px] font-mono px-2 py-1 rounded-sm font-semibold tracking-wider uppercase"
                  style={{
                    background: tagColors[post.tag] || 'rgba(14,165,233,0.08)',
                    color: tagTextColors[post.tag] || '#0ea5e9',
                  }}
                >
                  {post.tag}
                </span>
                <ExternalLink size={14} className="text-text-dim group-hover:text-primary transition-colors shrink-0" />
              </div>

              <h3 className="text-base font-bold text-text-main group-hover:text-primary transition-colors mb-3 leading-snug" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                {post.title}
              </h3>

              <p className="text-sm text-text-muted leading-relaxed font-light mb-6">
                {post.desc}
              </p>

              <div className="flex items-center justify-between border-t border-border/40 pt-4">
                <span className="text-[11px] font-mono text-text-dim">
                  {post.date ? `Published ${post.date}` : 'Article'}
                </span>
                <span className="text-[11px] font-bold font-mono text-text-dim group-hover:text-primary flex items-center gap-1 transition-colors">
                  Read article <ArrowRight size={11} />
                </span>
              </div>
            </a>
          ))}
        </div>

      </MotionWrapper>
    </section>
  );
};
