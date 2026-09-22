import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  shortDescription?: string;
  description: string;
  problem?: string;
  context?: string;
  role?: string;
  whatWasBuilt?: string;
  technicalApproach?: string;
  outcome?: string;
  currentState?: string;
  status: 'LIVE' | 'SHIPPED' | 'ACTIVE' | 'IN DEVELOPMENT' | 'PROTOTYPE' | 'RESEARCH / PROTOTYPING' | 'EXPLORATION' | 'ARCHIVED' | 'CLIENT WORK';
  significance: 'signature' | 'supporting' | 'archive';
  category?: string;
  tags: string[];
  imageUrl?: string;
  screenshots?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  decisions?: string[];
  challenges?: string[];
  lessons?: string[];
  number?: string;
}

export interface WorkItem {
  title: string;
  category: 'Software' | 'AI' | 'Automation' | 'Web3' | 'Security' | 'Engineering' | 'Academic' | 'Experiments' | 'Community';
  description: string;
  status: string;
  tags: string[];
  liveUrl?: string;
  featured?: boolean;
}

export interface ServiceItem {
  title: string;
  description: string;
  capabilities: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  topic: string;
  date?: string;
  relevance: string;
  imageUrl: string;
}

export interface SkillGroup {
  title: string;
  icon: LucideIcon;
  note?: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  level: 'Core' | 'Working' | 'Exploring';
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

export interface NowItem {
  category: 'Building' | 'Learning' | 'Leading' | 'Exploring';
  items: string[];
}

export enum SectionId {
  HERO = 'hero',
  CRAFT = 'craft',
  PORTFOLIO = 'portfolio',
  WORK = 'work',
  SKILLS = 'skills',
  SERVICES = 'services',
  AVAILABILITY = 'availability',
  CREDENTIALS = 'credentials',
  EXPERIENCE = 'experience',
  LEADERSHIP = 'leadership',
  ENGINEERING = 'engineering',
  WRITING = 'writing',
  NOW = 'now',
  CONTACT = 'contact',
}