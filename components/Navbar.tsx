import React, { useState, useEffect } from 'react';
import { NavItem, SectionId } from '../types';
import { Menu, X, FileText } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';

const navItems: NavItem[] = [
  { label: 'Work',         href: `#${SectionId.PORTFOLIO}` },
  { label: 'Skills',       href: `#${SectionId.SKILLS}` },
  { label: 'Services',     href: `#${SectionId.SERVICES}` },
  { label: 'Availability', href: `#${SectionId.AVAILABILITY}` },
  { label: 'Credentials',  href: `#${SectionId.CREDENTIALS}` },
  { label: 'Experience',   href: `#${SectionId.EXPERIENCE}` },
  { label: 'Contact',      href: `#${SectionId.CONTACT}` },
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
      setScrollProgress(Math.min(100, progress));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/60'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-5 md:px-8 h-[60px] flex items-center justify-between max-w-7xl mx-auto">

        {/* Brand */}
        <a
          href={`#${SectionId.HERO}`}
          onClick={(e) => handleNavClick(e, `#${SectionId.HERO}`)}
          className="flex items-center gap-2 group"
          aria-label="Testimony Owolabi — Home"
        >
          <span className="font-mono text-[13px] font-bold text-text-main tracking-tight group-hover:text-primary transition-colors">
            TESTIMONY OWOLABI
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[12px] font-medium text-text-muted hover:text-text-main transition-colors px-3 py-1.5 rounded relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-3 right-3 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2">
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
            className="flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-semibold bg-primary text-white rounded hover:bg-primary-hover transition-all hover:shadow-glow-sm"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-text-muted hover:text-primary transition-colors p-2 rounded"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
          className="absolute top-[60px] left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border p-4 flex flex-col gap-1 shadow-card lg:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-text-muted hover:text-primary hover:bg-surface/50 transition-all p-3 rounded flex items-center gap-3"
            >
              <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-border mt-2 flex flex-col gap-2">
            <a
              href={`#${SectionId.CONTACT}`}
              onClick={(e) => handleNavClick(e, `#${SectionId.CONTACT}`)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded text-sm font-semibold bg-primary text-white"
            >
              Get in touch
            </a>
            <a
              href="/CV/Testimony_Owolabi_Claude_Campus_Ambassador_Resume-1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded text-sm font-medium border border-border text-text-muted hover:text-primary transition-colors"
            >
              <FileText size={14} /> Download CV
            </a>
          </div>
        </div>
      )}

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-transparent" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};
