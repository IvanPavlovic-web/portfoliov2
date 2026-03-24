import type { Experience, Project, Skill } from "@/types/portfolio";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Project Alpha",
    description:
      "A full-stack web application built with React and Node.js. Features real-time updates, authentication, and a responsive design.",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    githubUrl: "https://github.com/yourusername/project-alpha",
    liveUrl: "https://project-alpha.vercel.app",
    featured: true,
    year: 2024,
  },
  {
    id: "2",
    title: "Project Beta",
    description:
      "An e-commerce platform with a modern UI, cart functionality, Stripe payments, and an admin dashboard.",
    tags: ["Next.js", "Stripe", "Prisma", "TypeScript"],
    githubUrl: "https://github.com/yourusername/project-beta",
    featured: true,
    year: 2024,
  },
  {
    id: "3",
    title: "Project Gamma",
    description:
      "A CLI tool for automating repetitive development tasks. Supports plugins and custom scripts.",
    tags: ["Node.js", "TypeScript", "CLI"],
    githubUrl: "https://github.com/yourusername/project-gamma",
    liveUrl: "https://www.npmjs.com/package/project-gamma",
    year: 2023,
  },
];

export const SKILLS: Skill[] = [
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 88, category: "frontend" },
  { name: "Node.js", level: 78, category: "backend" },
  { name: "PostgreSQL", level: 70, category: "backend" },
  { name: "Docker", level: 65, category: "tools" },
  { name: "Git", level: 85, category: "tools" },
];

export const EXPERIENCE: Experience[] = [
  {
    id: "1",
    company: "Company Name",
    role: "Frontend Developer",
    period: "2023 - Present",
    description:
      "Building scalable React applications, improving performance, and collaborating with cross-functional teams to deliver user-focused features.",
    technologies: ["React", "TypeScript", "GraphQL", "Storybook"],
  },
  {
    id: "2",
    company: "Another Company",
    role: "Junior Developer",
    period: "2021 - 2023",
    description:
      "Developed and maintained internal tools and dashboards, contributed to design system, and onboarded new engineers.",
    technologies: ["Vue.js", "Node.js", "MySQL"],
  },
];
