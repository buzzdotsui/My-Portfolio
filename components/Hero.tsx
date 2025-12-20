import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section id={SectionId.HERO} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Moving Grid */}
        <motion.div 
          initial={{ opacity: 0, backgroundPosition: "0px 0px" }}
          animate={{ opacity: 1, backgroundPosition: ["0px 0px", "24px 24px"] }}
          transition={{ 
            opacity: { duration: 2 },
            backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" }
          }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        ></motion.div>
        
        {/* Rotating Abstract Glowing Shape - Top/Left */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-[120px]"
        ></motion.div>

        {/* Rotating Abstract Glowing Shape - Bottom/Right */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -60, 0],
            x: [0, -30, 0],
            opacity: [0.15, 0.2, 0.15]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-accent/15 to-transparent blur-[120px]"
        ></motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surfaceHighlight border border-border text-xs font-mono text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for new projects
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Building fast, cool, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">and secure web apps.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-muted mb-8 max-w-lg leading-relaxed">
              Hi, I'm <strong className="text-white font-medium">Testimony Owolabi</strong>. 
              I combine Full-Stack Engineering with Ethical Hacking to create digital experiences that perform flawlessly and stay secure.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                href={`#${SectionId.PROJECTS}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-black bg-white rounded hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                View Projects
                <ArrowRight size={16} className="ml-2" />
              </motion.a>
              <motion.a 
                href={`#${SectionId.CONTACT}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-surface border border-border rounded hover:bg-surfaceHighlight hover:border-primary/50 transition-colors"
              >
                Contact Me
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex items-center gap-6 text-text-muted">
              <a href="https://github.com/buzzdotsui" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Github size={20} />
              </a>
              <a href="https://x.com/_buzzdotsui" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-200" aria-label="X (formerly Twitter)">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Visual Element / Profile Picture - Visible on all devices now */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="relative mt-12 lg:mt-0"
          >
             {/* Abstract Glow Behind */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-primary/20 rounded-full blur-[120px] -z-10"
            ></motion.div>
            
            <motion.div 
              whileHover={{ y: -5, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative mx-auto w-full max-w-[320px] md:max-w-[380px] aspect-[4/5] bg-surfaceHighlight/30 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden group"
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               
               <div className="relative w-full h-full rounded-xl overflow-hidden bg-surface">
                 <img 
                   src="https://github.com/buzzdotsui.png" 
                   alt="Testimony Owolabi" 
                   className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                 />
                 
                 {/* Overlay Text */}
                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                   <div className="flex items-center gap-2 mb-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="text-xs font-mono text-green-400">Online & Coding</span>
                   </div>
                   <h3 className="text-xl font-bold text-white">Testimony Owolabi</h3>
                   <p className="text-sm text-text-muted">@buzzdotsui</p>
                 </div>
               </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
              transition={{ 
                x: { delay: 0.8, duration: 0.5 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } 
              }}
              className="absolute -right-4 top-10 md:top-20 bg-surface/90 backdrop-blur border border-border p-3 rounded-lg shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <div className="text-xs text-text-muted">Security</div>
                  <div className="text-sm font-bold text-white">Certified</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};