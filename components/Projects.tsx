import React, { useState } from 'react';
import { SectionId, Project } from '../types';
import { Github, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { OptimizedImage } from './ui/OptimizedImage';
import { MotionWrapper } from './ui/MotionWrapper';

// ──────────────────────────────────────────────────────────
// STATUS styles
// ──────────────────────────────────────────────────────────
const statusStyle: Record<string, { border: string; bg: string; color: string }> = {
  'LIVE':                   { border: 'rgba(16,185,129,0.3)',  bg: 'rgba(16,185,129,0.08)',  color: '#10b981' },
  'CLIENT WORK':            { border: 'rgba(14,165,233,0.3)',  bg: 'rgba(14,165,233,0.08)',  color: '#0ea5e9' },
  'RESEARCH / PROTOTYPING': { border: 'rgba(245,158,11,0.3)',  bg: 'rgba(245,158,11,0.08)',  color: '#f59e0b' },
};

// ──────────────────────────────────────────────────────────
// Verified project data — real evidence only
// ──────────────────────────────────────────────────────────
export const projectsData: Project[] = [
  {
    id: 'accurate-hms',
    number: '01',
    title: 'Accurate Medical Center HMS',
    shortDescription: 'Hospital management system handling patient records, appointments, role-based access control, and clinical workflows.',
    description: 'A comprehensive, production-ready hospital management system built for Accurate Medical Center. Handles secure authentication, patient records, role-based staff permissions, appointment scheduling, and clinical administrative workflows.',
    problem: 'Healthcare facilities need secure, reliable systems that protect sensitive patient data while enabling clinical and administrative staff to work efficiently — without the overhead of expensive enterprise software.',
    context: 'Built as a full-stack commissioned project for a real medical facility. The HMS needed to support multiple user roles (admin, doctors, nurses, reception) with appropriate permission levels across every system function.',
    role: 'Sole developer — full-stack design, architecture, build, and Vercel deployment.',
    whatWasBuilt: 'A complete HMS covering: secure authentication with role-based access control, patient registration and records management, appointment scheduling system, administrative dashboards, and structured clinical workflows. Deployed to Vercel and live in active use.',
    technicalApproach: 'Built with React (TypeScript) on the frontend, Node.js + Express backend, PostgreSQL database with Prisma ORM. Authentication implemented with JWT and role-based middleware. Deployed on Vercel with environment-separated configuration.',
    currentState: 'Live and in production use at Accurate Medical Center.',
    status: 'LIVE',
    significance: 'signature',
    category: 'Software · Healthcare · Client Work',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Prisma', 'JWT Auth', 'RBAC'],
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
    decisions: [
      'Chose Prisma ORM for type-safe database access and easier schema migrations',
      'Implemented role-based middleware at the API route level to enforce permissions server-side',
      'Used JWT for stateless authentication to support multi-device access without session overhead',
    ],
    challenges: [
      'Designing a permission model flexible enough to cover multiple clinical roles without becoming unmaintainable',
      'Ensuring data consistency across patient records, appointments, and billing workflows',
    ],
    lessons: [
      'Healthcare systems require extremely careful attention to data integrity and permission boundaries',
      'Early investment in a clear data model pays dividends throughout the entire build',
    ],
  },
  {
    id: 'metabotics-initiative',
    number: '02',
    title: 'Metabotics',
    shortDescription: 'A technology initiative building intelligent monitoring and automation systems for industrial processes.',
    description: 'Metabotics is my attempt to bridge software engineering and materials science by developing intelligent monitoring, automation, and data infrastructure for industrial processes. An emerging initiative built on a clear long-term vision — honest about where it currently stands.',
    problem: 'Industrial processes are largely opaque — data-rich in theory but difficult to observe, interpret, and act on without sophisticated software infrastructure. Most industrial operations in emerging markets lack the tooling to make their processes intelligent.',
    context: 'Born from the question: what if you applied software engineering\'s rigor to physical industrial systems? The engineering coursework at FUTA provided the domain knowledge; the software background provided the tools.',
    role: 'Founder and sole developer — research, architecture, and build.',
    whatWasBuilt: 'The Metabotics conceptual architecture (Sense → Understand → Predict → Optimize) and initial web platform. Currently building foundational software infrastructure and exploring sensor integration patterns.',
    technicalApproach: 'Researching industrial data acquisition patterns, sensor integration approaches, and data modeling strategies for materials processes. The current platform demonstrates the vision and direction.',
    currentState: 'Research and prototyping phase. The long-term vision is live and the conceptual architecture is established. Active development of the foundational infrastructure.',
    status: 'RESEARCH / PROTOTYPING',
    significance: 'signature',
    category: 'Industrial Technology · AI · Automation',
    tags: ['Systems Design', 'Industrial IoT', 'Data Infrastructure', 'Automation', 'AI'],
    liveUrl: 'https://metabotics.vercel.app/',
    githubUrl: 'https://github.com/buzzdotsui',
    featured: true,
    decisions: [
      'Committed to honest labeling — clearly distinguishing what exists vs. what is being explored vs. vision',
      'Started with the conceptual architecture before building specific tooling',
    ],
    lessons: [
      'The intersection of software engineering and industrial systems is genuinely underserved — there is real opportunity',
      'Engineering domain knowledge is a genuine competitive advantage in this space',
    ],
  },
  {
    id: 'juphil-aluminum',
    number: '03',
    title: 'Juphil Aluminum',
    shortDescription: 'Digital platform for a Nigerian aluminum manufacturing company — bridging industrial capability with professional digital presence.',
    description: 'A performant digital platform for Juphil Aluminum, a Nigerian aluminum manufacturing company. The project bridges physical manufacturing capabilities with professional digital presence — demonstrating the intersection of software and industrial context.',
    problem: 'A manufacturing company needed a modern digital presence to showcase industrial capabilities, communicate quality standards, and serve as a professional interface for potential clients and partners.',
    context: 'This project is strategically relevant because it sits at the intersection of software development and industrial/manufacturing context — directly relevant to the Metabotics vision.',
    role: 'Sole developer — design, development, and deployment.',
    whatWasBuilt: 'A responsive, performant web platform that accurately represents industrial manufacturing capabilities, product ranges, and company identity. Deployed and live.',
    technicalApproach: 'Built with React and Next.js for performance and SEO. Tailwind CSS for responsive styling. Deployed to Vercel with optimized assets for fast loading on variable network conditions.',
    currentState: 'Live and deployed. Serving as the company\'s professional digital presence.',
    status: 'LIVE',
    significance: 'signature',
    category: 'Web Platform · Client Work · Industrial',
    tags: ['React', 'Next.js', 'TailwindCSS', 'Performance', 'Vercel'],
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
];

// ──────────────────────────────────────────────────────────
// Screenshot carousel for featured card
// ──────────────────────────────────────────────────────────
const MiniCarousel: React.FC<{ screenshots: string[]; title: string }> = ({ screenshots, title }) => {
  const [active, setActive] = useState(0);
  if (screenshots.length === 0) return null;
  const prev = () => setActive((i) => (i === 0 ? screenshots.length - 1 : i - 1));
  const next = () => setActive((i) => (i === screenshots.length - 1 ? 0 : i + 1));
  return (
    <div className="relative w-full h-full group/carousel">
      <OptimizedImage
        src={screenshots[active]}
        alt={`${title} screenshot ${active + 1}`}
        className="w-full h-full object-cover object-top transition-opacity duration-300"
      />
      {screenshots.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/80 border border-border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity text-text-muted hover:text-primary"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/80 border border-border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity text-text-muted hover:text-primary"
            aria-label="Next screenshot"
          >
            <ChevronRight size={14} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActive(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === active ? 'bg-primary' : 'bg-white/40'}`}
                aria-label={`Screenshot ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────────────────
// Large featured project card
// ──────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
  index: number;
}

const FeaturedProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index }) => {
  const sStyle = statusStyle[project.status] ?? statusStyle['LIVE'];
  const isEven = index % 2 === 0;
  const screenshots = project.screenshots ?? [];

  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border rounded-lg overflow-hidden bg-surface/20 hover:bg-surface/40 transition-all duration-300 group"
    >
      {/* Image — alternates left/right */}
      <div className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-surface ${isEven ? '' : 'lg:order-2'}`}>
        {screenshots.length > 0 ? (
          <MiniCarousel screenshots={screenshots} title={project.title} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface relative">
            <div className="absolute inset-0" style={{
              backgroundSize: '24px 24px',
              backgroundImage: 'linear-gradient(to right, rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,165,233,0.06) 1px, transparent 1px)',
            }} />
            <div className="relative text-center">
              <div className="text-4xl font-bold font-mono text-primary/15 mb-2">M</div>
              <div className="text-[10px] font-mono text-text-dim tracking-widest uppercase">Research / Prototyping</div>
            </div>
          </div>
        )}
        {/* Status badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-1 rounded-sm border"
            style={{ borderColor: sStyle.border, background: sStyle.bg, color: sStyle.color }}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col p-8 ${isEven ? '' : 'lg:order-1'}`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="text-[10px] font-mono text-text-dim uppercase tracking-widest">{project.category}</div>
          <span className="text-2xl font-bold font-mono text-border/50 shrink-0">{project.number}</span>
        </div>

        <h3
          className="text-2xl font-bold text-text-main mb-3 leading-snug group-hover:text-primary transition-colors"
          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
        >
          {project.title}
        </h3>

        <p className="text-sm text-text-muted leading-relaxed mb-5 font-light flex-grow">
          {project.shortDescription ?? project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-background border border-border/60 text-text-dim">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-5 border-t border-border/40">
          <button
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-main hover:text-primary transition-colors group/btn"
          >
            Case study <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors"
            >
              <ExternalLink size={12} /> Live site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors"
            >
              <Github size={12} /> GitHub
            </a>
          )}
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
    <section
      id={SectionId.PORTFOLIO}
      className="py-24 px-5 md:px-8 bg-background border-t border-border/40"
      aria-labelledby="portfolio-heading"
    >
      <MotionWrapper className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14 reveal">
          <div className="mono-label mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            Portfolio
          </div>
          <h2
            id="portfolio-heading"
            className="text-3xl md:text-4xl font-bold text-text-main mb-3"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Featured Projects
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            Real work. Real screenshots. Each project is documented with its actual context, role, and current state.
          </p>
        </div>

        {/* Projects — large alternating layout */}
        <div className="space-y-6 stagger-children">
          {projectsData.map((project, idx) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              onSelect={onProjectSelect}
              index={idx}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 pt-8 border-t border-border/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 reveal">
          <p className="text-xs font-mono text-text-dim">
            All projects listed are real, shipped work. No fabricated case studies or invented metrics.
          </p>
          <a
            href="https://github.com/buzzdotsui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-primary transition-colors"
          >
            <Github size={13} /> View GitHub profile
          </a>
        </div>

      </MotionWrapper>
    </section>
  );
};
