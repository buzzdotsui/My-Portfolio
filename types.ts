import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  shortDescription?: string;
  description: string;
  problem?: string;
  context?: string;
  outcome?: string;
  role?: string;
  status: 'LIVE' | 'SHIPPED' | 'ACTIVE' | 'IN DEVELOPMENT' | 'PROTOTYPE' | 'RESEARCH / PROTOTYPING' | 'EXPLORATION' | 'ARCHIVED' | 'CLIENT WORK';
  significance: 'signature' | 'supporting' | 'archive';
  category?: string;
  tags: string[];
  imageUrl?: string;
  screenshots?: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  techStack?: { label: string; value: string }[];
  decisions?: string[];
  challenges?: string[];
  lessons?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  topic: string;
  date?: string;
  relevance: string;
  imageUrl: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: LucideIcon;
  note?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface WritingPost {
  title: string;
  url: string;
  desc: string;
  tag: string;
  date?: string;
  verified?: boolean;
}

export interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  highlight?: boolean;
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  METABOTICS = 'metabotics',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  EXPERIENCE = 'experience',
  WRITING = 'writing',
  LEADERSHIP = 'leadership',
  CONTACT = 'contact',
}