import React from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { Hammer, BookOpen, Users, Compass } from 'lucide-react';

const nowItems = [
  {
    category: 'Building',
    icon: Hammer,
    color: '#0ea5e9',
    items: [
      'Metabotics — foundational data infrastructure and sensor integration architecture',
      'Production software systems for client projects',
      'Personal technical tooling and automation workflows',
    ],
  },
  {
    category: 'Learning',
    icon: BookOpen,
    color: '#10b981',
    items: [
      'Deepening materials engineering and metallurgy through FUTA coursework',
      'Cybersecurity principles and secure system design',
      'Industrial IoT patterns and data acquisition systems',
    ],
  },
  {
    category: 'Leading',
    icon: Users,
    color: '#f59e0b',
    items: [
      'Sui On Campus FUTA — community building and developer education',
      'Organizing technical workshops and onboarding sessions',
      'Supporting junior developers in the local ecosystem',
    ],
  },
  {
    category: 'Exploring',
    icon: Compass,
    color: '#a78bfa',
    items: [
      'Move language and Sui smart contract development',
      'Edge computing and embedded systems for industrial monitoring',
      'Predictive analytics frameworks for process data',
    ],
  },
];

export const Now: React.FC = () => {
  return (
    <section
      id={SectionId.NOW}
      className="py-24 px-5 md:px-8 border-t border-border/40 bg-background"
      aria-labelledby="now-heading"
    >
      <MotionWrapper className="max-w-6xl mx-auto">

        <div className="mb-14 reveal">
          <div className="mono-label mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            Now
          </div>
          <h2
            id="now-heading"
            className="text-3xl md:text-4xl font-bold text-text-main mb-3"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            What I'm doing right now.
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            A snapshot of active work and focus areas. Updated as things change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
          {nowItems.map((item) => (
            <div
              key={item.category}
              className="p-6 rounded-lg border border-border bg-surface/30 hover:bg-surface/50 transition-all duration-200 group relative overflow-hidden"
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}50, transparent)` }}
              />

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}
                >
                  <item.icon size={16} style={{ color: item.color }} />
                </div>
                <h3
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: item.color, fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  {item.category}
                </h3>
              </div>

              {/* Items */}
              <ul className="space-y-2.5">
                {item.items.map((entry, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-text-muted leading-relaxed">
                    <span className="shrink-0 mt-1" style={{ color: item.color }}>›</span>
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[11px] font-mono text-text-dim reveal">
          Last review: September 2026. Inspired by <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors underline underline-offset-2">nownownow.com</a>
        </p>

      </MotionWrapper>
    </section>
  );
};
