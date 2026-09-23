import { beyond } from '../data/site';
import { ArrowUpRightIcon } from './Icons';
import { SectionLabel } from './SectionLabel';

export function BeyondSoftware() {
  return (
    <section id="beyond" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="05" label={beyond.label} />
          <h2 className="display display-md mt-5">{beyond.heading}</h2>
        </div>

        <div data-reveal className="mt-6 grid max-w-4xl gap-5 sm:grid-cols-2">
          {beyond.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-[15px] leading-[1.7] text-mute sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <ol
          data-reveal
          className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Metabotics conceptual architecture"
        >
          {beyond.pipeline.map((stage) => (
            <li key={stage.step} className="group relative border-b border-line py-6 lg:pr-8">
              <span
                className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-500 ease-editorial group-hover:w-full"
                aria-hidden="true"
              />
              <p className="mono-label">
                <span className="text-accent">{stage.step}</span>
              </p>
              <h3 className="mt-3 font-mono text-sm uppercase tracking-[0.14em] text-paper">
                {stage.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-mute">{stage.desc}</p>
            </li>
          ))}
        </ol>

        <div
          data-reveal
          className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6"
        >
          <p className="mono-label">{beyond.status}</p>
          <a
            href={beyond.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-cta text-paper transition-colors duration-200 hover:text-accent"
          >
            {beyond.urlLabel}
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
