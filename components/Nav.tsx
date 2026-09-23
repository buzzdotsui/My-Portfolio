import { useEffect, useState } from 'react';
import { navItems, site } from '../data/site';
import { CloseIcon, GithubIcon, LinkedinIcon, MenuIcon } from './Icons';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-ink/90 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="group inline-flex items-baseline font-mono text-[13px] font-medium uppercase tracking-brand text-paper"
          aria-label={`${site.brand} — back to top`}
        >
          {site.brand}
          <span
            className="ml-0.5 text-accent transition-transform duration-300 ease-editorial group-hover:translate-y-[-1px]"
            aria-hidden="true"
          >
            .
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? 'true' : undefined}
              className={`relative font-mono text-[11px] uppercase tracking-cta transition-colors duration-200 ${
                active === item.href ? 'text-paper' : 'text-mute hover:text-paper'
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ease-editorial ${
                  active === item.href ? 'w-full' : 'w-0'
                }`}
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 w-11 items-center justify-center text-mute transition-colors duration-200 hover:text-paper sm:inline-flex"
            aria-label="GitHub profile (opens in new tab)"
          >
            <GithubIcon />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 w-11 items-center justify-center text-mute transition-colors duration-200 hover:text-paper sm:inline-flex"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <LinkedinIcon />
          </a>
          <a href="#contact" className="btn-primary ml-2 hidden h-9 px-4 md:inline-flex">
            Contact
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-paper md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="menu-in border-t border-line bg-ink md:hidden"
        >
          <nav aria-label="Mobile" className="shell flex flex-col py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center justify-between border-b border-line font-mono text-xs uppercase tracking-cta text-paper"
              >
                {item.label}
                <span className="text-accent" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
            <div className="flex items-center gap-4 pt-5">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-cta"
              >
                <GithubIcon /> GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-cta"
              >
                <LinkedinIcon /> LinkedIn
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
