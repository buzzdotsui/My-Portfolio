import { certifications } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { StackGroup } from './Stack';

export function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="04" label={certifications.label} />
          <h2 className="display display-md mt-5">{certifications.heading}</h2>
          <p className="lede mt-4">{certifications.note}</p>
        </div>

        <div className="mt-14 space-y-14 sm:mt-16">
          {certifications.groups.map((group) => (
            <StackGroup key={group.title} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
