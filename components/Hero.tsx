import React from 'react';
import { Github, Linkedin, MapPin, Clock, ArrowRight, Twitter, ExternalLink, FileText } from 'lucide-react';
import { SectionId } from '../types';
import { OptimizedImage } from './ui/OptimizedImage';

/* ─────────────────────────────────────────────────────────────
   SchematicBackground — sparse SVG engineering schematic
───────────────────────────────────────────────────────────── */
const SchematicBackground: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(14,165,233,0)" />
        <stop offset="40%" stopColor="rgba(14,165,233,0.3)" />
        <stop offset="100%" stopColor="rgba(16,185,129,0.1)" />
      </linearGradient>
      <linearGradient id="sg2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(14,165,233,0)" />
        <stop offset="50%" stopColor="rgba(14,165,233,0.2)" />
        <stop offset="100%" stopColor="rgba(14,165,233,0)" />
      </linearGradient>
    </defs>

    {/* Horizontal signal lines */}
    <line x1="0" y1="28%" x2="38%" y2="28%" stroke="url(#sg1)" strokeWidth="1" strokeDasharray="8 5">
      <animate attributeName="stroke-dashoffset" from="26" to="0" dur="4s" repeatCount="indefinite" />
    </line>
    <line x1="62%" y1="65%" x2="100%" y2="65%" stroke="url(#sg1)" strokeWidth="1" strokeDasharray="6 6">
      <animate attributeName="stroke-dashoffset" from="0" to="24" dur="5s" repeatCount="indefinite" />
    </line>

    {/* Vertical signal line */}
    <line x1="72%" y1="0" x2="72%" y2="45%" stroke="url(#sg2)" strokeWidth="1" strokeDasharray="5 7">
      <animate attributeName="stroke-dashoffset" from="24" to="0" dur="3.5s" repeatCount="indefinite" />
    </line>

    {/* Node dots */}
    {[
      { cx: '38%', cy: '28%', r: 3, color: 'rgba(14,165,233,0.6)', dur: '2.2s' },
      { cx: '62%', cy: '65%', r: 2.5, color: 'rgba(16,185,129,0.5)', dur: '3s' },
      { cx: '72%', cy: '45%', r: 3, color: 'rgba(14,165,233,0.4)', dur: '2.7s' },
      { cx: '15%', cy: '75%', r: 2, color: 'rgba(245,158,11,0.35)', dur: '3.5s' },
    ].map((dot, i) => (
      <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.color}>
        <animate attributeName="opacity" values="0.3;0.85;0.3" dur={dot.dur} repeatCount="indefinite" />
      </circle>
    ))}

    {/* Connection lines between nodes */}
    <line x1="38%" y1="28%" x2="62%" y2="65%" stroke="rgba(14,165,233,0.08)" strokeWidth="1" />
    <line x1="62%" y1="65%" x2="72%" y2="45%" stroke="rgba(16,185,129,0.08)" strokeWidth="1" />

    {/* Minimal bracket marks */}
    <path d="M 5% 12% L 5% 8% L 9% 8%" stroke="rgba(14,165,233,0.15)" strokeWidth="1" fill="none" />
    <path d="M 91% 88% L 91% 92% L 87% 92%" stroke="rgba(14,165,233,0.15)" strokeWidth="1" fill="none" />
  </svg>
);

export const Hero: React.FC = () => {
  return (
    <section
      id={SectionId.HERO}
      className="relative pt-28 pb-24 px-5 md:px-8 min-h-[96vh] flex flex-col justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern" />
        <SchematicBackground />
        {/* Orbs — restrained */}
        <div className="absolute top-0 right-[-5%] w-[480px] h-[480px] bg-primary/5 rounded-full blur-[140px] pointer-events-none orb-animate" />
        <div className="absolute bottom-0 left-[-5%] w-[360px] h-[360px] bg-secondary/4 rounded-full blur-[120px] pointer-events-none orb-animate-reverse" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Primary content ── */}
          <div className="lg:col-span-7 flex flex-col">

            {/* Identity row */}
            <div className="flex items-center gap-4 mb-10 anim-fade-up">
              {/* Profile avatar */}
              <div className="shrink-0 w-14 h-14 rounded-sm p-[1.5px] bg-gradient-to-br from-primary/60 via-secondary/40 to-transparent">
                <div className="w-full h-full rounded-sm overflow-hidden border border-border bg-surface">
                  <OptimizedImage
                    src="/profile.jpg"
                    alt="Testimony Owolabi"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="eng-badge">Full-Stack Engineer</span>
                  <span className="eng-badge" style={{ borderColor: 'rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.08)', color: '#10b981' }}>Materials Eng. Student</span>
                  <span className="eng-badge" style={{ borderColor: 'rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.08)', color: '#f59e0b' }}>Metabotics</span>
                </div>
                <p className="text-xs font-mono text-text-dim">Akure, Nigeria · FUTA · GMT+1</p>
              </div>
            </div>

            {/* Primary H1 */}
            <h1 className="text-[2.6rem] md:text-[3.8rem] font-bold leading-[1.06] tracking-tight mb-6 anim-fade-up-1" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
              <span className="text-text-main">I build software</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #dde6f0 0%, #60b8f0 50%, #0ea5e9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                for the physical world.
              </span>
            </h1>

            {/* Supporting description */}
            <p className="text-base md:text-lg text-text-muted max-w-xl mb-3 leading-relaxed font-light anim-fade-up-2">
              A multidisciplinary builder working across{' '}
              <span className="text-text-main font-medium">software, intelligent technology, engineering and communities.</span>
            </p>

            {/* Secondary statement */}
            <p className="text-sm text-text-dim max-w-lg mb-10 leading-relaxed font-mono border-l border-primary/30 pl-4 anim-fade-up-3">
              Building toward a future where industrial systems can sense, understand, and optimize themselves.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12 anim-fade-up-4">
              <a
                href={`#${SectionId.PROJECTS}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded hover:bg-primary-hover transition-all hover:shadow-glow-sm group"
              >
                Explore my work
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/CV/Testimony_Owolabi_Claude_Campus_Ambassador_Resume-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface/60 border border-border text-text-main text-sm font-medium rounded hover:border-primary/40 hover:bg-surface transition-all group"
              >
                <FileText size={14} className="text-text-dim group-hover:text-primary transition-colors" />
                Get my CV
              </a>
            </div>

            {/* Social / info bar */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border/60 anim-fade-up-5">
              <div className="flex gap-5">
                {[
                  { href: 'https://github.com/buzzdotsui', label: 'GitHub', icon: <Github size={17} /> },
                  { href: 'https://www.linkedin.com/in/testimony-owolabi', label: 'LinkedIn', icon: <Linkedin size={17} /> },
                  { href: 'https://x.com/testytech_pr', label: 'X/Twitter', icon: <Twitter size={17} /> },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>

              <div className="h-4 w-px bg-border/60" />

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-mono text-secondary tracking-wider">Building</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-text-dim font-mono">
                <MapPin size={11} className="text-primary/50" />
                Akure, Nigeria
              </div>

              <div className="flex items-center gap-1.5 text-xs text-text-dim font-mono">
                <Clock size={11} />
                GMT+1
              </div>
            </div>
          </div>

          {/* ── RIGHT: Stack panel ── */}
          <div className="lg:col-span-5 reveal-right">
            <div className="relative p-6 rounded-lg border border-border bg-surface/40 backdrop-blur-sm overflow-hidden corner-marks">
              {/* Schematic background */}
              <div className="absolute inset-0 bg-schematic opacity-60" />

              <div className="relative z-10">
                <div className="mono-label mb-5 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full signal-pulse" />
                  Current Stack
                </div>

                <ul className="space-y-3.5 mb-6">
                  {[
                    { label: 'Frontend', value: 'React / Next.js' },
                    { label: 'Backend',  value: 'Node.js / Express' },
                    { label: 'Language', value: 'TypeScript' },
                    { label: 'Database', value: 'PostgreSQL · Prisma' },
                    { label: 'Deploy',   value: 'Cloud · Vercel · CF' },
                    { label: 'Exploring', value: 'Industrial IoT · AI' },
                  ].map((item) => (
                    <li key={item.label} className="flex justify-between items-baseline text-xs font-mono border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
                      <span className="text-text-dim">{item.label}</span>
                      <span className="text-text-main font-medium">{item.value}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border/40">
                  <div className="mono-label mb-2">Studying</div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    B.Eng. Metallurgical Engineering<br />
                    <span className="text-text-dim">Federal University of Technology Akure</span>
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border/40">
                  <div className="mono-label mb-2">Focus</div>
                  <div className="text-xs font-mono text-primary/80">
                    Software × Engineering × People
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
