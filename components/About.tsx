import React from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { Cpu, Combine, Zap, Award } from 'lucide-react';
import { OptimizedImage } from './ui/OptimizedImage';

// ──────────────────────────────────────────────────────────
// Verified certifications — real files in /public/certifications
// ──────────────────────────────────────────────────────────
const certifications = [
  {
    title: 'Advancing Black Leadership',
    file: '/certifications/Advancing Black leadership.jpeg',
    issuer: 'Claude Campus Ambassador Program',
    relevance: 'Leadership, community building, and representation in technology.',
  },
  {
    title: 'Introducing Black Leadership',
    file: '/certifications/Introducing Black leadership.jpeg',
    issuer: 'Claude Campus Ambassador Program',
    relevance: 'Foundation module on leadership principles and community impact.',
  },
  {
    title: 'Mathematics for Science and Technology',
    file: '/certifications/Mathematics for science and technology.jpeg',
    issuer: 'Continuing Professional Development',
    relevance: 'Quantitative methods applied to science and engineering disciplines.',
  },
];

export const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-28 px-5 md:px-8 relative overflow-hidden border-t border-border/40">
      {/* Subtle gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />

      <MotionWrapper className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

          {/* ── LEFT: Narrative ── */}
          <div className="lg:col-span-7">
            {/* Section label */}
            <div className="mono-label mb-5 flex items-center gap-2 reveal">
              <span className="w-4 h-px bg-primary/50" />
              01 — About
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-8 leading-tight reveal" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
              Engineering across<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #60b8f0 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                two worlds.
              </span>
            </h2>

            <div className="space-y-5 text-text-muted leading-relaxed reveal-left">
              <p>
                I started with technology out of curiosity, became a software builder, and eventually found myself asking how the same computational systems could be applied to the physical processes that shape the world around us.
              </p>

              <div className="border-l-2 border-primary/35 pl-5 py-1">
                <p className="text-text-main font-medium">
                  This intersection is where I want to build.
                </p>
              </div>

              <p>
                As a Materials and Metallurgical Engineering student at the Federal University of Technology Akure, I study the physical constraints and behaviours that govern real industrial systems — materials science, thermal processes, manufacturing, metallurgy, and corrosion.
              </p>

              <p>
                As a full-stack software engineer, I build applications, APIs, automation systems, and data infrastructure. I understand how software can be structured to handle complexity at scale.
              </p>

              <p>
                The question I keep returning to: what happens when you apply the rigour of software engineering to physical engineering problems? I don't just want to consume technology. I want to build infrastructure that others can build on.
              </p>
            </div>

            {/* Traits */}
            <div className="mt-10 grid grid-cols-2 gap-3 reveal">
              {[
                'Curious by default',
                'Builds to understand',
                'Combines disciplines',
                'Thinks in systems',
                "Cares about Africa's industrial future",
                'Builds infrastructure, not just features',
              ].map((trait) => (
                <div key={trait} className="flex items-start gap-2 text-xs text-text-muted font-mono">
                  <span className="text-primary/50 mt-0.5">›</span>
                  {trait}
                </div>
              ))}
            </div>

            {/* ── Certifications ── */}
            <div className="mt-14 reveal">
              <div className="mono-label mb-6 flex items-center gap-2">
                <Award size={12} className="text-primary/60" />
                Certifications
              </div>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="group flex gap-4 p-4 rounded-lg border border-border bg-surface/30 hover:border-primary/25 hover:bg-surface/60 transition-all duration-300"
                  >
                    {/* Certificate image thumbnail */}
                    <div className="shrink-0 w-16 h-16 rounded overflow-hidden border border-border bg-background">
                      <OptimizedImage
                        src={cert.file}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-text-main mb-1 leading-snug" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                        {cert.title}
                      </h4>
                      <p className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-2">{cert.issuer}</p>
                      <p className="text-xs text-text-muted leading-relaxed">{cert.relevance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Synthesis diagram ── */}
          <div className="lg:col-span-5 reveal-right">
            <div className="p-6 rounded-lg border border-border bg-surface/40 relative overflow-hidden corner-marks">
              <div className="absolute inset-0 bg-schematic" />

              <div className="relative z-10">
                <div className="mono-label mb-8 flex items-center gap-2">
                  <Combine size={12} className="text-primary" />
                  The Synthesis
                </div>

                {/* Software block */}
                <div className="mb-2">
                  <div className="p-4 rounded border border-primary/20 bg-primary/5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-sm bg-primary/15 border border-primary/25 flex items-center justify-center">
                        <Cpu size={11} className="text-primary" />
                      </div>
                      <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider">Software Engineering</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Applications', 'APIs', 'Automation', 'Data Infrastructure', 'Intelligent Interfaces'].map((t) => (
                        <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background border border-border/60 text-text-dim">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connector arrow */}
                <div className="flex items-center justify-center py-2 my-1 opacity-40">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-px h-4 bg-gradient-to-b from-primary to-secondary" />
                    <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-secondary" />
                  </div>
                  <div className="mx-4 text-[9px] font-mono text-text-dim tracking-widest">APPLIED TO</div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-px h-4 bg-gradient-to-b from-primary to-secondary" />
                    <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-secondary" />
                  </div>
                </div>

                {/* Materials block */}
                <div className="mb-6">
                  <div className="p-4 rounded border border-accent/20 bg-accent/5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-sm bg-accent/15 border border-accent/25 flex items-center justify-center">
                        <Zap size={11} className="text-accent" />
                      </div>
                      <span className="text-xs font-bold text-accent font-mono uppercase tracking-wider">Materials Engineering</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Metallurgy', 'Thermal Processes', 'Manufacturing', 'Corrosion', 'Industrial Systems'].map((t) => (
                        <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background border border-border/60 text-text-dim">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="p-4 rounded border border-secondary/25 bg-secondary/5">
                  <div className="mono-label mb-2 text-secondary">Result</div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    <strong className="text-text-main font-medium">Intelligent industrial systems</strong> — software infrastructure that makes physical engineering processes more observable, efficient, and adaptive.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </MotionWrapper>
    </section>
  );
};

