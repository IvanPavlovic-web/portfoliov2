import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@components/ui/Badge";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:border-[var(--color-text-primary)]/40 hover:shadow-lg hover:shadow-[var(--color-text-primary)]/5">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-primary)] transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 flex-1 text-sm text-[var(--color-text-secondary)] leading-relaxed">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );
}

