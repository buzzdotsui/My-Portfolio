import { useState } from 'react';
import { contact, site } from '../data/site';
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from './Icons';
import { SectionLabel } from './SectionLabel';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="07" label={contact.label} />
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

          <p className="mono-label mt-6">{site.location}</p>
        </div>
      </div>
    </section>
  );
}
