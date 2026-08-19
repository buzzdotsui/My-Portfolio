import React, { useState, useEffect } from 'react';
import { NavItem, SectionId } from '../types';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';

const navItems: NavItem[] = [
  { label: 'Work', href: `#${SectionId.PROJECTS}` },
  { label: 'Metabotics', href: `#${SectionId.METABOTICS}` },
  { label: 'About', href: `#${SectionId.ABOUT}` },
  { label: 'Writing', href: `#${SectionId.WRITING}` },
  { label: 'Contact', href: `#${SectionId.CONTACT}` },
];

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/60'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="w-full px-5 md:px-8 h-[60px] flex items-center justify-between max-w-7xl mx-auto">

        {/* Brand */}
        <a
          href={`#${SectionId.HERO}`}
          onClick={(e) => handleNavClick(e, `#${SectionId.HERO}`)}
          className="flex items-center gap-2.5 group"
          aria-label="Testimony Owolabi – Home"
        >
          <div className="w-7 h-7 relative shrink-0">
            <div className="absolute inset-0 border border-primary/40 bg-primary/8 rounded-sm" />
            <div className="absolute -top-px -left-px w-1.5 h-1.5 border-t border-l border-primary/60" />
            <div className="absolute -bottom-px -right-px w-1.5 h-1.5 border-b border-r border-primary/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold font-mono text-primary">TO</span>
            </div>
          </div>
          <span className="font-mono text-[13px] font-semibold text-text-main tracking-tight group-hover:text-primary transition-colors duration-300">
            testimony.dev
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-0.5"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[13px] font-medium text-text-muted hover:text-text-main transition-colors px-4 py-1.5 rounded relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 mr-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary" />
            </span>
            <span className="text-[11px] font-mono text-secondary tracking-wider">Building</span>
          </div>
          <ThemeToggle />
          <a
            href={`#${SectionId.CONTACT}`}
            onClick={(e) => handleNavClick(e, `#${SectionId.CONTACT}`)}
            className="flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-semibold bg-primary text-white rounded hover:bg-primary-hover transition-all hover:shadow-glow-sm group"
          >
            Let's Connect
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-text-muted hover:text-primary transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-background/97 backdrop-blur-xl border-b border-border p-4 flex flex-col gap-1 shadow-card md:hidden">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-text-muted hover:text-primary hover:bg-surface transition-all p-3 rounded flex items-center gap-3"
            >
              <span className="w-1 h-1 rounded-full bg-primary/50" />
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-border mt-1">
            <a
              href={`#${SectionId.CONTACT}`}
              onClick={(e) => handleNavClick(e, `#${SectionId.CONTACT}`)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded text-sm font-semibold bg-primary text-white"
            >
              Let's Connect <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};