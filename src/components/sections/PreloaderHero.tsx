import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const HERO_ROWS = ["Ivan", "Pavlovic", "Portfolio"];

interface PreloaderHeroProps {
  animate: boolean;
}

export function PreloaderHero({ animate }: PreloaderHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const headings = Array.from(
        sectionRef.current!.querySelectorAll<HTMLElement>(".hero-header-row h1"),
      );
      const dividers = Array.from(
        sectionRef.current!.querySelectorAll<HTMLElement>(".hero-divider"),
      );

      const splits = headings.map((h) =>
        SplitText.create(h, { type: "lines", linesClass: "line", mask: "lines" }),
      );

      const allLines = splits.flatMap((s) => s.lines as HTMLElement[]);
      gsap.set(allLines, { yPercent: 100 });

      const tl = gsap.timeline();

      tl.to(allLines, {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      }).to(
        dividers,
        {
          scaleX: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
        },
        "<",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <section ref={sectionRef} className="hero-section">
      {HERO_ROWS.map((text) => (
        <div key={text} className="hero-header-row">
          <div className="hero-divider" />
          <h1>{text}</h1>
        </div>
      ))}
    </section>
  );
}
