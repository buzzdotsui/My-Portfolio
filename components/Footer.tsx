import React from 'react';
import { Github, Linkedin, Twitter, ArrowUp, MapPin } from 'lucide-react';
import { SectionId } from '../types';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', `#${SectionId.HERO}`);
  };

  return (
    <footer className="border-t border-border/40 bg-background relative overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 relative shrink-0">
                  <div className="absolute inset-0 border border-primary/40 bg-primary/8 rounded-sm" />
                  <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-primary/60" />
                  <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-primary/60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold font-mono text-primary">TO</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-text-main" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>Testimony Owolabi</h3>
                  <p className="text-[10px] font-mono text-text-dim tracking-wider uppercase">Full-Stack · Metabotics</p>
                </div>
              </div>
              <p className="text-sm text-text-muted max-w-sm mb-6 leading-relaxed">
                Building software for the physical world. Engineering systems that bridge computational infrastructure with industrial processes.
              </p>
              
              <div className="flex items-center gap-4">
                {[
                  { href: 'https://github.com/buzzdotsui', label: 'GitHub', icon: <Github size={16} /> },
                  { href: 'https://www.linkedin.com/in/testimony-owolabi', label: 'LinkedIn', icon: <Linkedin size={16} /> },
                  { href: 'https://x.com/testytech_pr', label: 'X', icon: <Twitter size={16} /> },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded border border-border/60 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 hover:bg-surface transition-all group"
                  >
                    <span className="group-hover:scale-110 transition-transform">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav Col */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-xs font-mono font-semibold text-text-main mb-4 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About', id: SectionId.ABOUT },
                { label: 'Metabotics', id: SectionId.METABOTICS },
                { label: 'Work', id: SectionId.PROJECTS },
                { label: 'Writing', id: SectionId.WRITING },
                { label: 'Contact', id: SectionId.CONTACT },
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={`#${link.id}`}
                    className="text-sm text-text-muted hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location / Status Col */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-semibold text-text-main mb-4 uppercase tracking-wider">Current Status</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded border border-border bg-surface flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={10} className="text-text-muted" />
                </div>
                <div>
                  <p className="text-sm text-text-main">Akure, Nigeria</p>
                  <p className="text-xs text-text-dim">FUTA, GMT+1</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded border border-border bg-surface flex items-center justify-center shrink-0 mt-0.5 relative">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse absolute" />
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                </div>
                <div>
                  <p className="text-sm text-text-main">Available for Work</p>
                  <p className="text-xs text-text-dim">Engineering & Systems</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to top */}
          <div className="md:col-span-1 flex justify-start md:justify-end">
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
        <div className="mt-16 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-dim font-mono">
            &copy; {currentYear} Testimony Owolabi. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-text-dim font-mono">
            <span className="text-text-muted">Built with</span> React &amp; Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
};