import { useCallback, useRef, useState } from 'react';
import { contact, site } from '../data/site';
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from './Icons';
import { SectionLabel } from './SectionLabel';

const MAX_TILT = 10;

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(site.phone);
      setPhoneCopied(true);
      window.setTimeout(() => setPhoneCopied(false), 2000);
    } catch {
      window.location.href = site.phoneHref;
    }
  };

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setGlow({ x: px * 100, y: py * 100, active: true });
    setTilt({
      x: (0.5 - py) * MAX_TILT * 2,
      y: (px - 0.5) * MAX_TILT * 2,
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlow((g) => ({ ...g, active: false }));
  }, []);

  return (
    <section id="contact" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="09" label={contact.label} />
          <h2 className="display display-md mt-5">{contact.heading}</h2>
          <div className="mt-5 space-y-4 text-[15px] leading-[1.7] text-mute sm:text-base">
            {contact.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div data-reveal className="mt-12">
          <a
            href={`mailto:${site.email}`}
            className="group block break-all border-b border-line pb-6 font-medium leading-tight tracking-[-0.03em] text-paper transition-colors duration-200 hover:border-accent hover:text-accent text-[clamp(1.35rem,4.5vw,3rem)]"
          >
            {site.email}
          </a>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.email}`} className="btn-primary">
              <MailIcon />
              Email me
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="btn-ghost"
              aria-live="polite"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <LinkedinIcon />
              LinkedIn
            </a>
            <a href={site.cv} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              CV
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>

        <div data-reveal className="phone-scene mt-12" aria-label="Phone contact card">
          <div
            ref={cardRef}
            className="phone-card"
            style={
              {
                '--tilt-x': `${tilt.x}deg`,
                '--tilt-y': `${tilt.y}deg`,
                '--glow-x': `${glow.x}%`,
                '--glow-y': `${glow.y}%`,
                '--glow-opacity': glow.active ? '1' : '0',
              } as React.CSSProperties
            }
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
          >
            <div className="phone-card__edge" aria-hidden="true" />
            <div className="phone-card__body">
              <div className="phone-card__top">
                <p className="mono-label text-accent">Direct line</p>
                <span className="phone-card__badge">
                  <span className="phone-card__pulse" aria-hidden="true" />
                  Call or WhatsApp
                </span>
              </div>

              <a href={site.phoneHref} className="phone-card__number">
                {site.phone}
              </a>
              <p className="phone-card__hint">Tap the number, or pick a channel below.</p>

              <div className="phone-card__actions">
                <a href={site.phoneHref} className="phone-action phone-action--call">
                  <span className="phone-action__icon">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span className="phone-action__text">
                    <span className="phone-action__label">Call</span>
                    <span className="phone-action__meta">Voice line</span>
                  </span>
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="phone-action phone-action--wa"
                >
                  <span className="phone-action__icon">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <span className="phone-action__text">
                    <span className="phone-action__label">WhatsApp</span>
                    <span className="phone-action__meta">Chat now</span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={copyPhone}
                  className="phone-action phone-action--copy"
                  aria-live="polite"
                >
                  <span className="phone-action__icon">
                    {phoneCopied ? <CheckIcon className="h-5 w-5" /> : <CopyIcon className="h-5 w-5" />}
                  </span>
                  <span className="phone-action__text">
                    <span className="phone-action__label">
                      {phoneCopied ? 'Copied' : 'Copy'}
                    </span>
                    <span className="phone-action__meta">Number</span>
                  </span>
                </button>
              </div>

              <div className="phone-card__foot">
                <p className="mono-label">{site.location}</p>
                <p className="mono-label">GMT+1</p>
              </div>
            </div>
            <div className="phone-card__shine" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
