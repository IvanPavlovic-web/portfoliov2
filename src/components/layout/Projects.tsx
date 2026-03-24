import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useMediaQuery } from "@hooks/useMediaQuery";

import project1 from "@assets/projects/project-1.webp";
import project2 from "@assets/projects/project-2.webp";
import project3 from "@assets/projects/project-3.webp";
import project4 from "@assets/projects/project-4.webp";
import project5 from "@assets/projects/project-5.webp";
import project6 from "@assets/projects/project-6.webp";
import mediaFallback from "@assets/placeholders/media-fallback.svg";

interface Project {
  id: number;
  name: string;
  sub: string;
  url: string;
  img: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Reparacije Letvi Volana",
    sub: "SPA - React 19 - TypeScript - Three.js - Framer Motion - RadixUI",
    url: "https://reparacija-servis-letvi-volana.com/",
    img: project1,
  },
  {
    id: 2,
    name: "Vatroservis Centar",
    sub: "React Application - Three.js - GSAP - Framer Motion",
    url: "https://ivanpavlovic-web.github.io/vs-centar/",
    img: project2,
  },
  {
    id: 3,
    name: "SK Enterijeri",
    sub: "Static Website - React - GSAP - Framer Motion - OGL WebGL",
    url: "https://ivanpavlovic-web.github.io/sk-enterijeri/",
    img: project3,
  },
  {
    id: 4,
    name: "QR Menu",
    sub: "Mobile-first React App - Fast & Lightweight",
    url: "https://ivanpavlovic-web.github.io/reset-qr/",
    img: project4,
  },
  {
    id: 5,
    name: "NCR Voyix Agent Tool",
    sub: "Internal Productivity Tool - React - Vite - GSAP",
    url: "https://it-support-agent-tool.github.io/ncr-voyix-agent-tool/",
    img: project5,
  },
  {
    id: 6,
    name: "GitHub",
    sub: "See more on",
    url: "https://github.com/IvanPavlovic-web",
    img: project6,
  },
];

export function Projects() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const prevPos = useRef({ x: 0, y: 0 });
  const isCoarsePointer = useMediaQuery("(hover: none), (pointer: coarse)");

  const activateProject = useCallback((id: number, nextPos?: { x: number; y: number }) => {
    setActiveId(id);
    if (nextPos) {
      setCursorPos(nextPos);
      prevPos.current = nextPos;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpacity(1);
    setScale(1);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const dx = event.clientX - prevPos.current.x;
    const dy = event.clientY - prevPos.current.y;
    const nx = prevPos.current.x + dx * 0.2;
    const ny = prevPos.current.y + dy * 0.2;
    setCursorPos({ x: nx, y: ny });
    prevPos.current = { x: nx, y: ny };
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (rafRef.current || isCoarsePointer) return;
      rafRef.current = requestAnimationFrame(() => {
        handleMouseMove(event);
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, isCoarsePointer]);

  useEffect(() => {
    if (!isCoarsePointer) return;
    activateProject(PROJECTS[0].id);
  }, [activateProject, isCoarsePointer]);

  const handleEnter = useCallback(
    (id: number) => {
      if (isCoarsePointer) return;
      setActiveId(id);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setOpacity(1);
        setScale(1);
      }, 50);
    },
    [isCoarsePointer],
  );

  const handleLeave = useCallback(() => {
    if (isCoarsePointer) return;
    setOpacity(0);
    setScale(0.5);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveId(null), 300);
  }, [isCoarsePointer]);

  const handleProjectPointerDown = useCallback(
    (id: number, event: React.PointerEvent<HTMLAnchorElement>) => {
      if (!isCoarsePointer) return;
      activateProject(id, { x: event.clientX, y: event.clientY });
    },
    [activateProject, isCoarsePointer],
  );

  const handleProjectClick = useCallback(
    (id: number, event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isCoarsePointer) return;
      if (activeId === id) return;
      event.preventDefault();
      activateProject(id);
    },
    [activeId, activateProject, isCoarsePointer],
  );

  const activeProject = PROJECTS.find((project) => project.id === activeId) ?? null;

  return (
    <section id="projects" className="projects-section">
      <div className="projects-header">
        <span className="projects-label">Selected Work</span>
      </div>

      <div className="projects-list" onMouseLeave={handleLeave}>
        {PROJECTS.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "projects-row",
              activeId === project.id ? "is-active" : "",
              project.id === 6 ? "is-github" : "",
            ].join(" ")}
            onMouseEnter={() => handleEnter(project.id)}
            onFocus={() => activateProject(project.id)}
            onPointerDown={(event) => handleProjectPointerDown(project.id, event)}
            onClick={(event) => handleProjectClick(project.id, event)}
          >
            <div className="projects-row-left">
              <span className="projects-row-sub">{project.sub}</span>
              <span className="projects-row-name">{project.name}</span>
            </div>

            <button className="projects-row-arrow" tabIndex={-1}>
              <ArrowUpRight size={24} />
            </button>

            <div className="projects-row-fill" />
          </a>
        ))}
      </div>

      {activeProject && (
        <img
          src={activeProject.img}
          alt={activeProject.name}
          className={`projects-cursor-img${isCoarsePointer ? "is-mobile" : ""}`}
          onError={(event) => {
            if (event.currentTarget.src.endsWith(mediaFallback)) return;
            event.currentTarget.src = mediaFallback;
          }}
          style={{
            left: isCoarsePointer ? "auto" : `${cursorPos.x}px`,
            top: isCoarsePointer ? "auto" : `${cursorPos.y}px`,
            right: isCoarsePointer ? "1rem" : "auto",
            bottom: isCoarsePointer ? "1rem" : "auto",
            transform: isCoarsePointer
              ? `scale(${scale})`
              : `translate(-50%, -50%) rotate(0deg) scale(${scale})`,
            opacity,
          }}
        />
      )}
    </section>
  );
}
