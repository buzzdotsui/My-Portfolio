import { stack } from '../data/site';
import type { StackGroup, StackItem } from '../types';
import { SectionLabel } from './SectionLabel';

function logoStyle(item: StackItem): React.CSSProperties {
  const style: Record<string, string> = {};
  if (item.logo) style['--logo'] = `url(${item.logo})`;
  if (item.brand) style['--brand'] = item.brand;
  return style as React.CSSProperties;
}

function TechTile({ item, featured }: { item: StackItem; featured?: boolean }) {
  return (
    <div className={featured ? 'tech-tile tech-tile--core' : 'tech-tile'}>
      {item.logo ? (
        <span className="tech-logo" style={logoStyle(item)} aria-hidden="true" />
      ) : (
        <span className="tech-mark" style={logoStyle(item)} aria-hidden="true">
          {item.mark}
        </span>
      )}
      <span className="tech-name">{item.name}</span>
    </div>
  );
}

function Group({ group }: { group: StackGroup }) {
  return (
    <div>
      <div
        data-reveal
        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4"
      >
        <h3 className="mono-label text-paper">{group.title}</h3>
        {group.tag && <p className="mono-label text-accent/80">{group.tag}</p>}
      </div>

      <ul className={`mt-5 grid ${group.grid}`}>
        {group.items.map((item, index) => (
          <li
            key={`${group.title}-${item.name}`}
            data-reveal
            style={{ '--reveal-delay': `${Math.min(index * 45, 360)}ms` } as React.CSSProperties}
          >
            <TechTile item={item} featured={group.featured} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Stack() {
  return (
    <section id="stack" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="03" label={stack.label} />
          <h2 className="display display-md mt-5">{stack.heading}</h2>
          <p className="lede mt-4">{stack.note}</p>
        </div>

        <div className="mt-14 space-y-14 sm:mt-16">
          {stack.groups.map((group) => (
            <Group key={group.title} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
