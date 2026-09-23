import { site } from '../data/site';
import { ArrowRightIcon, GithubIcon, LinkedinIcon } from './Icons';

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="rise rise-1 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="mono-label">Testimony Owolabi, Full-Stack Software Engineer</p>
              <span className="hidden h-px w-8 bg-line sm:block" aria-hidden="true" />
              <p className="mono-label flex items-center gap-2 text-mute">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                Open to roles
              </p>
            </div>

            <h1 className="display display-lg mt-6 rise rise-2">
              I build software
              <br />
              for the real
              <br />
              world<span className="text-accent">.</span>
            </h1>

            <p className="lede mt-7 rise rise-3">
              Production systems across{' '}
              <span className="text-paper">Web · AI · Web3</span>, shipped for clients and for
              myself. Trained as a materials engineer, so I care how things behave under pressure.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 rise rise-4">
              <a href="#work" className="btn-primary">
                View Work
                <ArrowRightIcon className="arrow h-4 w-4" />
              </a>
              <a href="#contact" className="btn-ghost">
                Contact
              </a>
              <a
                href={site.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                View CV
              </a>
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
            </div>
          </div>

          <figure className="rise rise-5 lg:col-span-4">
            <div className="img-frame relative aspect-[4/5] w-full max-w-sm lg:max-w-none">
              <img
                src={site.portrait.src}
                alt={site.portrait.alt}
                width={site.portrait.width}
                height={site.portrait.height}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="portrait-mono h-full w-full object-cover object-[center_20%]"
              />
              <span
                className="absolute left-3 top-3 h-4 w-4 border-l border-t border-accent/60"
                aria-hidden="true"
              />
              <span
                className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-accent/60"
                aria-hidden="true"
              />
            </div>
            <figcaption className="mono-label mt-3 flex items-center justify-between">
              <span>Testimony Owolabi</span>
              <span className="text-dim">Akure, NG</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
