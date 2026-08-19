import React from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { Users, GraduationCap, Radio } from 'lucide-react';

const leadershipRoles = [
  {
    role: 'Community Lead',
    org: 'Sui On Campus · FUTA',
    icon: Users,
    color: '#0ea5e9',
    desc: 'Leading the adoption and education of Sui blockchain technology at FUTA. Organizing technical workshops, onboarding developers, and building a community of builders in Akure.',
  },
  {
    role: 'Engineering Representation',
    org: 'Federal University of Technology Akure',
    icon: GraduationCap,
    color: '#10b981',
    desc: 'Advocating for students within the engineering faculty — facilitating communication between students and faculty, and organizing academic support structures.',
  },
  {
    role: 'Technical Education',
    org: 'Community Building',
    icon: Radio,
    color: '#f59e0b',
    desc: 'Mentoring junior developers, hosting technical sessions on software engineering best practices, and contributing to the growth of the local tech ecosystem.',
  },
];

export const Leadership: React.FC = () => {
  return (
    <section id={SectionId.LEADERSHIP} className="py-24 px-5 md:px-8 border-t border-border/40 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-secondary/4 rounded-full blur-[120px] pointer-events-none" />

      <MotionWrapper className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12 reveal">
          <div className="mono-label mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            06 — Leadership & Community
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-3" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            Building Communities Around Technology
          </h2>
          <p className="text-sm text-text-muted max-w-xl">
            I don't only build software. I also build communities around technology — organizing people, facilitating learning, and cultivating local ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
          {leadershipRoles.map((item) => (
            <div
              key={item.role}
              className="p-5 rounded-lg border border-border bg-surface/30 hover:border-primary/25 hover:bg-surface/60 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-40"
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
              />

              <div
                className="w-9 h-9 rounded flex items-center justify-center mb-4 border"
                style={{ background: `${item.color}12`, borderColor: `${item.color}25` }}
              >
                <item.icon size={16} style={{ color: item.color }} />
              </div>

              <h3 className="text-sm font-bold text-text-main mb-1" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                {item.role}
              </h3>
              <p className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-4">{item.org}</p>
              <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </MotionWrapper>
    </section>
  );
};
