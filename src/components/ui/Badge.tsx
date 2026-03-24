import { type HTMLAttributes } from "react";
import { cn } from "@utils/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-[var(--color-surface)] text-[var(--color-text-secondary)]": variant === "default",
          "bg-[var(--color-text-primary)]/10 text-[var(--color-text-primary)]": variant === "accent",
          "border border-[var(--color-border)] text-[var(--color-text-secondary)]":
            variant === "outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

