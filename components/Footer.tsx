import React from 'react';
import { Github, Linkedin, ArrowUp, MapPin, FileText } from 'lucide-react';
import { SectionId } from '../types';

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', `#${SectionId.HERO}`);
  };

  return (
    <footer className="border-t border-border/40 bg-background relative overflow-hidden" role="contentinfo">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">

          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h3 className="text-base font-bold text-text-main" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                  TESTIMONY OWOLABI
                </h3>
                <p className="text-[11px] font-mono text-text-dim tracking-wider uppercase mt-0.5">
                  Builder · Engineer · Technologist · Leader
                </p>
              </div>
              <p className="text-sm text-text-muted max-w-sm mb-6 leading-relaxed">
                Building software for the physical world. Engineering systems that bridge computational infrastructure with industrial processes.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { href: 'https://github.com/buzzdotsui', label: 'GitHub', icon: <Github size={15} /> },
                  { href: 'https://www.linkedin.com/in/testimony-owolabi', label: 'LinkedIn', icon: <Linkedin size={15} /> },
                  { href: 'https://x.com/testytech_pr', label: 'X — Student / Leadership', icon: <XIcon /> },
                  { href: 'https://x.com/_buzzdotsui', label: 'X — Sui / Web3', icon: <XIcon /> },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded border border-border/60 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 hover:bg-surface transition-all group"
                    title={label}
                  >
                    <span className="group-hover:scale-110 transition-transform">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav Col */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs font-mono font-semibold text-text-main mb-4 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5" role="list">
              {[
                { label: 'Work',         id: SectionId.PORTFOLIO },
                { label: 'Skills',       id: SectionId.SKILLS },
                { label: 'Services',     id: SectionId.SERVICES },
                { label: 'Availability', id: SectionId.AVAILABILITY },
                { label: 'Credentials',  id: SectionId.CREDENTIALS },
                { label: 'Experience',   id: SectionId.EXPERIENCE },
                { label: 'Contact',      id: SectionId.CONTACT },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-text-muted hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status + CV Col */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-semibold text-text-main mb-4 uppercase tracking-wider">Status</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded border border-border bg-surface flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={10} className="text-text-muted" />
                </div>
                <div>
                  <p className="text-sm text-text-main">Akure, Nigeria</p>
                  <p className="text-xs text-text-dim">FUTA · GMT+1</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded border border-border bg-surface flex items-center justify-center shrink-0 mt-0.5 relative">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse absolute" />
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                </div>
                <div>
                  <p className="text-sm text-text-main">Available</p>
                  <p className="text-xs text-text-dim">Engineering & Systems</p>
                </div>
              </div>
              <a
                href="/CV/Testimony_Owolabi_Claude_Campus_Ambassador_Resume-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-primary transition-colors mt-2"
              >
                <FileText size={12} /> Download CV
              </a>
            </div>
          </div>

          {/* Back to top */}
          <div className="hidden md:flex md:col-span-1 justify-end items-start">
            <a
              href={`#${SectionId.HERO}`}
              onClick={scrollToTop}
              className="w-10 h-10 rounded border border-border bg-surface hover:border-primary/40 hover:text-primary flex items-center justify-center text-text-muted transition-all"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-dim font-mono">
            &copy; {currentYear} Testimony Owolabi. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-text-dim font-mono">
            <span className="text-text-muted">Built with</span> React &amp; TypeScript
          </div>
        </div>
      </div>
    </footer>
  );
};