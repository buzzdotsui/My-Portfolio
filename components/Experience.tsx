import React from 'react';
import { MotionWrapper } from './ui/MotionWrapper';
import { SectionId, TimelineItem } from '../types';

const journeyData: TimelineItem[] = [
  {
    period: 'The Foundation',
    title: 'Early Curiosity',
    subtitle: 'Cisco Lab · Christ\'s School',
    description: 'Discovered technology — the moment computers stopped being black boxes and became systems I could understand. Hardware, networking, and how machines communicate. The curiosity started here.',
    tags: ['Curiosity', 'Networking', 'Hardware'],
  },
  {
    period: 'First Steps',
    title: 'Learning to Build',
    subtitle: 'Frontend Development',
    description: 'Transitioned from understanding systems to building them. Learned frontend development — HTML, CSS, JavaScript — and realized that software was a craft, not just a tool.',
    tags: ['Frontend', 'Web', 'JavaScript'],
  },
  {
    period: 'Academic Pursuit',
    title: 'Entering FUTA',
    subtitle: 'Materials & Metallurgical Engineering',
    description: 'Began formal engineering studies at the Federal University of Technology Akure. Confronted the physics and chemistry of the physical world: materials science, metallurgy, thermal processes, manufacturing.',
    tags: ['Engineering', 'Materials', 'FUTA'],
  },
  {
    period: 'Technical Expansion',
    title: 'Going Full-Stack',
    subtitle: 'Backend, APIs & Architecture',
    description: 'Became increasingly serious about software engineering. Moved beyond frontend into backend systems, databases, authentication, and full application architecture. Built real things for real problems.',
    tags: ['Full-Stack', 'Node.js', 'PostgreSQL', 'APIs'],
  },
  {
    period: 'Exploration',
    title: 'Web3 & Community Lead',
    subtitle: 'Sui On Campus · FUTA',
    description: 'Explored decentralized systems and blockchain technology. Joined Sui On Campus FUTA — eventually became Community Lead. Learned that building technology communities is its own form of infrastructure.',
    tags: ['Web3', 'Sui', 'Community', 'Leadership'],
  },
  {
    period: 'The Synthesis',
    title: 'Developing Metabotics',
    subtitle: 'Intelligent Industrial Systems',
    description: 'Asked the question that changed my direction: what if the same rigor of software engineering could be applied to industrial materials processes? Metabotics was born from that question. Still building.',
    tags: ['Metabotics', 'Industrial Tech', 'Vision'],
    highlight: true,
  },
];

export const Experience: React.FC = () => {
  return (
    <section id={SectionId.EXPERIENCE} className="py-24 px-5 md:px-8 border-t border-border/40 bg-background" aria-labelledby="experience-heading">
      <MotionWrapper className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-14 reveal">
          <div className="mono-label mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            Professional Experience
          </div>
          <h2 id="experience-heading" className="text-3xl md:text-4xl font-bold text-text-main mb-3" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            The Journey
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            How curiosity evolved into engineering — from a Cisco lab to building production software and founding Metabotics.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl">
          {journeyData.map((item, index) => (
            <div key={index} className="relative pl-10 pb-12 last:pb-0 reveal-scale group">
              {/* Vertical line */}
              {index !== journeyData.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gradient-to-b from-border to-transparent" />
              )}

              {/* Node */}
              <div
                className={`absolute left-0 top-1.5 w-6 h-6 rounded-sm border flex items-center justify-center z-10 transition-all duration-300
                  ${item.highlight
                    ? 'border-secondary/60 bg-secondary/10 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                    : 'border-border bg-background group-hover:border-primary/50'
                  }`}
              >
                <div className={`w-1.5 h-1.5 rounded-sm ${item.highlight ? 'bg-secondary animate-pulse' : 'bg-text-dim group-hover:bg-primary/70'} transition-colors`} />
              </div>

              {/* Content */}
              <div
                className={`rounded-lg border p-5 transition-all duration-300
                  ${item.highlight
                    ? 'border-secondary/30 bg-secondary/5'
                    : 'border-border bg-surface/30 group-hover:border-border group-hover:bg-surface/60'
                  }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-bold text-text-main" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                      {item.title}
                    </h3>
                    {item.highlight && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono bg-secondary/15 text-secondary uppercase tracking-wider border border-secondary/25 rounded-sm">
                        Current Focus
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-text-dim bg-background px-2 py-1 rounded-sm border border-border whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                <p className="text-xs font-mono text-primary mb-3">{item.subtitle}</p>

                <p className="text-sm text-text-muted leading-relaxed font-light mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-background border border-border/60 text-text-dim">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </MotionWrapper>
    </section>
  );
};
