import { useState } from "react";
import { usePageTitle } from "@hooks/usePageTitle";
import { Section } from "@components/ui/Section";
import { ProjectCard } from "@components/sections/ProjectCard";
import { PROJECTS } from "@lib/data";

const ALL_TAGS = ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))];

export function ProjectsPage() {
  usePageTitle("Projects - Ivan Pavlovic");
  const [activeTag, setActiveTag] = useState("All");
  const filtered = activeTag === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeTag));

  return (
    <Section>
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">Projects</h1>
        <p className="text-[var(--color-text-secondary)]">A collection of things I've built.</p>
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              activeTag === tag
                ? "bg-[var(--color-text-primary)] text-[var(--color-background)]"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </Section>
  );
}

