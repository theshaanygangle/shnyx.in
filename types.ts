export interface Skill {
  id: string;
  label: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  years: number;
}

export interface Stat {
  years: number;
  projects: number;
  contributions: number;
}

export interface GitHubData {
  profile: string;
  contributions: number;
  lastActive: string;
}

export interface TimelineItem {
  role: string;
  org: string;
  from: string;
  to: string;
  location: string;
  description?: string;
}

export interface AboutData {
  name: string;
  title: string;
  bio: string;
  skills: Skill[];
  stats: Stat;
  github: GitHubData;
  timeline: TimelineItem[];
  resume: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    resume: string;
  };
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  year: string;
  links: {
    live?: string;
    repo?: string;
    caseStudy?: string;
  };
  details: {
    problem: string;
    solution: string;
    techStack: string[];
    role: string;
    metrics?: string[];
  };
  featured: boolean;
  category: "Frontend" | "Backend" | "Full Stack" | "AI";
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  thumbnail: string;
  url?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail: string;
  content?: string;
  category: string;
}

export interface ContactMessage {
  id: string;
  submittedAt: string;
  role: string;
  inquiry: string;
  date: string; // ISO string for the meeting date
  time: string;
  platform: "Google Meet" | "Zoom";
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  agenda: string;
  message: string;
  status: "pending" | "replied" | "ignored";
}
