import { certifications } from '../data/site';
import { ArrowUpRightIcon } from './Icons';
import { SectionLabel } from './SectionLabel';

export function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="04" label={certifications.label} />
          <h2 className="display display-md mt-5">{certifications.heading}</h2>
          <p className="lede mt-4">{certifications.note}</p>
        </div>

        <div className="mt-12 space-y-12 sm:mt-14">
          {certifications.groups.map((group) => (
            <div key={group.title}>
              <div
                data-reveal
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4"
              >
                <h3 className="mono-label text-paper">{group.title}</h3>
                <p className="mono-label text-accent/80">
                  {String(group.items.length)} credentials
                </p>
              </div>

              <ul className="mt-2">
                {group.items.map((cert, index) => (
                  <li
                    key={cert.title}
                    data-reveal
                    style={{ '--reveal-delay': `${Math.min(index * 45, 270)}ms` } as React.CSSProperties}
                    className="border-b border-line py-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4 className="text-[15px] font-medium leading-snug text-paper sm:text-base">
                        {cert.title}
                      </h4>
                      <p className="mono-label shrink-0">
                        {cert.issuer}
                        {cert.issued ? ` · ${cert.issued}` : ''}
                      </p>
                    </div>

                    {cert.credentialId && (
                      <p className="mono-label mt-2 break-all text-dim">
                        Credential ID {cert.credentialId}
                      </p>
                    )}

                    {cert.skills && cert.skills.length > 0 && (
                      <p className="mt-2 text-[13px] leading-relaxed text-mute">
                        Skills: {cert.skills.join(', ')}
                      </p>
                    )}

                    <a
                      href={certifications.credentialsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-cta text-paper transition-colors duration-200 hover:text-accent"
                    >
                      Show credential
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
