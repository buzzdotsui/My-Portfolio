import React, { useState } from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { ExternalLink, ZoomIn } from 'lucide-react';

const certifications = [
  {
    id: 'advancing-black-leadership',
    title: 'Advancing Black Leadership',
    issuer: 'LinkedIn Learning',
    topic: 'Leadership Development',
    relevance: 'Advanced leadership curriculum covering strategic thinking, organizational influence, and leading high-performing teams.',
    imageUrl: '/certifications/advancing_black_leadership.jpg',
    fileUrl: '/certifications/advancing_black_leadership.jpg',
  },
  {
    id: 'introducing-black-leadership',
    title: 'Introducing Black Leadership',
    issuer: 'LinkedIn Learning',
    topic: 'Leadership Foundations',
    relevance: 'Foundational leadership certificate covering communication, team dynamics, and professional development.',
    imageUrl: '/certifications/Introducing_Black_Leadership_Certificate_Of_Completion.jpeg',
    fileUrl: '/certifications/Introducing_Black_Leadership_Certificate_Of_Completion.jpeg',
  },
  {
    id: 'mathematics-sci-tech',
    title: 'Mathematics for Science and Technology',
    issuer: 'Online Certification',
    topic: 'Technical Foundations',
    relevance: 'Mathematics fundamentals applied to scientific and technological problem-solving.',
    imageUrl: '/certifications/Mathematics_Certificate.jpeg',
    fileUrl: '/certifications/Mathematics_Certificate.jpeg',
  },
];

export const Credentials: React.FC = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section
      id={SectionId.CREDENTIALS}
      className="py-24 px-5 md:px-8 border-t border-border/40 bg-surface/10"
      aria-labelledby="credentials-heading"
    >
      <MotionWrapper className="max-w-6xl mx-auto">

        <div className="mb-14 reveal">
          <div className="mono-label mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            Credentials
          </div>
          <h2
            id="credentials-heading"
            className="text-3xl md:text-4xl font-bold text-text-main mb-3"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Certificates & Credentials
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            Verified certificates only. No inflated or fabricated credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col rounded-lg border border-border bg-surface/30 overflow-hidden hover:border-border hover:bg-surface/50 transition-all duration-200 group"
            >
              {/* Certificate image */}
              <div className="relative aspect-[4/3] bg-surface overflow-hidden">
                <img
                  src={cert.imageUrl}
                  alt={`${cert.title} certificate`}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = 'none';
                    const parent = el.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-surface/50">
                          <span class="text-xs font-mono text-text-dim">Certificate Image</span>
                        </div>
                      `;
                    }
                  }}
                />
                {/* Zoom overlay */}
                <button
                  onClick={() => setLightbox(cert.imageUrl)}
                  className="absolute inset-0 flex items-center justify-center bg-background/0 group-hover:bg-background/40 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label={`View ${cert.title} certificate`}
                >
                  <div className="w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-text-muted">
                    <ZoomIn size={16} />
                  </div>
                </button>
              </div>

              {/* Meta */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-[9px] font-mono text-text-dim uppercase tracking-widest mb-2">{cert.topic}</div>
                <h3
                  className="text-sm font-bold text-text-main mb-1"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-primary/80 mb-3">{cert.issuer}</p>
                <p className="text-xs text-text-muted leading-relaxed flex-grow mb-4">{cert.relevance}</p>

                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors mt-auto"
                >
                  <ExternalLink size={11} /> View certificate
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-8 text-[11px] font-mono text-text-dim reveal">
          Additional credentials and course completions will be added as they are verified.
        </p>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-label="Certificate image viewer"
            aria-modal="true"
          >
            <div className="relative max-w-3xl w-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
              <img
                src={lightbox}
                alt="Certificate"
                className="w-full h-auto object-contain rounded-lg border border-border shadow-card"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-text-muted hover:text-primary transition-colors"
                aria-label="Close image viewer"
              >
                ×
              </button>
            </div>
          </div>
        )}

      </MotionWrapper>
    </section>
  );
};
