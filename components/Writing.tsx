import React from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { ExternalLink, ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 'engineering-future',
    tag: 'Industrial Technology',
    date: '2024',
    title: 'Engineering the Future of Intelligent Industry in Africa',
    desc: 'On why Africa needs intelligent industrial infrastructure — and the role of software engineers in building it. The argument for Metabotics.',
    url: 'https://owolabitestimony.medium.com/engineering-the-future-of-intelligent-industry-in-africa-9984c5f2885f',
    verified: true,
  },
  {
    id: 'inside-metabotics',
    tag: 'Technical Architecture',
    date: '2024',
    title: 'Inside Metabotics: Engineering the Brain of Smart Factories',
    desc: 'A technical look at the architecture behind Metabotics — how intelligent industrial monitoring systems work, and how the Sense → Understand → Predict → Optimize pipeline maps to real systems.',
    url: 'https://owolabitestimony.medium.com/inside-metabotics-engineering-the-brain-of-smart-factories-2ad030054f79',
    verified: true,
  },
  {
    id: 'never-meant-average',
    tag: 'Personal Essay',
    date: '2024',
    title: 'I Was Never Meant to Be Average',
    desc: 'On identity, ambition, and what it means to build a life at the intersection of engineering, technology, and purpose. A personal essay.',
    url: 'https://owolabitestimony.medium.com/i-was-never-meant-to-be-average-e974007efee5',
    verified: true,
  },
];

const tagColors: Record<string, string> = {
  'Industrial Technology': '#0ea5e9',
  'Technical Architecture': '#10b981',
  'Personal Essay': '#f59e0b',
};

export const Writing: React.FC = () => {
  return (
    <section
      id={SectionId.WRITING}
      className="py-24 px-5 md:px-8 border-t border-border/40 bg-surface/10"
      aria-labelledby="writing-heading"
    >
      <MotionWrapper className="max-w-6xl mx-auto">

        <div className="mb-14 reveal">
          <div className="mono-label mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            Writing & Thinking
          </div>
          <h2
            id="writing-heading"
            className="text-3xl md:text-4xl font-bold text-text-main mb-3"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            On paper.
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            Three published essays. One technical, one strategic, one personal. All verified and linked directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger-children">
          {articles.map((article) => {
            const color = tagColors[article.tag] ?? '#0ea5e9';
            return (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-6 rounded-lg border border-border bg-surface/30 hover:bg-surface/60 hover:border-primary/30 transition-all duration-200 group relative overflow-hidden"
                aria-label={`Read: ${article.title}`}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
                />

                {/* Tag + external icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm"
                    style={{ color, background: `${color}12`, border: `1px solid ${color}25` }}
                  >
                    {article.tag}
                  </span>
                  <ExternalLink
                    size={13}
                    className="text-text-dim group-hover:text-primary transition-colors shrink-0"
                  />
                </div>

                <h3
                  className="text-sm font-bold text-text-main mb-3 leading-snug group-hover:text-primary transition-colors flex-grow"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  {article.title}
                </h3>

                <p className="text-xs text-text-muted leading-relaxed mb-4">
                  {article.desc}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-mono text-text-dim group-hover:text-primary transition-colors mt-auto">
                  Read on Medium <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Profile link */}
        <div className="mt-8 flex items-center gap-3 reveal">
          <a
            href="https://medium.com/@owolabitestimony"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-text-muted hover:text-primary transition-colors"
          >
            <ExternalLink size={13} /> View Medium profile
          </a>
        </div>

      </MotionWrapper>
    </section>
  );
};
