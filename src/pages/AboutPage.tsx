import { usePageTitle } from "@hooks/usePageTitle";
import { Section } from "@components/ui/Section";
import { SkillBar } from "@components/sections/SkillBar";
import { Badge } from "@components/ui/Badge";
import { SKILLS, EXPERIENCE } from "@lib/data";

export function AboutPage() {
  usePageTitle("About - Ivan Pavlovic");

  const frontendSkills = SKILLS.filter((s) => s.category === "frontend");
  const backendSkills = SKILLS.filter((s) => s.category === "backend");
  const toolsSkills = SKILLS.filter((s) => s.category === "tools");

  return (
    <Section>
      <div className="mb-16 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            About Me
          </h1>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            I'm a frontend developer based in [Your City] with a passion for building
            beautiful and functional web experiences. I enjoy working at the intersection
            of design and engineering.
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            When I'm not coding, you'll find me reading, hiking, or experimenting with
            new technologies.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="h-64 w-64 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)]">
            Photo
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">Skills</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Frontend</h3>
            {frontendSkills.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Backend</h3>
            {backendSkills.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Tools</h3>
            {toolsSkills.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">Experience</h2>
        <div className="space-y-8">
          {EXPERIENCE.map((exp) => (
            <div key={exp.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{exp.role}</h3>
                  <p className="text-sm text-[var(--color-text-primary)]">{exp.company}</p>
                </div>
                <span className="text-sm text-[var(--color-text-secondary)]">{exp.period}</span>
              </div>
              <p className="mb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => <Badge key={tech} variant="outline">{tech}</Badge>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

