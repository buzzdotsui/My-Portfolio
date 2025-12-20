import React, { useState } from 'react';
import { SectionId, SkillCategory } from '../types';
import { SectionHeading } from './ui/SectionHeading';
import { 
  Code2, Layout, Database, Shield, Award, ShieldCheck, 
  Terminal, Globe, Cpu, Server, Lock, GitBranch, Box, Hash, 
  Atom, Wind, Layers, Palette, TerminalSquare, FileCode, ShieldAlert,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const skillCategories: SkillCategory[] = [
  {
    title: "Ethical Hacking",
    icon: Shield,
    skills: ["Kali Linux", "Penetration Testing", "Python Scripting", "Metasploit", "Wireshark", "Vulnerability Analysis", "Network Security"]
  },
  {
    title: "Smart Contracts",
    icon: Hash,
    skills: ["Sui Move", "Rust", "Solidity", "Smart Contract Security", "Blockchain Development", "DApp Integration", "DeFi Protocols"]
  },
  {
    title: "Frontend Engineering",
    icon: Layout,
    skills: ["React 18+", "Next.js 14", "Tailwind CSS", "Framer Motion", "TypeScript", "UI/UX Design"]
  },
  {
    title: "Backend & Systems",
    icon: Database,
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Linux Systems", "Docker"]
  }
];

interface Certification {
  name: string;
  fullName?: string;
  issuer: string;
  color: string; // Tailwind text color class
  glowColor: string; // Hex color for glow effect
  logoUrl?: string;
  icon?: React.ElementType;
}

const certifications: Certification[] = [
  { 
    name: "CCNA", 
    fullName: "Cisco Certified Network Associate",
    issuer: "Cisco", 
    color: "text-blue-400",
    glowColor: "#00bceb",
    logoUrl: "https://cdn.simpleicons.org/cisco/00bceb"
  },
  { 
    name: "CCNP", 
    fullName: "Cisco Certified Network Professional",
    issuer: "Cisco", 
    color: "text-blue-500",
    glowColor: "#005073",
    logoUrl: "https://cdn.simpleicons.org/cisco/005073"
  },
  { 
    name: "CEH", 
    fullName: "Certified Ethical Hacker",
    issuer: "EC-Council", 
    color: "text-green-500",
    glowColor: "#22c55e",
    icon: ShieldAlert 
  },
  { 
    name: "Security+", 
    fullName: "CompTIA Security+",
    issuer: "CompTIA", 
    color: "text-red-500",
    glowColor: "#FF0000",
    logoUrl: "https://cdn.simpleicons.org/comptia/FF0000"
  },
  { 
    name: "OSCP", 
    fullName: "Offensive Security Certified Professional",
    issuer: "OffSec", 
    color: "text-orange-500",
    glowColor: "#f97316",
    logoUrl: "https://avatars.githubusercontent.com/u/1724220?v=4" 
  },
  { 
    name: "eCPPT", 
    fullName: "Certified Penetration Tester",
    issuer: "eLearnSecurity", 
    color: "text-cyan-500",
    glowColor: "#06b6d4",
    icon: Globe 
  },
];

const getSkillIcon = (skill: string) => {
  const lower = skill.toLowerCase();
  if (lower.includes('react') || lower.includes('next') || lower.includes('web')) return Atom;
  if (lower.includes('css') || lower.includes('tailwind') || lower.includes('design') || lower.includes('ui/ux')) return Palette;
  if (lower.includes('node') || lower.includes('express')) return Server;
  if (lower.includes('python') || lower.includes('scripting')) return FileCode;
  if (lower.includes('database') || lower.includes('sql') || lower.includes('mongo')) return Database;
  if (lower.includes('linux') || lower.includes('bash') || lower.includes('shell')) return TerminalSquare;
  if (lower.includes('security') || lower.includes('hacking') || lower.includes('penetration') || lower.includes('vulnerability')) return Shield;
  if (lower.includes('docker') || lower.includes('cloud')) return Box;
  if (lower.includes('git')) return GitBranch;
  if (lower.includes('network') || lower.includes('wireshark')) return Globe;
  if (lower.includes('rust') || lower.includes('solidity') || lower.includes('move') || lower.includes('chain')) return Hash;
  return Code2; 
};

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState(skillCategories[0].title);
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 25 }
    }
  };

  return (
    <section id={SectionId.SKILLS} className="py-24 bg-surface/30 relative border-y border-border/50">
       <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading title="Technical Arsenal" subtitle="A dual-threat expertise in building secure, high-performance systems and breaking them to ensure safety." />
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.title;
            return (
              <button
                key={category.title}
                onClick={() => setActiveTab(category.title)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-surface border-border text-text-muted hover:border-primary/50 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {category.title}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            {skillCategories.map((category) => (
              category.title === activeTab && (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-2xl"
                >
                   <div className="flex flex-col md:flex-row gap-8 items-start">
                     {/* Icon Box */}
                     <div className="hidden md:flex flex-shrink-0 p-6 bg-surfaceHighlight rounded-2xl border border-white/5 shadow-inner">
                        <category.icon size={64} className="text-primary" strokeWidth={1.5} />
                     </div>

                     {/* Content List */}
                     <div className="flex-grow w-full">
                        <div className="flex items-center gap-4 mb-8">
                           <div className="md:hidden p-3 bg-surfaceHighlight rounded-xl border border-white/5">
                              <category.icon size={32} className="text-primary" />
                           </div>
                           <div>
                             <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                             <p className="text-sm text-text-muted mt-1">{category.skills.length} specialized skills</p>
                           </div>
                        </div>
                        
                        <motion.div 
                          className="flex flex-wrap gap-3"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {category.skills.map((skill) => {
                            const SkillIcon = getSkillIcon(skill);
                            return (
                              <motion.div
                                key={skill}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-white/10 rounded-lg hover:border-primary/50 hover:bg-surfaceHighlight hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default group"
                              >
                                 <SkillIcon size={16} className="text-primary/70 group-hover:text-primary transition-colors" />
                                 <span className="text-text-main text-sm font-medium group-hover:text-white transition-colors">{skill}</span>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                     </div>
                   </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Certifications Section */}
        <div className="mt-24 pt-10 border-t border-border/30">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center text-center mb-12"
            >
                <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-accent/5 border border-accent/10">
                    <ShieldCheck className="text-accent" size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Professional Certifications</h3>
                <p className="text-text-muted max-w-xl mx-auto text-lg">
                    Industry-recognized credentials validating expertise in network security, ethical hacking, and systems architecture.
                </p>
            </motion.div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {certifications.map((cert, index) => {
                const IconComponent = cert.icon || Award;
                const isHovered = hoveredCert === cert.name;
                
                return (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onHoverStart={() => setHoveredCert(cert.name)}
                    onHoverEnd={() => setHoveredCert(null)}
                    className="group relative flex flex-col p-6 bg-surface/40 backdrop-blur-md border border-white/5 rounded-2xl hover:bg-surface/60 hover:border-white/10 transition-all duration-300 overflow-hidden"
                  >
                     {/* Hover Gradient Background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" 
                      style={{ background: `linear-gradient(to bottom right, ${cert.glowColor}, transparent)` }}
                    />
                    
                    <div className="flex items-start justify-between mb-6 z-10">
                        {/* Logo Container with Dynamic Glow */}
                        <div 
                          className="relative w-16 h-16 rounded-2xl bg-[#0F0F0F] border border-white/10 flex items-center justify-center p-3 transition-all duration-300"
                          style={{ 
                            boxShadow: isHovered ? `0 0 20px ${cert.glowColor}40` : 'none',
                            borderColor: isHovered ? `${cert.glowColor}60` : 'rgba(255,255,255,0.1)'
                          }}
                        >
                          {cert.logoUrl ? (
                            <img 
                              src={cert.logoUrl} 
                              alt={cert.issuer} 
                              className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                            />
                          ) : (
                            <IconComponent size={32} className={`${cert.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                          )}
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                             <div 
                               className="text-[10px] font-mono font-bold px-2 py-1 rounded border uppercase tracking-wider bg-white/5"
                               style={{ color: cert.glowColor, borderColor: `${cert.glowColor}40` }}
                             >
                                Verified
                             </div>
                        </div>
                    </div>
                    
                    <div className="relative z-10 mt-auto">
                      <h4 className="font-bold text-white text-lg leading-tight mb-2 group-hover:text-white transition-colors">
                        {cert.fullName || cert.name}
                      </h4>
                      <p className="text-sm text-text-muted font-medium flex items-center gap-2">
                        <span 
                          className="w-1.5 h-1.5 rounded-full bg-white/20 transition-colors duration-300"
                          style={{ backgroundColor: isHovered ? cert.glowColor : 'rgba(255,255,255,0.2)' }}
                        ></span>
                        {cert.issuer}
                      </p>
                    </div>
                  </motion.div>
                );
             })}
            </div>
        </div>

      </div>
    </section>
  );
};