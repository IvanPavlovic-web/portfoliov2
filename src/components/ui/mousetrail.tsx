import React, { useMemo, useRef, useEffect } from "react";
import { cn } from "@utils/cn";

type ImageMouseTrailProps = {
  items: string[];
  distance?: number;
  imgClass?: string;
  children?: React.ReactNode;
  className?: string;
  poolSize?: number;
  fallbackSrc?: string;
  /** 0â€“1: how fast each image chases the cursor. Lower = more lag. Default 0.12 */
  lerp?: number;
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// linear interpolation
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export default function ImageMouseTrail({
  items,
  distance = 38, // higher â†’ less frequent spawning
  imgClass = "",
  children,
  className = "",
  poolSize = 10,
  fallbackSrc,
  lerp = 0.12, // laggy-but-smooth cursor follow
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<HTMLImageElement[]>([]);
  const poolIndex = useRef(0);
  const srcIndex = useRef(0);

  // raw cursor position inside the container
  const rawPos = useRef({ x: -9999, y: -9999 });
  // smoothed cursor position (what images actually chase)
  const smoothPos = useRef({ x: -9999, y: -9999 });
  // last position where we spawned an image
  const spawnPos = useRef({ x: -9999, y: -9999 });

  const rafId = useRef<number | null>(null);
  const isInside = useRef(false);

  const safeItems = useMemo(() => items.slice(0), [items]);

  const spawnNext = (x: number, y: number) => {
    const src = safeItems[srcIndex.current];
    srcIndex.current = (srcIndex.current + 1) % safeItems.length;

    const slot = poolIndex.current;
    poolIndex.current = (poolIndex.current + 1) % poolSize;

    const image = refs.current[slot];
    if (!image) return;

    image.src = src;
    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    image.dataset.status = "active";

    const a = image as HTMLImageElement & { _trailTimeout?: number };
    if (a._trailTimeout) window.clearTimeout(a._trailTimeout);
    a._trailTimeout = window.setTimeout(() => {
      image.dataset.status = "inactive";
    }, 1800); // images stay a bit longer so the trail feels denser
  };

  // rAF loop: smooth the cursor, spawn when smoothed pos moved enough
  const tick = () => {
    if (!isInside.current) {
      rafId.current = requestAnimationFrame(tick);
      return;
    }

    // lerp smoothed position toward raw cursor
    smoothPos.current.x = mix(smoothPos.current.x, rawPos.current.x, lerp);
    smoothPos.current.y = mix(smoothPos.current.y, rawPos.current.y, lerp);

    const dx = smoothPos.current.x - spawnPos.current.x;
    const dy = smoothPos.current.y - spawnPos.current.y;
    const dist = Math.hypot(dx, dy);

    if (dist >= distance) {
      spawnPos.current = { ...smoothPos.current };
      spawnNext(smoothPos.current.x, smoothPos.current.y);
    }

    rafId.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [lerp, distance, safeItems, poolSize]);

  const updatePointerPosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawPos.current = {
      x: clamp(clientX - rect.left, 0, rect.width),
      y: clamp(clientY - rect.top, 0, rect.height),
    };
    if (!isInside.current) {
      smoothPos.current = { ...rawPos.current };
      spawnPos.current = { ...rawPos.current };
      isInside.current = true;
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    updatePointerPosition(event.clientX, event.clientY);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    updatePointerPosition(event.clientX, event.clientY);
    spawnPos.current = { ...smoothPos.current };
    spawnNext(smoothPos.current.x, smoothPos.current.y);
  };

  const onPointerLeave = () => {
    isInside.current = false;
    refs.current.forEach((img) => {
      if (!img) return;
      img.dataset.status = "inactive";
      const a = img as HTMLImageElement & { _trailTimeout?: number };
      if (a._trailTimeout) window.clearTimeout(a._trailTimeout);
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn("mousetrail", className)}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerLeave}
    >
      {Array.from({ length: poolSize }).map((_, index) => (
        <img
          key={index}
          className={cn("mousetrail-image", imgClass)}
          data-status="inactive"
          src={safeItems[index % safeItems.length]}
          alt=""
          onError={(event) => {
            if (!fallbackSrc) return;
            if (event.currentTarget.src.endsWith(fallbackSrc)) return;
            event.currentTarget.src = fallbackSrc;
          }}
          ref={(el) => {
            if (el) refs.current[index] = el;
          }}
        />
      ))}
      <div className="mousetrail-content">{children}</div>
    </div>
  );
}
