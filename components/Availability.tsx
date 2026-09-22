import React from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { ArrowRight, FileText, CheckCircle } from 'lucide-react';

const opportunities = [
  {
    label: 'Software Engineering Roles',
    desc: 'Full-stack or backend-focused positions. Production environments. Real engineering challenges.',
    open: true,
  },
  {
    label: 'AI & Automation Projects',
    desc: 'AI-integrated systems, intelligent workflows, and automation infrastructure.',
    open: true,
  },
  {
    label: 'Web3 Opportunities',
    desc: 'Sui ecosystem development, dApp work, and blockchain-adjacent technical roles.',
    open: true,
  },
  {
    label: 'Selected Client Work',
    desc: 'Technical web platforms, software systems, and product builds with real scope.',
    open: true,
  },
  {
    label: 'Technical Collaborations',
    desc: 'Side projects, co-founder conversations, and serious technical partnerships.',
    open: true,
  },
  {
    label: 'Research & Engineering Collaborations',
    desc: 'Industrial systems, materials technology, and physical-world computing initiatives.',
    open: true,
  },
];

export const Availability: React.FC = () => {
  return (
    <section
      id={SectionId.AVAILABILITY}
      className="py-24 px-5 md:px-8 border-t border-border/40 bg-background"
      aria-labelledby="availability-heading"
    >
      <MotionWrapper className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: heading + status */}
          <div className="lg:col-span-5">
            <div className="mono-label mb-4 flex items-center gap-2 reveal">
              <span className="w-4 h-px bg-primary/50" />
              Availability
            </div>
            <h2
              id="availability-heading"
              className="text-3xl md:text-4xl font-bold text-text-main mb-4 reveal"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              Open for the right work.
            </h2>
            <p className="text-base text-text-muted leading-relaxed mb-8 reveal">
              I'm available to collaborate on meaningful technical projects, engineering work, and software opportunities. If what you're building is interesting, I want to hear about it.
            </p>

            {/* Status badge */}
            <div className="flex items-center gap-3 p-4 rounded-lg border border-secondary/25 bg-secondary/5 mb-8 reveal">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
              </span>
              <div>
                <p className="text-sm font-bold text-secondary">Currently available</p>
                <p className="text-xs text-text-dim font-mono">Akure, Nigeria · GMT+1 · Open to remote</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 reveal">
              <a
                href={`#${SectionId.CONTACT}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded hover:bg-primary-hover transition-all hover:shadow-glow-sm group"
              >
                Get in touch
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/CV/Testimony_Owolabi_Claude_Campus_Ambassador_Resume-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-text-muted text-sm font-medium rounded hover:border-primary/40 hover:text-text-main transition-all"
              >
                <FileText size={14} /> Download CV
              </a>
            </div>
          </div>

          {/* Right: opportunity list */}
          <div className="lg:col-span-7">
            <div className="mono-label mb-6 reveal">Open To</div>
            <div className="space-y-3 stagger-children">
              {opportunities.map((opp) => (
                <div
                  key={opp.label}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border bg-surface/30 hover:bg-surface/60 hover:border-border transition-all duration-200 group"
                >
                  <CheckCircle
                    size={16}
                    className="text-secondary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3
                      className="text-sm font-bold text-text-main mb-0.5 group-hover:text-primary transition-colors"
                      style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                    >
                      {opp.label}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">{opp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </MotionWrapper>
    </section>
  );
};
