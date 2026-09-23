import { projects } from '../data/projects';
import type { Project } from '../types';
import { ArrowUpRightIcon } from './Icons';
import { SectionLabel } from './SectionLabel';

function ProjectEntry({ project }: { project: Project }) {
  const external = Boolean(project.url && project.urlLabel);

  return (
    <article data-reveal className="project-entry">
      <span className="project-ghost" aria-hidden="true">
        {project.number}
      </span>

      <div className="project-body">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="mono-label">
            <span className="text-accent">{project.number}</span>
            <span className="mx-3 text-line" aria-hidden="true">
              /
            </span>
            <span>{project.status}</span>
          </p>
          <p className="mono-label">{project.role}</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h3 className="project-title display">{project.name}</h3>
            <p className="mt-4 max-w-md text-[15px] leading-[1.7] text-mute sm:text-base">
              {project.description}
            </p>

            {project.stack.length > 0 && (
              <ul
                className="mt-6 flex flex-wrap gap-x-4 gap-y-2"
                aria-label="Technologies used"
              >
                {project.stack.map((tech) => (
                  <li key={tech} className="mono-label">
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-7">
            {project.image && external ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-visual group"
                aria-label={`Visit ${project.name} at ${project.urlLabel} (opens in new tab)`}
              >
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  loading="lazy"
                  decoding="async"
                  className="img-zoom h-full w-full object-cover object-top"
                />
              </a>
            ) : project.image ? (
              <div className="project-visual">
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            ) : external ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-plate group min-h-[15rem] w-full"
                aria-label={`Visit ${project.name} at ${project.urlLabel} (opens in new tab)`}
              >
                <span className="mono-label">Live product</span>
                <span className="block">
                  <span className="block font-mono text-lg text-paper sm:text-2xl">
                    {project.plate?.domain}
                  </span>
                  <span className="mt-3 block space-y-1">
                    {project.plate?.lines.map((line) => (
                      <span key={line} className="block text-sm text-mute">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="mono-label flex items-center gap-2 text-accent">
                  View site
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </span>
              </a>
            ) : (
              <div className="mono-plate min-h-[15rem] w-full">
                <span className="mono-label">Project overview</span>
                <span className="block">
                  <span className="block font-mono text-lg text-paper sm:text-2xl">
                    {project.plate?.domain}
                  </span>
                  <span className="mt-3 block space-y-1">
                    {project.plate?.lines.map((line) => (
                      <span key={line} className="block text-sm text-mute">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            )}

            {external && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <p className="mono-label break-all">{project.urlLabel}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-cta text-paper transition-colors duration-200 hover:text-accent"
                >
                  View Project
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="section">
      <div className="shell">
        <div data-reveal className="section-head">
          <SectionLabel num="01" label="Selected Work" />
          <h2 className="display display-md mt-5">Shipped and in use.</h2>
          <p className="lede mt-4">
            Products in production: what it is, what I did, and what it was built with.
          </p>
        </div>

        <div className="mt-14 sm:mt-16">
          {projects.map((project) => (
            <ProjectEntry key={project.number} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
