import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { Footer } from './Footer';
import { OptimizedImage } from './ui/OptimizedImage';
import { Navbar } from './Navbar';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const statusStyle: Record<string, { border: string; bg: string; color: string }> = {
  'LIVE':                   { border: 'rgba(16,185,129,0.3)',  bg: 'rgba(16,185,129,0.08)',  color: '#10b981' },
  'CLIENT WORK':            { border: 'rgba(14,165,233,0.3)',  bg: 'rgba(14,165,233,0.08)',  color: '#0ea5e9' },
  'RESEARCH / PROTOTYPING': { border: 'rgba(245,158,11,0.3)',  bg: 'rgba(245,158,11,0.08)',  color: '#f59e0b' },
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const screenshots = project.screenshots ?? (project.imageUrl ? [project.imageUrl] : []);
  const sStyle = statusStyle[project.status] ?? statusStyle['LIVE'];

  const prev = () => setActiveScreenshot((i) => (i === 0 ? screenshots.length - 1 : i - 1));
  const next = () => setActiveScreenshot((i) => (i === screenshots.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Back bar */}
      <div className="sticky top-[60px] z-40 border-b border-border/60 bg-background/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-12 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors group"
            aria-label="Back to projects"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to work
          </button>
          <div className="h-4 w-px bg-border/60" />
          <span className="text-sm font-mono text-text-dim truncate">{project.title}</span>
          <div className="ml-auto">
            <span
              className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-1 rounded-sm border"
              style={{ borderColor: sStyle.border, background: sStyle.bg, color: sStyle.color }}
            >
              {project.status}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-5 md:px-8 py-16" id="main-content">

        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-mono text-text-dim mb-3 tracking-wider uppercase">{project.category}</div>
          <h1
            className="text-3xl md:text-5xl font-bold text-text-main mb-4 leading-tight"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            {project.title}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed font-light mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded hover:bg-primary-hover transition-all"
              >
                <ExternalLink size={14} /> View live site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-muted text-sm font-medium rounded hover:border-primary/40 hover:text-text-main transition-all"
              >
                <Github size={14} /> GitHub
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Main content */}
          <div className="lg:col-span-8 space-y-10">

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <div>
                <div className="mono-label mb-4 flex items-center gap-2">
                  <span className="w-4 h-px bg-border" />
                  Screenshots
                  {screenshots.length > 1 && (
                    <span className="text-text-dim ml-2">{activeScreenshot + 1} / {screenshots.length}</span>
                  )}
                </div>
                <div className="relative rounded-lg overflow-hidden border border-border bg-surface aspect-video group">
                  <OptimizedImage
                    src={screenshots[activeScreenshot]}
                    alt={`${project.title} screenshot ${activeScreenshot + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                  {screenshots.length > 1 && (
                    <>
                      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 border border-border text-text-muted hover:text-primary flex items-center justify-center transition-all opacity-0 group-hover:opacity-100" aria-label="Previous screenshot">
                        <ChevronLeft size={16} />
                      </button>
                      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 border border-border text-text-muted hover:text-primary flex items-center justify-center transition-all opacity-0 group-hover:opacity-100" aria-label="Next screenshot">
                        <ChevronRight size={16} />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {screenshots.map((_, i) => (
                          <button key={i} onClick={() => setActiveScreenshot(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeScreenshot ? 'bg-primary' : 'bg-white/40'}`} aria-label={`Screenshot ${i + 1}`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                {screenshots.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {screenshots.map((src, i) => (
                      <button key={i} onClick={() => setActiveScreenshot(i)} className={`shrink-0 w-20 h-14 rounded overflow-hidden border transition-all ${i === activeScreenshot ? 'border-primary' : 'border-border opacity-50 hover:opacity-80'}`} aria-label={`Thumbnail ${i + 1}`}>
                        <OptimizedImage src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover object-top" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* No screenshots placeholder (Metabotics) */}
            {screenshots.length === 0 && (
              <div className="rounded-lg border border-border bg-surface/40 p-12 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold font-mono text-primary/15 mb-3">M</div>
                <div className="text-xs font-mono text-text-dim">Screenshots will be available as the prototype develops.</div>
              </div>
            )}

            {/* Problem */}
            {project.problem && (
              <div>
                <div className="mono-label mb-4 flex items-center gap-2"><span className="w-4 h-px bg-border" /> The Problem</div>
                <div className="p-6 rounded-lg border border-border bg-surface/30">
                  <p className="text-base text-text-muted leading-relaxed">{project.problem}</p>
                </div>
              </div>
            )}

            {/* Context */}
            {project.context && (
              <div>
                <div className="mono-label mb-4 flex items-center gap-2"><span className="w-4 h-px bg-border" /> Context</div>
                <p className="text-sm text-text-muted leading-relaxed">{project.context}</p>
              </div>
            )}

            {/* What was built */}
            {project.whatWasBuilt && (
              <div>
                <div className="mono-label mb-4 flex items-center gap-2"><span className="w-4 h-px bg-secondary/50" /> What Was Built</div>
                <div className="p-6 rounded-lg border border-secondary/20 bg-secondary/5">
                  <p className="text-base text-text-muted leading-relaxed">{project.whatWasBuilt}</p>
                </div>
              </div>
            )}

            {/* Technical approach */}
            {project.technicalApproach && (
              <div>
                <div className="mono-label mb-4 flex items-center gap-2"><span className="w-4 h-px bg-border" /> Technical Approach</div>
                <p className="text-sm text-text-muted leading-relaxed">{project.technicalApproach}</p>
              </div>
            )}

            {/* Key decisions */}
            {project.decisions && project.decisions.length > 0 && (
              <div>
                <div className="mono-label mb-4 flex items-center gap-2"><span className="w-4 h-px bg-border" /> Key Decisions</div>
                <ul className="space-y-2">
                  {project.decisions.map((d, i) => (
                    <li key={i} className="flex gap-3 text-sm text-text-muted">
                      <span className="text-primary/50 mt-1">›</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div>
                <div className="mono-label mb-4 flex items-center gap-2"><span className="w-4 h-px bg-border" /> Challenges</div>
                <ul className="space-y-2">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex gap-3 text-sm text-text-muted">
                      <span className="text-accent/60 mt-1">›</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Current state */}
            {project.currentState && (
              <div>
                <div className="mono-label mb-4 flex items-center gap-2"><span className="w-4 h-px bg-primary/50" /> Current State</div>
                <div className="p-5 rounded-lg border border-primary/20 bg-primary/5">
                  <p className="text-sm text-text-muted leading-relaxed">{project.currentState}</p>
                </div>
              </div>
            )}

            {/* Lessons */}
            {project.lessons && project.lessons.length > 0 && (
              <div>
                <div className="mono-label mb-4 flex items-center gap-2"><span className="w-4 h-px bg-border" /> Lessons</div>
                <ul className="space-y-2">
                  {project.lessons.map((l, i) => (
                    <li key={i} className="flex gap-3 text-sm text-text-muted">
                      <span className="text-secondary/60 mt-1">›</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            {project.role && (
              <div className="p-5 rounded-lg border border-border bg-surface/30">
                <div className="mono-label mb-3">My Role</div>
                <p className="text-sm text-text-muted leading-relaxed">{project.role}</p>
              </div>
            )}

            {project.tags.length > 0 && (
              <div className="p-5 rounded-lg border border-border bg-surface/30">
                <div className="mono-label mb-4">Technology</div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2.5 py-1 rounded-sm border border-border text-text-muted bg-background/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-5 rounded-lg border bg-surface/30" style={{ borderColor: sStyle.border }}>
              <div className="mono-label mb-3">Status</div>
              <span
                className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-sm border inline-block"
                style={{ borderColor: sStyle.border, background: sStyle.bg, color: sStyle.color }}
              >
                {project.status}
              </span>
              {project.status === 'RESEARCH / PROTOTYPING' && (
                <p className="text-xs text-text-dim mt-3 leading-relaxed">
                  This is an emerging initiative in active development. The vision is established; the infrastructure is being built.
                </p>
              )}
            </div>

            {(project.liveUrl || project.githubUrl) && (
              <div className="p-5 rounded-lg border border-border bg-surface/30 space-y-3">
                <div className="mono-label mb-2">Links</div>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors font-mono">
                    <ExternalLink size={12} /> Live site
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors font-mono">
                    <Github size={12} /> GitHub profile
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
