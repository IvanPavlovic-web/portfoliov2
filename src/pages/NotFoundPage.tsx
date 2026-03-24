import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePageTitle } from "@hooks/usePageTitle";
import { Button } from "@components/ui/Button";

export function NotFoundPage() {
  usePageTitle("404 - Page Not Found");

  return (
    <div className="flex min-h-[calc(100dvh-130px)] flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 font-mono text-sm text-[var(--color-text-primary)]">404</p>
      <h1 className="mb-4 text-4xl font-bold text-[var(--color-text-primary)]">Page Not Found</h1>
      <p className="mb-8 text-[var(--color-text-secondary)]">The page you're looking for doesn't exist or has been moved.</p>
      <Button asChild>
        <Link to="/"><ArrowLeft size={16} /> Back to Home</Link>
      </Button>
    </div>
  );
}

