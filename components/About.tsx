import { about } from '../data/site';
import { SectionLabel } from './SectionLabel';

export function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="02" label={about.label} />
        </div>

        <div className="mt-5 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div data-reveal className="lg:col-span-7">
            <h2 className="display display-md">{about.heading}</h2>

            <div className="mt-7 space-y-5 text-[15px] leading-[1.7] text-mute sm:text-base">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <blockquote className="relative mt-9 border-l-2 border-accent pl-5 text-lg leading-snug text-paper sm:text-xl">
              <span
                className="absolute -left-px top-0 h-full w-px bg-accent/20"
                aria-hidden="true"
              />
              {about.pullQuote}
            </blockquote>
          </div>

          <div
            data-reveal
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            className="lg:col-span-5"
          >
            <dl className="border-t border-line">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <dt className="mono-label w-40 shrink-0">{fact.label}</dt>
                  <dd className="text-[15px] leading-snug text-paper">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
