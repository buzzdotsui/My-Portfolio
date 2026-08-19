import React from 'react';
import { SectionId, Project } from '../types';
import { Badge } from './ui/Badge';
import { Github, ArrowRight, ExternalLink } from 'lucide-react';
import { OptimizedImage } from './ui/OptimizedImage';
import { MotionWrapper } from './ui/MotionWrapper';

const projects: Project[] = [
  {
    id: 'metabotics-init',
    title: 'Metabotics',
    description: 'A technology initiative to bridge software engineering and materials science with intelligent monitoring, automation, and data-driven systems for industrial processes.',
    problem: 'Industrial processes are largely opaque — data-rich in theory, but difficult to observe, interpret, and act on without sophisticated software infrastructure.',
    outcome: 'Developing a unified sensing-to-optimization architecture exploring how software engineering principles apply to physical materials systems.',
    category: 'Industrial Tech',
    tags: ['Systems Design', 'Industrial IoT', 'Data Infrastructure', 'Automation'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    githubUrl: 'https://github.com/buzzdotsui',
    featured: true,
  },
  {
    id: 'accurate-hms',
    title: 'Accurate Medical Center HMS',
    description: 'A comprehensive, full-stack hospital management system built to handle patient records, appointments, role-based access, and administrative workflows at scale.',
    problem: 'Healthcare facilities need secure, highly available systems that protect patient data while streamlining day-to-day operational workflows.',
    outcome: 'Delivered a production-ready HMS with secure authentication, granular role-based permissions, and structured data flow across clinical and administrative departments.',
    category: 'Full-Stack',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Prisma'],
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514',
    githubUrl: 'https://github.com/buzzdotsui',
    featured: true,
  },
  {
    id: 'juphil-aluminum',
    title: 'Juphil Aluminum',
    description: 'A performant digital platform for an industrial aluminum manufacturing company — bridging physical manufacturing capabilities with digital accessibility.',
    problem: 'A manufacturing company needed a modern digital presence to showcase capabilities, communicate quality standards, and handle customer inquiries efficiently.',
    outcome: 'Built a responsive, performant web platform that accurately represents industrial capabilities and serves as a professional digital front for a physical business.',
    category: 'Web Platform',
    tags: ['React', 'Next.js', 'TailwindCSS', 'Performance'],
    imageUrl: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c',
    githubUrl: 'https://github.com/buzzdotsui',
    featured: true,
  },
  {
    id: 'metabotics-h01',
    title: 'METABOTICS H-01',
    description: 'A robotics and mechanical engineering prototype exploring software-driven automation concepts in a physical hardware environment.',
    problem: 'Needed a tangible testbed to validate software automation concepts against real physical constraints — not just simulated environments.',
    outcome: 'Engineered a functional prototype that bridges hardware constraints with software control, demonstrating the physical engineering side of Metabotics\' vision.',
    category: 'Robotics',
    tags: ['Hardware', 'Automation', 'Control Systems', 'Prototyping'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    githubUrl: 'https://github.com/buzzdotsui',
    featured: false,
  },
];

interface ProjectsProps {
  onProjectSelect: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onProjectSelect }) => {
  return (
    <section id={SectionId.PROJECTS} className="py-28 px-5 md:px-8 bg-background border-t border-border/40">
      <MotionWrapper className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14 reveal">
          <div className="mono-label mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            03 — Featured Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-3" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            Selected Projects
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            Engineering depth across software, web, and physical systems. Each project is framed around the problem it solves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
          {projects.map((project) => (
            <article
              key={project.id}
              onClick={() => onProjectSelect(project)}
              className="group relative rounded-lg border border-border bg-surface/40 hover:border-primary/35 transition-all duration-400 overflow-hidden cursor-pointer signal-card flex flex-col"
              tabIndex={0}
              role="button"
              aria-label={`View project: ${project.title}`}
              onKeyDown={(e) => e.key === 'Enter' && onProjectSelect(project)}
            >
              {/* Image */}
              <div className="h-44 w-full overflow-hidden relative border-b border-border/60">
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-10" />
                <OptimizedImage
                  src={`${project.imageUrl}?q=75&w=800&auto=format&fit=crop`}
                  alt={project.title}
                  wrapperClassName="h-full w-full"
                  className="opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out saturate-50 group-hover:saturate-75"
                />
                {/* Category tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="mono-label px-2 py-1 rounded-sm bg-background/85 border border-border/80 text-text-dim backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                {/* Actions */}
                <div className="absolute bottom-3 right-3 flex gap-2 z-20 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-background/90 border border-border text-text-muted hover:text-primary hover:border-primary/40 rounded transition-colors"
                      aria-label="GitHub repository"
                    >
                      <Github size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors mb-2 leading-snug" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                  {project.title}
                </h3>

                <p className="text-sm text-text-muted leading-relaxed mb-5 font-light">
                  {project.description}
                </p>

                {/* Problem / Outcome */}
                <div className="space-y-3 mb-5 mt-auto">
                  {project.problem && (
                    <div className="p-3 rounded bg-background/50 border border-border/50">
                      <div className="mono-label mb-1 text-text-dim">Problem</div>
                      <p className="text-xs text-text-muted leading-relaxed">{project.problem}</p>
                    </div>
                  )}
                  {project.outcome && (
                    <div className="p-3 rounded bg-secondary/5 border border-secondary/15">
                      <div className="mono-label mb-1 text-secondary/70">Outcome</div>
                      <p className="text-xs text-text-muted leading-relaxed">{project.outcome}</p>
                    </div>
                  )}
                </div>

                {/* Tags + CTA */}
                <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="neutral">{tag}</Badge>
                    ))}
                  </div>
                  <button className="text-[11px] font-bold uppercase font-mono flex items-center gap-1 text-text-dim group-hover:text-primary transition-colors shrink-0">
                    Details <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </MotionWrapper>
    </section>
  );
};