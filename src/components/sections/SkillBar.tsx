import { useInView } from "react-intersection-observer";
import { cn } from "@utils/cn";

interface SkillBarProps {
  name: string;
  level: number; // 0â€“100
  className?: string;
}

export function SkillBar({ name, level, className }: SkillBarProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className={cn("space-y-1.5", className)}>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-[var(--color-text-primary)]">{name}</span>
        <span className="text-[var(--color-text-secondary)]">{level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[var(--color-border)]">
        <div
          className="h-full rounded-full bg-[var(--color-text-primary)] transition-all duration-1000 ease-out"
          style={{ width: inView ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

