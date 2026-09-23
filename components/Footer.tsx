import { navItems, site } from '../data/site';
import { ArrowUpRightIcon, GithubIcon, LinkedinIcon } from './Icons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="shell py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-mono text-[13px] uppercase tracking-brand text-paper">
              {site.brand}
              <span className="text-accent" aria-hidden="true">
                .
              </span>
            </p>
            <p className="mt-3 text-[15px] text-paper">{site.name}</p>
            <p className="text-[15px] text-mute">{site.role}</p>
            <a
              href="#top"
              className="link-underline mono-label mt-5 inline-flex min-h-[44px] items-center gap-2 text-mute hover:text-paper"
            >
              Back to top
              <ArrowUpRightIcon className="h-3.5 w-3.5 -rotate-45" />
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="mono-label">Index</p>
            <ul className="mt-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-quiet text-[15px]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mono-label">Elsewhere</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet inline-flex items-center gap-2 text-[15px]"
                >
                  <GithubIcon className="h-3.5 w-3.5" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet inline-flex items-center gap-2 text-[15px]"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-quiet text-[15px]">
                  Email
                </a>
              </li>
              <li>
                <a
                  href={site.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet text-[15px]"
                >
                  Medium
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label">
            © {year} {site.name}
          </p>
          <p className="mono-label">{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
