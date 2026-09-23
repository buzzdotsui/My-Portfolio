import { elsewhere } from '../data/site';
import type { SocialLink } from '../types';
import { ArrowUpRightIcon } from './Icons';
import { SectionLabel } from './SectionLabel';

function SocialRow({ link, index }: { link: SocialLink; index: number }) {
  return (
    <li
      data-reveal
      style={{ '--reveal-delay': `${index * 60}ms` } as React.CSSProperties}
    >
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="social-row group"
        aria-label={`${link.platform} ${link.handle} (opens in new tab)`}
      >
        <span
          className="social-logo"
          style={
            { '--logo': `url(${link.logo})`, '--brand': link.brand } as React.CSSProperties
          }
          aria-hidden="true"
        />

        <span className="min-w-0 flex-1">
          <span className="social-name">
            {link.platform} / {link.handle}
          </span>
          {link.description && <span className="social-desc">{link.description}</span>}
        </span>

        <ArrowUpRightIcon className="social-arrow h-4 w-4 shrink-0" />
      </a>
    </li>
  );
}

export function Elsewhere() {
  return (
    <section id="elsewhere" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="07" label={elsewhere.label} />
          <h2 className="display display-md mt-5">{elsewhere.heading}</h2>
        </div>

        <ul className="mt-10 border-t border-line sm:mt-12">
          {elsewhere.links.map((link, index) => (
            <SocialRow key={link.url + link.handle} link={link} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
