import React from 'react';
import { Terminal, Github, Linkedin, Twitter, Instagram, Facebook, BookOpen } from 'lucide-react';
import { SectionId } from '../types';

export const Footer: React.FC = () => {
  const navLinks = [
    { label: 'Skills', href: `#${SectionId.SKILLS}` },
    { label: 'Projects', href: `#${SectionId.PROJECTS}` },
    { label: 'About', href: `#${SectionId.ABOUT}` },
    { label: 'Contact', href: `#${SectionId.CONTACT}` },
  ];

  const socials = [
    { label: 'GitHub',    href: 'https://github.com/buzzdotsui',          icon: <Github size={15} /> },
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/testimony-owolabi', icon: <Linkedin size={15} /> },
    { label: 'X',         href: 'https://x.com/testytech_pr',             icon: <Twitter size={15} /> },
    { label: 'Instagram', href: 'https://instagram.com/testytech_pr',     icon: <Instagram size={15} /> },
    { label: 'Facebook',  href: 'https://facebook.com/TESTYPR',           icon: <Facebook size={15} /> },
    { label: 'Medium',    href: 'https://medium.com/@owolabitestimony',   icon: <BookOpen size={15} /> },
  ];

  return (
    <footer className="py-10 border-t border-border bg-background relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-6">

        {/* Top row: brand + internal nav */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-text-dim hover:text-primary transition-colors cursor-default">
            <Terminal size={14} />
            <span className="font-mono text-xs">buzzdotsui_sys_v2.4.0</span>
          </div>

          {/* Internal navigation links */}
          <nav aria-label="Footer navigation">
            <ul className="flex gap-6 text-xs text-text-muted font-medium uppercase tracking-wider">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-primary hover:underline underline-offset-4 transition-all">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row: social icons */}
        <div className="flex items-center justify-center gap-5 pt-4 border-t border-border/50">
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted hover:text-primary hover:scale-110 transform transition-all duration-200"
            >
              {icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};