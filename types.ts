import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  problem?: string;
  outcome?: string;
  category?: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
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