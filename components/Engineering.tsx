import React from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { BookOpen } from 'lucide-react';

const engineeringAreas = [
  {
    title: 'Materials Science',
    desc: 'Structure-property relationships in engineering materials — metals, polymers, ceramics, composites. Microstructural analysis and material selection.',
  },
  {
    title: 'Metallurgy',
    desc: 'Metal properties, processing techniques, heat treatment, phase transformations, and failure analysis.',
  },
  {
    title: 'Thermal Processing',
    desc: 'Annealing, hardening, tempering, and other thermal treatments that alter material properties for industrial application.',
  },
  {
    title: 'Manufacturing Systems',
    desc: 'Production processes, manufacturing techniques, quality control, and industrial workflow analysis.',
  },
  {
    title: 'Corrosion Science',
    desc: 'Understanding and mitigating degradation of materials in industrial environments.',
  },
  {
    title: 'Industrial Systems',
    desc: 'The physical infrastructure and processes that manufacturing and industrial operations depend on — the domain Metabotics is built to serve.',
  },
];

export const Engineering: React.FC = () => {
  return (
    <section
      id={SectionId.ENGINEERING}
      className="py-24 px-5 md:px-8 border-t border-border/40 bg-background"
      aria-labelledby="engineering-heading"
    >
      <MotionWrapper className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: heading + context */}
          <div className="lg:col-span-5">
            <div className="mono-label mb-4 flex items-center gap-2 reveal">
              <span className="w-4 h-px bg-primary/50" />
              Engineering / Academics
            </div>
            <h2
              id="engineering-heading"
              className="text-3xl md:text-4xl font-bold text-text-main mb-4 reveal"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              The engineering foundation.
            </h2>
            <p className="text-base text-text-muted leading-relaxed mb-6 reveal">
              Before software, I was drawn to how physical systems work — the chemistry of metals, the physics of manufacturing processes, the science of why materials fail. That foundation is what makes Metabotics possible.
            </p>

            {/* Institution card */}
            <div className="p-5 rounded-lg border border-border bg-surface/40 mb-6 reveal">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded flex items-center justify-center bg-primary/10 border border-primary/20 shrink-0">
                  <BookOpen size={16} className="text-primary" />
                </div>
                <div>
                  <h3
                    className="text-sm font-bold text-text-main mb-0.5"
                    style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                  >
                    B.Eng. Metallurgical & Materials Engineering
                  </h3>
                  <p className="text-xs font-mono text-primary/80">Federal University of Technology, Akure</p>
                  <p className="text-[10px] font-mono text-text-dim mt-1">In progress · FUTA · Akure, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Note on expanding */}
            <div className="p-4 rounded border border-border/40 bg-transparent reveal">
              <p className="text-[11px] font-mono text-text-dim leading-relaxed">
                This section will expand as academic work progresses — coursework evidence, lab reports, engineering projects, and research will be documented here.
              </p>
            </div>
          </div>

          {/* Right: subject areas */}
          <div className="lg:col-span-7">
            <div className="mono-label mb-6 reveal">Areas of Study</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-children">
              {engineeringAreas.map((area) => (
                <div
                  key={area.title}
                  className="p-4 rounded-lg border border-border bg-surface/30 hover:bg-surface/60 transition-all duration-200 group"
                >
                  <h3
                    className="text-sm font-bold text-text-main mb-2 group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                  >
                    {area.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </div>

            {/* Bridge to Metabotics */}
            <div className="mt-6 p-5 rounded-lg border border-primary/20 bg-primary/5 reveal">
              <p className="text-sm text-text-muted leading-relaxed">
                <span className="text-text-main font-semibold">Why this matters for Metabotics:</span> industrial intelligence systems require both software engineering and genuine domain knowledge of what happens inside physical processes. The engineering background is not decorative — it informs every design decision in the Metabotics architecture.
              </p>
            </div>
          </div>

        </div>
      </MotionWrapper>
    </section>
  );
};
