import { type HTMLAttributes } from "react";
import { cn } from "@utils/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean;
}

export function Section({ className, container = true, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-20 px-6", className)} {...props}>
      {container ? (
        <div className="mx-auto max-w-6xl">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
