import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

import img1 from "@assets/preloader-images/img1.jpg";
import img2 from "@assets/preloader-images/img2.jpg";
import img3 from "@assets/preloader-images/img3.jpg";
import img4 from "@assets/preloader-images/img4.jpg";

gsap.registerPlugin(CustomEase, SplitText);

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const imagesWrapRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    const safeComplete = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onComplete();
    };

    const fallbackTimer = window.setTimeout(() => {
      console.warn("Preloader fallback complete triggered.");
      safeComplete();
    }, 8000);

    const ctx = gsap.context(() => {
      try {
        // Split first name and last name separately
        const splitFirst = SplitText.create(firstNameRef.current!, {
          type: "chars",
          charsClass: "char",
          mask: "chars",
        });
        const splitLast = SplitText.create(lastNameRef.current!, {
          type: "chars",
          charsClass: "char",
          mask: "chars",
        });

        const splitCopy = SplitText.create(copyRef.current!.querySelector("p")!, {
          type: "lines",
          linesClass: "line",
          mask: "lines",
        });

        const firstChars = splitFirst.chars as HTMLElement[]; // I, V, A, N
        const lastChars = splitLast.chars as HTMLElement[]; // P, A, V, L, O, V, I, C
        const allChars = [...firstChars, ...lastChars];
        const lines = splitCopy.lines as HTMLElement[];

        const charI = firstChars[0]; // "I"
        const charP = lastChars[0]; // "P"

        // Initial states -- alternate up/down per char
        allChars.forEach((char, i) => {
          gsap.set(char, { yPercent: i % 2 === 0 ? -100 : 100 });
        });
        gsap.set(lines, { yPercent: 100 });

        const imgDivs = Array.from(
          imagesWrapRef.current!.querySelectorAll<HTMLElement>(".preloader-img"),
        );
        const imgInners = Array.from(
          imagesWrapRef.current!.querySelectorAll<HTMLImageElement>(".preloader-img img"),
        );

        const tl = gsap.timeline({ delay: 0.25 });

        // Progress bar
        tl.to(progressRef.current, { scaleX: 1, duration: 4, ease: "power3.inOut" })
          .set(progressRef.current, { transformOrigin: "right" })
          .to(progressRef.current, { scaleX: 0, duration: 1, ease: "power3.in" });

        // Images reveal
        imgDivs.forEach((img, i) => {
          tl.to(
            img,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 1,
              ease: "hop",
              delay: i * 0.75,
            },
            "-=5",
          );
        });

        imgInners.forEach((inner, i) => {
          tl.to(inner, { scale: 1, duration: 1.5, ease: "hop", delay: i * 0.75 }, "-=5.25");
        });

        // Copy in
        tl.to(lines, { yPercent: 0, duration: 2, ease: "hop", stagger: 0.1 }, "-=5.5");

        // All chars in
        tl.to(allChars, { yPercent: 0, duration: 1, ease: "hop", stagger: 0.025 }, "-=5");

        // Images collapse
        tl.to(
          imagesWrapRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "hop",
          },
          "-=1.5",
        );

        // Copy out
        tl.to(lines, { y: "-125%", duration: 2, ease: "hop", stagger: 0.1 }, "-=2");

        // Scatter all chars except I and P
        tl.to(
          allChars,
          {
            yPercent: (_i: number, el: HTMLElement) => {
              if (el === charI || el === charP) return 0;
              return _i % 2 === 0 ? 100 : -100;
            },
            duration: 1,
            ease: "hop",
            stagger: 0.025,
            delay: 0.5,
            onStart: () => {
              // Allow I and P to travel outside their masks
              [charI, charP].forEach((el) => {
                const mask = el.parentElement;
                if (mask?.classList.contains("char-mask")) {
                  mask.style.overflow = "visible";
                }
              });

              const vw = window.innerWidth;
              const cx = vw / 2;
              const rI = charI.getBoundingClientRect();
              const rP = charP.getBoundingClientRect();

              // Move I slightly left of center, P slightly right -- side by side
              gsap.to(charI, {
                duration: 1,
                ease: "hop",
                delay: 0.5,
                x: cx - rI.left - rI.width - 4,
              });
              gsap.to(charP, {
                duration: 1,
                ease: "hop",
                delay: 0.5,
                x: cx - rP.left + 4,
                onComplete: () => {
                  gsap.set(headerRef.current, { mixBlendMode: "difference" });
                  gsap.to(headerRef.current, {
                    y: "2rem",
                    scale: 0.35,
                    duration: 1.75,
                    ease: "hop",
                  });
                },
              });
            },
          },
          "-=2.5",
        );

        // Wipe out
        tl.to(
          preloaderRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.75,
            ease: "hop",
            onComplete: () => {
              window.clearTimeout(fallbackTimer);
              safeComplete();
            },
          },
          "-=0.5",
        );
      } catch (error) {
        console.error("Preloader animation failed:", error);
        window.clearTimeout(fallbackTimer);
        safeComplete();
      }
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const images = [img1, img2, img3, img4];

  return (
    <>
      <div ref={preloaderRef} className="preloader-overlay">
        <div ref={progressRef} className="preloader-progress" />

        <div ref={imagesWrapRef} className="preloader-images-wrap">
          {images.map((src, i) => (
            <div key={i} className="preloader-img">
              <img src={src} alt="" />
            </div>
          ))}
        </div>

        <div ref={copyRef} className="preloader-copy-wrap">
          <p>
            Frontend Developer focused on building modern, performant, and visually engaging web
            applications using React, TypeScript, and modern UI tooling. Experienced in creating
            responsive interfaces with Tailwind CSS and implementing advanced animations using GSAP
            and Framer Motion.
          </p>
        </div>
      </div>

      <div ref={headerRef} className="preloader-name-wrap">
        <a href="#">
          <span ref={firstNameRef}>IVAN</span>
          <span className="preloader-name-gap">&nbsp;&nbsp;&nbsp;</span>
          <span ref={lastNameRef}>PAVLOVIC</span>
        </a>
      </div>
    </>
  );
}
