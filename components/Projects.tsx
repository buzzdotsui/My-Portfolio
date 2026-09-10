import React from 'react';
import { SectionId, Project } from '../types';
import { Badge } from './ui/Badge';
import { Github, ArrowRight, ExternalLink } from 'lucide-react';
import { OptimizedImage } from './ui/OptimizedImage';
import { MotionWrapper } from './ui/MotionWrapper';

// ──────────────────────────────────────────────────────────
// STATUS badge colours
// ──────────────────────────────────────────────────────────
const statusStyle: Record<string, { border: string; bg: string; color: string }> = {
  'LIVE':                   { border: 'rgba(16,185,129,0.3)',  bg: 'rgba(16,185,129,0.08)',  color: '#10b981' },
  'CLIENT WORK':            { border: 'rgba(14,165,233,0.3)',  bg: 'rgba(14,165,233,0.08)',  color: '#0ea5e9' },
  'RESEARCH / PROTOTYPING': { border: 'rgba(245,158,11,0.3)',  bg: 'rgba(245,158,11,0.08)',  color: '#f59e0b' },
};

// ──────────────────────────────────────────────────────────
// Project data — verified content only
// ──────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 'accurate-hms',
    title: 'Accurate Medical Center HMS',
    shortDescription: 'Full-stack hospital management system for patient records, appointments, and clinical workflows.',
    description: 'A comprehensive hospital management system handling patient records, appointments, role-based access control, and administrative workflows for Accurate Medical Center.',
    problem: 'Healthcare facilities need secure, reliable systems that protect patient data while streamlining day-to-day operational workflows across clinical and admin departments.',
    outcome: 'Delivered a production-ready HMS with secure authentication, role-based permissions, and structured data flow — now live and in active use.',
    role: 'Sole developer — full-stack design, build, and deployment',
    status: 'LIVE',
    significance: 'signature',
    category: 'Full-Stack · Client Work',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Prisma'],
    screenshots: [
      '/Accurate medical screenshots/Screenshot 2026-09-08 172240.png',
      '/Accurate medical screenshots/Screenshot 2026-09-08 172251.png',
      '/Accurate medical screenshots/Screenshot 2026-09-08 172319.png',
      '/Accurate medical screenshots/Screenshot 2026-09-08 172330.png',
      '/Accurate medical screenshots/Screenshot 2026-09-08 172411.png',
    ],
    imageUrl: '/Accurate medical screenshots/Screenshot 2026-09-08 172240.png',
    liveUrl: 'https://accurate-medical.vercel.app/',
    githubUrl: 'https://github.com/buzzdotsui',
    featured: true,
  },
  {
    id: 'juphil-aluminum',
    title: 'Juphil Aluminum',
    shortDescription: 'Digital platform for an industrial aluminum manufacturing company.',
    description: 'A performant digital platform for a Nigerian aluminum manufacturing company — bridging physical manufacturing capabilities with professional digital presence.',
    problem: 'A manufacturing company needed a modern digital presence to showcase industrial capabilities, communicate quality standards, and handle customer inquiries.',
    outcome: 'Built a responsive, performant web platform that accurately represents industrial capabilities and serves as the company\'s professional digital front.',
    role: 'Sole developer — design, development, and deployment',
    status: 'LIVE',
    significance: 'signature',
    category: 'Web Platform · Client Work',
    tags: ['React', 'Next.js', 'TailwindCSS', 'Performance'],
    screenshots: [
      '/Juphil screenshots/Screenshot 2026-09-08 172456.png',
      '/Juphil screenshots/Screenshot 2026-09-08 172506.png',
      '/Juphil screenshots/Screenshot 2026-09-08 172524.png',
      '/Juphil screenshots/Screenshot 2026-09-08 172550.png',
    ],
    imageUrl: '/Juphil screenshots/Screenshot 2026-09-08 172456.png',
    liveUrl: 'https://juphil.vercel.app/',
    githubUrl: 'https://github.com/buzzdotsui',
    featured: true,
  },
  {
    id: 'metabotics-initiative',
    title: 'Metabotics',
    shortDescription: 'Technology initiative building intelligent monitoring and data-driven systems for industrial processes.',
    description: 'An emerging technology initiative to bridge software engineering and materials science — developing intelligent monitoring, automation, and data infrastructure for industrial processes.',
    problem: 'Industrial processes are largely opaque — data-rich in theory but difficult to observe, interpret, and act on without sophisticated software infrastructure.',
    outcome: 'Exploring a unified sensing-to-optimization architecture: how software engineering principles can be applied to physical materials systems.',
    role: 'Founder and sole developer — research, architecture, and build',
    status: 'RESEARCH / PROTOTYPING',
    significance: 'signature',
    category: 'Industrial Tech',
    tags: ['Systems Design', 'Industrial IoT', 'Data Infrastructure', 'Automation'],
    liveUrl: 'https://metabotics.vercel.app/',
    githubUrl: 'https://github.com/buzzdotsui',
    featured: true,
  },
];

// ──────────────────────────────────────────────────────────
// ProjectCard
// ──────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const sStyle = statusStyle[project.status] ?? statusStyle['LIVE'];

  return (
    <article
      onClick={() => onSelect(project)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(project)}
      className="group relative rounded-lg border border-border bg-surface/40 hover:border-primary/35 transition-all duration-300 overflow-hidden cursor-pointer signal-card flex flex-col"
      tabIndex={0}
      role="button"
      aria-label={`View project: ${project.title}`}
    >
      {/* Screenshot / thumbnail */}
      <div className="h-48 w-full overflow-hidden relative border-b border-border/60 bg-surface">
        {project.imageUrl ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent z-10" />
            <OptimizedImage
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              wrapperClassName="h-full w-full"
              className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
            />
          </>
        ) : (
          /* Metabotics — no screenshot yet, show a minimal placeholder */
          <div className="h-full w-full flex items-center justify-center bg-surface relative overflow-hidden">
            <div className="absolute inset-0 bg-schematic opacity-80" />
            <div className="relative z-10 text-center">
              <div className="text-3xl font-bold font-mono text-primary/20 mb-1">M</div>
              <div className="text-[10px] font-mono text-text-dim tracking-widest uppercase">Research / Prototyping</div>
            </div>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3 z-20">
          <span
            className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-1 rounded-sm border"
            style={{ borderColor: sStyle.border, background: sStyle.bg, color: sStyle.color }}
          >
            {project.status}
          </span>
        </div>

        {/* Live link */}
        {project.liveUrl && (
          <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-background/90 border border-border text-text-muted hover:text-primary hover:border-primary/40 rounded text-[11px] font-mono transition-colors"
              aria-label={`Visit ${project.title} live`}
            >
              <ExternalLink size={11} /> Live
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-[10px] font-mono text-text-dim mb-2">{project.category}</div>
        <h3
          className="text-lg font-bold text-text-main group-hover:text-primary transition-colors mb-2 leading-snug"
          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
        >
          {project.title}
        </h3>

        <p className="text-sm text-text-muted leading-relaxed mb-4 font-light">
          {project.shortDescription ?? project.description}
        </p>

        {/* Problem → Outcome */}
        <div className="space-y-2.5 mb-5 mt-auto">
          {project.problem && (
            <div className="p-3 rounded bg-background/50 border border-border/40">
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
            Case study <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </article>
  );
};

// ──────────────────────────────────────────────────────────
// Projects Section
// ──────────────────────────────────────────────────────────
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
            Featured Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-3" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            Selected Projects
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            Engineering depth across software, web, and physical systems. Each project is framed around the problem it solves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={onProjectSelect} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 pt-8 border-t border-border/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 reveal">
          <p className="text-xs font-mono text-text-dim">
            All projects listed are real, shipped work. No fabricated case studies.
          </p>
          <a
            href="https://github.com/buzzdotsui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-primary transition-colors"
          >
            <Github size={13} /> View GitHub
          </a>
        </div>

      </MotionWrapper>
    </section>
  );
};


