"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@utils/cn";

interface ScrollBaseAnimationProps {
  children: React.ReactNode;
  baseVelocity?: number;
  clasname?: string;
  scrollDependent?: boolean;
  delay?: number;
}

export default function ScrollBaseAnimation({
  children,
  baseVelocity = -5,
  clasname,
  scrollDependent = false,
  delay = 0,
}: ScrollBaseAnimationProps) {
  const baseX = useMotionValue(0);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  useLayoutEffect(() => {
    const measure = () => {
      const width = sequenceRef.current?.scrollWidth ?? 0;
      setSequenceWidth(width);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (sequenceRef.current) observer.observe(sequenceRef.current);

    return () => observer.disconnect();
  }, []);

  const x = useTransform(baseX, (v) => {
    if (!sequenceWidth) return "0px";
    const wrapped = ((v % sequenceWidth) + sequenceWidth) % sequenceWidth;
    return `${-wrapped}px`;
  });
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    if (t < delay) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (scrollDependent) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
    }

    baseX.set(baseX.get() + moveBy);
  });

  const items = Array.from({ length: 6 }, (_, i) => (
    <span key={i} className="mr-8 block whitespace-nowrap">
      {children}
    </span>
  ));

  return (
    <div className="overflow-hidden">
      <motion.div className={cn("flex whitespace-nowrap", clasname)} style={{ x }}>
        <div ref={sequenceRef} className="flex whitespace-nowrap">
          {items}
        </div>
        <div className="flex whitespace-nowrap" aria-hidden="true">
          {items}
        </div>
      </motion.div>
    </div>
  );
}
