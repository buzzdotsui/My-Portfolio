import React from 'react';
import { SectionId } from '../types';
import { SectionHeading } from './ui/SectionHeading';
import { MotionWrapper } from './ui/MotionWrapper';
import { Award, BookOpen, ExternalLink, CalendarCheck } from 'lucide-react';

const credentials = [
  { label: 'CIS Benchmark Practitioner', status: 'Active', color: 'text-success border-success/30 bg-success/5' },
  { label: 'AWS Cloud Practitioner', status: 'In Progress', color: 'text-secondary border-secondary/30 bg-secondary/5' },
  { label: 'CompTIA Security+', status: 'Studying', color: 'text-primary border-primary/30 bg-primary/5' },
  { label: 'B.Eng. Metallurgical Engineering', status: 'Completed', color: 'text-success border-success/30 bg-success/5' },
];

const writings = [
  {
    title: 'Infrastructure Automation with Ansible',
    url: 'https://medium.com/@owolabitestimony',
    desc: 'A deep-dive into idempotent playbook design for production systems.',
  },
  {
    title: 'Zero Trust Security: A Practitioner\'s Perspective',
    url: 'https://medium.com/@owolabitestimony',
    desc: 'Applying zero-trust principles to bare-metal and cloud hybrid environments.',
  },
];

export const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-20 px-4 md:px-6 bg-surface/20 border-y border-border">
      <MotionWrapper className="max-w-6xl mx-auto">
        {/* Last updated — content freshness signal */}
        <div className="flex items-center gap-2 text-xs text-text-dim font-mono mb-6">
          <CalendarCheck size={13} className="text-primary/60" />
          <span>Last updated: <time dateTime="2026-03-17">March 2026</time></span>
        </div>

        <SectionHeading title="System Documentation" number="03" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Narrative */}
          <div className="md:col-span-7 space-y-10">
            <div>
              <h3 className="text-lg font-medium text-text-main mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-secondary rounded-full"></span>
                Background
              </h3>
              <div className="prose prose-invert prose-sm text-text-muted space-y-4">
                <p className="leading-7">
                  My engineering philosophy is derived from Metallurgical Engineering: materials have failure points, and so does software. I approach infrastructure with the same rigor used in physical stress testing.
                </p>
                <p className="leading-7">
                  Currently operating as a Systems Reliability Engineer, I focus on removing "hope" from deployment strategies. If a process relies on manual intervention, it is a bug. My work involves designing self-healing architectures, enforcing security compliance at the kernel level, and ensuring data integrity across distributed systems.
                </p>
              </div>
            </div>

            {/* Credentials — Expertise signal */}
            <div>
              <h3 className="text-lg font-medium text-text-main mb-5 flex items-center gap-2">
                <Award size={18} className="text-primary" />
                Credentials
              </h3>
              <ul className="space-y-2" aria-label="Certifications and qualifications">
                {credentials.map(({ label, status, color }) => (
                  <li key={label} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors">
                    <span className="text-sm text-text-main font-medium">{label}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${color}`}>{status}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Published Writing — Authoritativeness signal */}
            <div>
              <h3 className="text-lg font-medium text-text-main mb-5 flex items-center gap-2">
                <BookOpen size={18} className="text-secondary" />
                Published Writing
              </h3>
              <ul className="space-y-3" aria-label="Published articles">
                {writings.map(({ title, url, desc }) => (
                  <li key={title}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-xl border border-border bg-background hover:border-secondary/40 hover:bg-surface/50 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <span className="text-sm font-semibold text-text-main group-hover:text-secondary transition-colors">{title}</span>
                        <ExternalLink size={13} className="text-text-dim group-hover:text-secondary transition-colors shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">{desc}</p>
                      <span className="text-[10px] font-mono text-text-dim mt-2 inline-block">medium.com/@owolabitestimony</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specs List */}
          <div className="md:col-span-5">
            <h3 className="text-lg font-medium text-text-main mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full"></span>
              Operational Standards
            </h3>
            <dl className="border border-border rounded-xl bg-background p-1">
              <div className="p-4 border-b border-border grid grid-cols-3 gap-4">
                <dt className="text-xs font-mono text-text-dim uppercase pt-0.5">Uptime Goal</dt>
                <dd className="col-span-2 text-sm text-text-main font-mono text-right">99.95% (HA)</dd>
              </div>
              <div className="p-4 border-b border-border grid grid-cols-3 gap-4">
                <dt className="text-xs font-mono text-text-dim uppercase pt-0.5">Security</dt>
                <dd className="col-span-2 text-sm text-text-main font-mono text-right">Zero Trust</dd>
              </div>
              <div className="p-4 border-b border-border grid grid-cols-3 gap-4">
                <dt className="text-xs font-mono text-text-dim uppercase pt-0.5">IaC</dt>
                <dd className="col-span-2 text-sm text-text-main font-mono text-right">Immutable</dd>
              </div>
              <div className="p-4 grid grid-cols-3 gap-4">
                <dt className="text-xs font-mono text-text-dim uppercase pt-0.5">Tooling</dt>
                <dd className="col-span-2 text-sm text-text-main font-mono text-right">Open Source First</dd>
              </div>
            </dl>
          </div>
        </div>
      </MotionWrapper>
    </section>
  );
};
