import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Engineering grid background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60" />

          {/* Corner marks */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-primary/30" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-primary/30" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-primary/30" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-primary/30" />

          {/* Coordinate labels */}
          <div className="absolute top-8 left-12 font-mono text-[9px] text-primary/20 tracking-widest">X:0000</div>
          <div className="absolute top-8 right-12 font-mono text-[9px] text-primary/20 tracking-widest">Y:0000</div>

          {/* Glow orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/8 rounded-full blur-[90px]" />

          {/* Brand */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                {/* Corner ticks */}
                <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-primary/60" />
                <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-primary/60" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h1
                  className="text-lg font-bold tracking-tight mb-1"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  Testimony Owolabi
                </h1>
                <p className="text-[11px] font-mono text-text-dim tracking-[0.18em] uppercase">
                  Full-Stack Engineer · Metabotics
                </p>
              </motion.div>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 w-32 mx-auto"
            >
              <div className="h-[1px] bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.1, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
              <div className="mt-2 text-[9px] font-mono text-text-dim text-center tracking-widest">
                INITIALIZING
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
