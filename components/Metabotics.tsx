import React from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { ExternalLink, Activity, Brain, LineChart, RefreshCw, ArrowRight } from 'lucide-react';

const pipelineStages = [
  {
    id: 'sense',
    label: '01',
    title: 'Sense',
    icon: Activity,
    color: '#0ea5e9',
    desc: 'Capture real-world industrial signals through sensors and data acquisition systems.',
    detail: 'Temperature, pressure, vibration, chemical composition — the raw language of physical systems.',
  },
  {
    id: 'understand',
    label: '02',
    title: 'Understand',
    icon: Brain,
    color: '#10b981',
    desc: 'Transform raw industrial data into structured, meaningful computational information.',
    detail: 'Parsing noise, identifying patterns, building the data models that describe what is actually happening.',
  },
  {
    id: 'predict',
    label: '03',
    title: 'Predict',
    icon: LineChart,
    color: '#f59e0b',
    desc: 'Use analytics and intelligent models to surface anomalies, inefficiencies, and potential failures.',
    detail: 'Statistical baselines, threshold detection, and early-stage ML exploration.',
  },
  {
    id: 'optimize',
    label: '04',
    title: 'Optimize',
    icon: RefreshCw,
    color: '#a78bfa',
    desc: 'Create feedback systems capable of driving continuous improvement in industrial processes.',
    detail: 'Closing the loop between observation and action — the long-term goal.',
  },
];

export const Metabotics: React.FC = () => {
  return (
    <section id={SectionId.METABOTICS} className="py-28 px-5 md:px-8 bg-background border-t border-border/40 relative overflow-hidden">
      {/* Engineering grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[160px] pointer-events-none" />

      <MotionWrapper className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 reveal">
          <div className="lg:col-span-8">
            <div className="mono-label mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-primary/50" />
              Technology Initiative
              <span className="w-1.5 h-1.5 bg-primary rounded-full signal-pulse ml-1" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-text-main mb-4 leading-tight" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
              Building Metabotics.
            </h2>
            <p className="text-xl md:text-2xl text-text-muted font-light">
              Intelligence for industry.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end items-start">
            <a
              href="https://metabotics.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-surface/60 text-text-muted text-sm font-medium rounded hover:border-primary/40 hover:text-text-main hover:bg-surface transition-all group"
            >
              Explore Metabotics
              <ExternalLink size={14} className="group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-3xl mb-16 reveal">
          <p className="text-base md:text-lg text-text-muted leading-relaxed">
            Metabotics is my attempt to bridge software engineering and materials science by developing{' '}
            <span className="text-text-main font-medium">intelligent monitoring, automation, and data-driven systems</span>{' '}
            for materials and industrial processes. It is an emerging initiative — built on a clear long-term vision and honest about where it currently stands.
          </p>
        </div>

        {/* Pipeline */}
        <div className="mb-16">
          <div className="mono-label mb-8 flex items-center gap-3 reveal">
            <span className="w-4 h-px bg-border" />
            Conceptual Architecture
            <span className="w-4 h-px bg-border" />
          </div>

          {/* Pipeline stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            {pipelineStages.map((stage, idx) => (
              <div key={stage.id} className="relative group">
                {/* Desktop connector arrow */}
                {idx < pipelineStages.length - 1 && (
                  <div className="hidden lg:flex absolute top-[44px] left-[calc(100%+0px)] w-4 items-center justify-center z-10">
                    <ArrowRight size={12} className="text-border group-hover:text-primary/50 transition-colors" />
                  </div>
                )}

                <div className="p-5 rounded-lg border border-border bg-surface/50 hover:bg-surface transition-all duration-300 h-full relative overflow-hidden signal-card">
                  {/* Color accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, ${stage.color}40, ${stage.color}80, ${stage.color}40)` }}
                  />

                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center"
                      style={{ background: `${stage.color}15`, border: `1px solid ${stage.color}25` }}
                    >
                      <stage.icon size={18} style={{ color: stage.color }} />
                    </div>
                    <span className="text-[10px] font-mono text-text-dim">{stage.label}</span>
                  </div>

                  <h4
                    className="text-sm font-bold uppercase tracking-wider mb-3 transition-colors group-hover:text-text-main"
                    style={{ color: stage.color }}
                  >
                    {stage.title}
                  </h4>

                  <p className="text-xs text-text-muted leading-relaxed mb-3">
                    {stage.desc}
                  </p>

                  <p className="text-[10px] text-text-dim leading-relaxed font-mono border-t border-border/40 pt-3">
                    {stage.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div className="p-6 rounded-lg border border-border bg-surface/30 grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
          <div>
            <div className="mono-label mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent signal-pulse" />
              Current State
            </div>
            <p className="text-sm text-text-main font-medium mb-1">Research &amp; Prototyping</p>
            <p className="text-xs text-text-muted leading-relaxed">
              Building foundational software and data infrastructure. Exploring sensor integration patterns and industrial data modeling.
            </p>
          </div>
          <div className="md:border-l md:border-border/40 md:pl-6">
            <div className="mono-label mb-3">Long-Term Vision</div>
            <p className="text-sm text-text-main font-medium mb-1">Intelligent Industrial Systems</p>
            <p className="text-xs text-text-muted leading-relaxed">
              Systems that can sense, understand, predict, and optimize industrial processes — making them more observable, efficient, and adaptive.
            </p>
          </div>
        </div>

      </MotionWrapper>
    </section>
  );
};
