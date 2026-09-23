export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  number: string;
  name: string;
  description: string;
  stack: string[];
  role: string;
  status: string;
  url: string;
  urlLabel: string;
  image?: ProjectImage;
  /** Typographic plate used when no verified screenshot exists. */
  plate?: {
    domain: string;
    lines: string[];
  };
}

export interface StackItem {
  name: string;
  /** Official brand SVG served from /public/logos */
  logo?: string;
  /** Typographic mark used when no official brand logo applies */
  mark?: string;
  /** Official brand color, revealed subtly on hover */
  brand?: string;
}

export interface StackGroup {
  title: string;
  /** e.g. ADDITIONAL / EXPLORING */
  tag?: string;
  featured?: boolean;
  /** Tailwind grid classes (static strings for JIT scanning) */
  grid: string;
  items: readonly StackItem[];
}

export interface Article {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url: string;
}

export interface SocialLink {
  platform: string;
  handle: string;
  description?: string;
  url: string;
  logo: string;
  brand?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
