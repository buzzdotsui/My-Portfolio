import React from 'react';
import { SectionId } from '../types';
import { SectionHeading } from './ui/SectionHeading';
import { Layers, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const features = [
    { icon: Layers, title: "Clean Architecture", desc: "I believe in maintainable, modular code that scales with your business needs.", color: "text-primary" },
    { icon: Zap, title: "Performance First", desc: "Optimizing for Core Web Vitals and lightning-fast load times is my standard.", color: "text-accent" },
    { icon: Heart, title: "Thoughtful UX", desc: "Accessibility and user experience drive every architectural decision I make.", color: "text-pink-500" }
  ];

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id={SectionId.ABOUT} className="py-24 relative bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading title="About Me" subtitle="Engineering digital solutions with precision and purpose." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <motion.div 
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="col-span-1 md:col-span-2 space-y-6 text-lg text-text-muted leading-relaxed"
          >
            <motion.p variants={textItemVariants}>
              I am a <span className="text-white font-medium">Full-Stack Engineer</span> and <span className="text-white font-medium">Ethical Hacker</span> with a deep focus on user interface engineering. I don't just write code; I craft digital experiences that are intuitive, accessible, and performant.
            </motion.p>
            <motion.p variants={textItemVariants}>
              My journey began in the world of cybersecurity, understanding how systems break so I could build them stronger. This background gives me a unique perspective on <span className="text-primary">secure coding practices</span> while my passion for design pushes me to create pixel-perfect interfaces.
            </motion.p>
            <motion.p variants={textItemVariants}>
              I specialize in the <span className="text-white font-medium">React/Next.js</span> ecosystem, leveraging modern tools to build scalable web applications. Whether it's a complex dashboard or a marketing site, I bring a level of polish that distinguishes good software from great software.
            </motion.p>
          </motion.div>

          <div className="col-span-1 space-y-6">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 50, damping: 20 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-6 bg-surface border border-border rounded-xl hover:border-primary/30 transition-all duration-300 group cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors`}>
                    <feature.icon className={`${feature.color}`} size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};