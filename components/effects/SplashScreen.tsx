import React, { useState, useEffect } from 'react';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>('visible');

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setPhase('fading');
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 400);
    }, 1500);
    return () => clearTimeout(showTimer);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
      style={{
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.4s ease-in-out',
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Corner marks */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-primary/30" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-primary/30" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-primary/30" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-primary/30" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/8 rounded-full blur-[90px]" />

      {/* Brand */}
      <div
        className="relative z-10 text-center"
        style={{ animation: 'fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        {/* Monogram */}
        <div className="w-14 h-14 mx-auto mb-6 relative">
          <div className="absolute inset-0 rounded-sm border border-primary/30 bg-surface/60" />
          <div className="absolute inset-[1px] flex items-center justify-center">
            <span
              className="text-xl font-bold font-mono"
              style={{
                background: 'linear-gradient(135deg, #dde6f0 0%, #0ea5e9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              TO
            </span>
          </div>
          <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-primary/60" />
          <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-primary/60" />
        </div>

        <div style={{ animation: 'fadeSlideUp 0.5s 0.15s cubic-bezier(0.16,1,0.3,1) both' }}>
          <h1
            className="text-lg font-bold tracking-tight mb-1"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Testimony Owolabi
          </h1>
          <p className="text-[11px] font-mono text-text-dim tracking-[0.18em] uppercase">
            Builder · Engineer · Leader
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="mt-8 w-32 mx-auto"
          style={{ animation: 'fadeSlideUp 0.5s 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          <div className="h-[1px] bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary splash-progress"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
