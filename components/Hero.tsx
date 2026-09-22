import React from 'react';
import { Github, Linkedin, MapPin, ArrowRight, FileText } from 'lucide-react';
import { SectionId } from '../types';
import { OptimizedImage } from './ui/OptimizedImage';

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Hero: React.FC = () => {
  return (
    <section
      id={SectionId.HERO}
      className="relative pt-24 pb-0 px-5 md:px-8 min-h-screen flex flex-col justify-center overflow-hidden bg-background"
      aria-label="Introduction"
    >
      {/* Subtle grid — restrained */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden="true"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage:
            'linear-gradient(to right, rgba(20,50,80,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,50,80,0.25) 1px, transparent 1px)',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-stretch min-h-[85vh]">

          {/* ── LEFT: Identity + content ── */}
          <div className="lg:col-span-7 flex flex-col justify-center py-12 lg:py-16 lg:pr-16">

            {/* Location badge */}
            <div className="flex items-center gap-2 mb-8 anim-fade-up">
              <MapPin size={12} className="text-text-dim" />
              <span className="text-xs font-mono text-text-dim tracking-wider">Akure, Nigeria · FUTA · GMT+1</span>
            </div>

            {/* Name */}
            <div className="mb-6 anim-fade-up-1">
              <h1
                className="text-[3.2rem] md:text-[4.5rem] lg:text-[5rem] font-bold leading-[0.95] tracking-tight text-text-main"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif', letterSpacing: '-0.03em' }}
              >
                TESTIMONY<br />
                <span className="text-primary">OWOLABI</span>
              </h1>
            </div>

            {/* Primary thesis */}
            <div className="mb-8 anim-fade-up-2">
              <p className="text-xl md:text-2xl text-text-muted font-light leading-snug max-w-lg">
                I build software for the physical world.
              </p>
            </div>

            {/* Supporting context */}
            <div className="mb-10 anim-fade-up-3">
              <p className="text-sm text-text-dim max-w-md leading-relaxed font-mono border-l-2 border-primary/30 pl-4">
                A multidisciplinary builder working across software, intelligent systems, automation, Web3, and engineering. Student of materials science, founder of Metabotics, community lead at Sui On Campus FUTA.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12 anim-fade-up-4">
              <a
                href={`#${SectionId.PORTFOLIO}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded hover:bg-primary-hover transition-all hover:shadow-glow-sm group"
              >
                See my work
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/CV/Testimony_Owolabi_Claude_Campus_Ambassador_Resume-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface/60 border border-border text-text-main text-sm font-medium rounded hover:border-primary/40 hover:bg-surface transition-all group"
              >
                <FileText size={14} className="text-text-dim group-hover:text-primary transition-colors" />
                Download CV
              </a>
            </div>

            {/* Social links + status */}
            <div className="flex flex-wrap items-center gap-5 pt-6 border-t border-border/60 anim-fade-up-5">
              <div className="flex gap-4">
                {[
                  { href: 'https://github.com/buzzdotsui', label: 'GitHub', Icon: Github },
                  { href: 'https://www.linkedin.com/in/testimony-owolabi', label: 'LinkedIn', Icon: Linkedin },
                  { href: 'https://x.com/testytech_pr', label: 'X (Student/Leadership)', Icon: XIcon },
                  { href: 'https://x.com/_buzzdotsui', label: 'X (Sui/Web3)', Icon: XIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              <div className="h-4 w-px bg-border/60" />

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-mono text-secondary tracking-wider">Available</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Portrait ── */}
          <div className="hidden lg:flex lg:col-span-5 items-end justify-end relative">
            {/* Portrait fills the full height of the hero */}
            <div className="w-full h-full relative overflow-hidden" style={{ minHeight: '85vh' }}>
              {/* Fade from portrait to background at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, var(--color-background) 0%, transparent 100%)',
                }}
              />
              {/* Left fade */}
              <div
                className="absolute top-0 left-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, var(--color-background) 0%, transparent 100%)',
                }}
              />
              <OptimizedImage
                src="/profile.jpg"
                alt="Testimony Owolabi"
                className="w-full h-full object-cover object-top"
                style={{ objectPosition: 'center top' }}
              />
            </div>
          </div>

          {/* Mobile portrait — smaller, below content */}
          <div className="lg:hidden relative w-full max-w-xs mx-auto aspect-[3/4] rounded-lg overflow-hidden border border-border/40 anim-fade-up">
            <OptimizedImage
              src="/profile.jpg"
              alt="Testimony Owolabi"
              className="w-full h-full object-cover object-top"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
