import React from 'react';
import { SectionId, Project } from '../types';
import { SectionHeading } from './ui/SectionHeading';
import { Badge } from './ui/Badge';
import { ExternalLink, Github, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const projects: Project[] = [
  {
    id: 'testytech',
    title: 'TestyTech',
    description: 'A premium digital agency platform showcasing cutting-edge web solutions. Built with modern React architecture, featuring smooth scroll animations, interactive service showcases, and a focus on high-conversion design.',
    tags: ['React', 'Tailwind CSS', 'UI/UX', 'Netlify'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    demoUrl: 'https://testytech.netlify.app/',
    featured: true
  },
  {
    id: 'smartstudy',
    title: 'SmartStudy Africa',
    description: 'A comprehensive e-learning platform dedicated to empowering African students. Features intuitive course navigation, resource libraries, and a responsive design accessible across devices.',
    tags: ['React', 'Education Tech', 'Platform', 'Responsive'],
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    demoUrl: 'https://smartstudy-africa.netlify.app/',
    featured: true
  },
  {
    id: '1',
    title: 'Neon GUARD',
    description: 'A futuristic, offline-capable security dashboard featuring real-time simulated metrics, virtualized data grids, and an interactive CLI.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Storybook', 'Real-Time', 'Data-Visualization'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/buzzdotsui',
    demoUrl: 'https://neonguard.netlify.app',
    featured: true
  },
  {
    id: '2',
    title: 'Automated Nmap Scanner',
    description: 'A Python script that automates basic network reconnaissance using Nmap, providing quick reports on open ports and services for security auditing.',
    tags: ['Python', 'Nmap', 'Network Security', 'Automation'],
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/buzzdotsui',
    featured: false
  },
  {
    id: '3',
    title: 'Project Sentinel',
    description: 'A proof-of-concept log monitoring and anomaly detection system utilizing machine learning to identify suspicious activities in real-time.',
    tags: ['Machine Learning', 'Python', 'Cybersecurity', 'Log Analysis'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/buzzdotsui',
    featured: false
  },
  {
    id: '4',
    title: 'CryptoSentinel',
    description: 'Real-time cryptocurrency tracking dashboard with predictive analytics. Integrated with multiple exchange APIs for live data visualization.',
    tags: ['Next.js', 'D3.js', 'WebSockets', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/buzzdotsui',
    demoUrl: '#',
    featured: false
  }
];

export const Projects: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id={SectionId.PROJECTS} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Featured Work" subtitle="A selection of engineering and security projects showcasing technical depth." />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col"
            >
              {/* Image Container */}
              <div className="aspect-video w-full overflow-hidden bg-surfaceHighlight relative">
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                 
                 {/* Overlay Icon for hacking projects if no good image */}
                 <div className="absolute inset-0 flex items-center justify-center z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      className="bg-primary/20 p-3 rounded-full backdrop-blur-md border border-primary/50"
                    >
                      <Terminal className="text-white" size={32} />
                    </motion.div>
                 </div>
                 
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="relative z-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors hover:scale-110 transform" title="View Source">
                        <Github size={18} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors hover:scale-110 transform" title="Live Demo">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-text-muted mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="https://github.com/buzzdotsui" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors border-b border-transparent hover:border-primary pb-0.5 group"
          >
            <span>View more on GitHub</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            >
              <ArrowIcon />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);