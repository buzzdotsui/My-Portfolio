import React, { useState } from 'react';
import { SectionId } from '../types';
import { MotionWrapper } from './ui/MotionWrapper';
import { Users, GraduationCap, Radio, ChevronLeft, ChevronRight } from 'lucide-react';
import { OptimizedImage } from './ui/OptimizedImage';

// ──────────────────────────────────────────────────────────
// All 17 verified Sui On Campus photographs
// ──────────────────────────────────────────────────────────
const photoGroups = [
  {
    label: 'Core Team',
    photos: [
      { src: '/SUI ON CAMPUS/core team/DSC_1713.jpg',              caption: 'Core team at Sui On Campus FUTA' },
      { src: '/SUI ON CAMPUS/core team/DSC_1719.jpg',              caption: 'Core team session' },
      { src: '/SUI ON CAMPUS/core team/G8MmLEpXUAUgQa- (1).jpeg', caption: 'Core team coordination' },
    ],
  },
  {
    label: 'Leading the Community',
    photos: [
      { src: '/SUI ON CAMPUS/me as the community lead/DSC_1539.jpg',              caption: 'Facilitating a Sui workshop session' },
      { src: '/SUI ON CAMPUS/me as the community lead/DSC_1676.jpg',              caption: 'Community lead — addressing attendees' },
      { src: '/SUI ON CAMPUS/me as the community lead/G65tMsIWcAAtmPV.jpeg',     caption: 'Speaking at Sui On Campus event' },
      { src: '/SUI ON CAMPUS/me as the community lead/G67KxbnXcAAqJ3V.jpeg',     caption: 'Leading developer session' },
      { src: '/SUI ON CAMPUS/me as the community lead/G67LK_pWcAAgy8x.jpeg',     caption: 'Community engagement' },
      { src: '/SUI ON CAMPUS/me as the community lead/G8DLpTyWUI5air.jpeg',      caption: 'At the front — community lead' },
    ],
  },
  {
    label: 'As a Volunteer',
    photos: [
      { src: '/SUI ON CAMPUS/Me as a volunteer/SOCSC-1.jpg', caption: 'Volunteering at Sui On Campus South-West' },
    ],
  },
  {
    label: 'With Team Lead',
    photos: [
      { src: '/SUI ON CAMPUS/me and the team lead/G8DLqyyXsAIdQCy.jpeg', caption: 'With the Sui On Campus team lead' },
    ],
  },
  {
    label: 'With Technical Lead',
    photos: [
      { src: '/SUI ON CAMPUS/me and the techincal lead/G66iVAxXAAAM_J9.jpeg', caption: 'With the Sui technical lead' },
    ],
  },
  {
    label: 'Personal',
    photos: [
      { src: '/SUI ON CAMPUS/personal pictures/DSC_2577.jpg',              caption: 'At Sui On Campus event' },
      { src: '/SUI ON CAMPUS/personal pictures/G66iTRPXcAALvvy.jpeg',     caption: 'Event day' },
      { src: '/SUI ON CAMPUS/personal pictures/G8DLpLfW8AI-Uhc.jpeg',     caption: 'At the community event' },
      { src: '/SUI ON CAMPUS/personal pictures/G8DLrAnWUAQzGYE.jpeg',     caption: 'With community members' },
      { src: '/SUI ON CAMPUS/personal pictures/sUI (56 of 34).jpg',       caption: 'Community gathering' },
    ],
  },
];

const leadershipRoles = [
  {
    role: 'Community Lead',
    org: 'Sui On Campus · FUTA',
    icon: Users,
    color: '#0ea5e9',
    desc: 'Leading the adoption and education of Sui blockchain technology at FUTA. Organizing technical workshops, onboarding developers, and building a community of builders in Akure.',
  },
  {
    role: 'Engineering Representation',
    org: 'Federal University of Technology Akure',
    icon: GraduationCap,
    color: '#10b981',
    desc: 'Advocating for students within the engineering faculty — facilitating communication between students and faculty, and organizing academic support structures.',
  },
  {
    role: 'Technical Education',
    org: 'Community Building',
    icon: Radio,
    color: '#f59e0b',
    desc: 'Mentoring junior developers, hosting technical sessions on software engineering best practices, and contributing to the growth of the local tech ecosystem.',
  },
];

// ──────────────────────────────────────────────────────────
// Photo gallery for a group
// ──────────────────────────────────────────────────────────
const PhotoGroup: React.FC<{ label: string; photos: { src: string; caption: string }[] }> = ({ label, photos }) => {
  const [active, setActive] = useState(0);

  if (photos.length === 0) return null;

  const prev = () => setActive((i) => (i === 0 ? photos.length - 1 : i - 1));
  const next = () => setActive((i) => (i === photos.length - 1 ? 0 : i + 1));

  return (
    <div className="rounded-lg border border-border bg-surface/30 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-surface group">
        <OptimizedImage
          src={photos[active].src}
          alt={photos[active].caption}
          className="w-full h-full object-cover object-center"
        />
        {photos.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/80 border border-border text-text-muted hover:text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" aria-label="Prev">
              <ChevronLeft size={14} />
            </button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/80 border border-border text-text-muted hover:text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" aria-label="Next">
              <ChevronRight size={14} />
            </button>
          </>
        )}
        {/* Counter */}
        {photos.length > 1 && (
          <div className="absolute bottom-2 right-2 text-[9px] font-mono bg-background/80 border border-border/60 px-2 py-0.5 rounded text-text-dim">
            {active + 1}/{photos.length}
          </div>
        )}
      </div>
      {/* Caption */}
      <div className="p-3 border-t border-border/40">
        <div className="text-[10px] font-mono text-text-dim mb-0.5 uppercase tracking-wider">{label}</div>
        <p className="text-xs text-text-muted">{photos[active].caption}</p>
        {photos.length > 1 && (
          <div className="flex gap-1 mt-2">
            {photos.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className={`w-1 h-1 rounded-full transition-all ${i === active ? 'bg-primary' : 'bg-border'}`} aria-label={`Photo ${i + 1}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────
// Leadership Section
// ──────────────────────────────────────────────────────────
export const Leadership: React.FC = () => {
  return (
    <section id={SectionId.LEADERSHIP} className="py-24 px-5 md:px-8 border-t border-border/40 bg-surface/10" aria-labelledby="leadership-heading">

      <MotionWrapper className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12 reveal">
          <div className="mono-label mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            Leadership & Community
          </div>
          <h2 id="leadership-heading" className="text-3xl md:text-4xl font-bold text-text-main mb-3" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            Building Communities Around Technology
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            I build software. I also build communities around technology — organizing developers, facilitating learning, and growing local ecosystems.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children mb-16">
          {leadershipRoles.map((item) => (
            <div
              key={item.role}
              className="p-5 rounded-lg border border-border bg-surface/30 hover:border-primary/25 hover:bg-surface/60 transition-all duration-300 relative overflow-hidden group"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-40"
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
              />
              <div
                className="w-9 h-9 rounded flex items-center justify-center mb-4 border"
                style={{ background: `${item.color}12`, borderColor: `${item.color}25` }}
              >
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <h3 className="text-sm font-bold text-text-main mb-1" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                {item.role}
              </h3>
              <p className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-4">{item.org}</p>
              <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Sui On Campus photo evidence */}
        <div className="reveal">
          <div className="mono-label mb-6 flex items-center gap-3">
            <span className="w-4 h-px bg-border" />
            Sui On Campus — Photo Evidence
            <span className="w-4 h-px bg-border" />
          </div>
          <p className="text-xs text-text-dim font-mono mb-8 max-w-xl">
            17 photographs from Sui On Campus events at FUTA. Real evidence of community work — not stock imagery.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 stagger-children">
            {photoGroups.map((group) => (
              <PhotoGroup key={group.label} label={group.label} photos={group.photos} />
            ))}
          </div>
        </div>

      </MotionWrapper>
    </section>
  );
};

