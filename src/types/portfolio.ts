export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  year: number;
}

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "other";
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
