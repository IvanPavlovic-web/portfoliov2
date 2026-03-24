import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";

import cert1 from "@assets/certificates/cert-1.webp";
import cert2 from "@assets/certificates/cert-2.webp";
import cert3 from "@assets/certificates/cert-3.webp";
import cert4 from "@assets/certificates/cert-4.webp";
import mediaFallback from "@assets/placeholders/media-fallback.svg";

const CERTIFICATES = [
  {
    id: 1,
    title: "CS50x",
    issuer: "Harvard University",
    desc: "Comprehensive introduction to computer science covering C, Python, algorithms, data structures, SQL, web development, and system design.",
    link: "https://certificates.cs50.io/6ab163e1-000f-45bd-920c-f2d86ebc4d0d.pdf?size=letter",
    image: cert1,
  },
  {
    id: 2,
    title: "Frontend Expert",
    issuer: "AlgoExpert",
    desc: "Specialized training in modern frontend development including HTML, CSS, JavaScript, UI/UX principles, responsive design, and best practices.",
    link: "https://certificate.algoexpert.io/FrontendExpert%20Certificate%20FE-21be7149f1",
    image: cert2,
  },
  {
    id: 3,
    title: "Complete Web Design: Figma to Webflow to Freelancing",
    issuer: "Udemy",
    desc: "End-to-end workflow from UI/UX design in Figma to development in Webflow and freelancing fundamentals.",
    link: "https://www.udemy.com/certificate/UC-03d59078-e8be-4a9b-8e0a-70e06d539d25/",
    image: cert3,
  },
  {
    id: 4,
    title: "Microsoft SQL",
    issuer: "Udemy",
    desc: "Beginner to intermediate SQL covering queries, joins, functions, and database management using SQL Server.",
    link: "https://www.udemy.com/certificate/UC-82c720e8-e2f1-4a74-bedc-e4a8d79bc22b/",
    image: cert4,
  },
];

export function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);
  const [scrollLength, setScrollLength] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, maxX]);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewport = window.innerWidth;
      const overflow = Math.max(0, trackWidth - viewport);
      setMaxX(-overflow);
      setScrollLength(overflow);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <ReactLenis root>
      <section
        id="certificates"
        ref={sectionRef}
        className="certificates-section"
        style={{ "--scroll-length": `${scrollLength}px` } as React.CSSProperties}
      >
        <div className="certificates-header">
          <span className="certificates-label">Certificates</span>
        </div>

        <div className="certificates-scroll-shell">
          <div className="certificates-sticky">
            <motion.div ref={trackRef} className="certificates-track" style={{ x }}>
              {CERTIFICATES.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card"
                >
                  <div className="cert-image">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      onError={(event) => {
                        if (event.currentTarget.src.endsWith(mediaFallback)) return;
                        event.currentTarget.src = mediaFallback;
                      }}
                    />
                  </div>
                  <div className="cert-meta">
                    <p className="cert-title">{cert.title}</p>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <p className="cert-desc">{cert.desc}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </ReactLenis>
  );
}
