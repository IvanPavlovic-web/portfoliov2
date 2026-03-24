import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import heroImage from "@assets/hero/hero.jpg";

const ROLE_LINES = ["FRONTEND DEVELOPER", "DIGITAL DESIGNER", "CREATIVE DEVELOPER"] as const;

interface HeroProps {
  animateName?: boolean;
}

export function Hero({ animateName = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const bioBandRef = useRef<HTMLDivElement>(null);
  const nameBandRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!animateName) return;

      const roleLines = Array.from(rolesRef.current?.querySelectorAll(".hero-role-line") ?? []);

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          imageRef.current,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.15 },
        )
        .from(
          roleLines,
          {
            opacity: 0,
            y: 22,
            filter: "blur(14px)",
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.16",
        )
        .from(
          bioBandRef.current,
          {
            opacity: 0,
            y: 18,
            filter: "blur(10px)",
            duration: 0.52,
          },
          "-=0.18",
        )
        .from(
          nameBandRef.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(12px)",
            duration: 0.65,
          },
          "-=0.18",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [animateName]);

  return (
    <section ref={sectionRef} id="home" className="hero-root">
      <div className="hero-media" aria-hidden="true">
        <img
          ref={imageRef}
          src={heroImage}
          alt=""
          className="hero-bg-image"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-gradient" />
        <div className="hero-grain" />
      </div>

      <div className="hero-frame">
        <div className="hero-center">
          <div ref={rolesRef} className="hero-role-stack">
            {ROLE_LINES.map((line) => (
              <p
                key={line}
                className={
                  line === "DIGITAL DESIGNER"
                    ? "hero-role-line hero-role-line--accent"
                    : "hero-role-line"
                }
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="hero-bottom">
          <div ref={bioBandRef} className="hero-bio-band">
            <p className="hero-bio">
              I design and build modern digital experiences with a focus on refined frontend craft,
              clean visual systems, and motion that feels precise, immersive, and intentional.
            </p>
          </div>

          <div ref={nameBandRef} className="hero-name-band">
            <h1 className="hero-signature">
              IVAN PAVLOVIC
              <span className="hero-signature-mark">{"\u00AE"}</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
