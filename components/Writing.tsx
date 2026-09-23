import { writing } from '../data/site';
import type { Article } from '../types';
import { ArrowUpRightIcon } from './Icons';
import { SectionLabel } from './SectionLabel';

function ArticleRow({ article, index }: { article: Article; index: number }) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <li
      data-reveal
      style={{ '--reveal-delay': `${index * 70}ms` } as React.CSSProperties}
    >
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="article-row group"
        aria-label={`${article.title}, ${article.readTime} (opens in new tab)`}
      >
        <div className="article-meta">
          <p className="mono-label">
            <span className="text-accent">{num}</span>
            <span className="mx-3 text-line" aria-hidden="true">
              /
            </span>
            <span>{article.date}</span>
          </p>
          <p className="mono-label">{article.readTime}</p>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h3 className="article-title">{article.title}</h3>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-xl text-[15px] leading-[1.7] text-mute">
              {article.excerpt}
            </p>
            <span className="article-cta">
              Read on Medium
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}

export function Writing() {
  return (
    <section id="writing" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="06" label={writing.label} />
          <h2 className="display display-md mt-5">{writing.heading}</h2>
          <p className="lede mt-4">{writing.note}</p>
        </div>

        <ul className="mt-12 border-t border-line sm:mt-14">
          {writing.articles.map((article, index) => (
            <ArticleRow key={article.url} article={article} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
