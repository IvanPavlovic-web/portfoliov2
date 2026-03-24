import { type ButtonHTMLAttributes, forwardRef, type ReactElement, cloneElement } from "react";
import { cn } from "@utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-primary)] disabled:pointer-events-none disabled:opacity-50",
      {
        "bg-[var(--color-text-primary)] text-[var(--color-background)] hover:bg-[var(--color-text-secondary)]":
          variant === "primary",
        "bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]":
          variant === "secondary",
        "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]":
          variant === "ghost",
        "border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]":
          variant === "outline",
      },
      {
        "h-8 px-3 text-xs": size === "sm",
        "h-10 px-4 text-sm": size === "md",
        "h-12 px-6 text-base": size === "lg",
      },
      className,
    );

    if (asChild && children) {
      return cloneElement(children as ReactElement<{ className?: string }>, { className: classes });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

