import TextAnimation from "@components/ui/scroll-text";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { motion } from "framer-motion";

const SERVICES = [
  {
    id: "service-1",
    align: "left",
    text: "UI systems, landing pages, and fast, scalable web apps built for production.",
  },
  {
    id: "service-2",
    align: "right",
    text: "React, TypeScript, GSAP, Framer Motion, plus Python and T-SQL when workflows need automation or data depth.",
  },
  {
    id: "service-3",
    align: "left",
    text: "Design to code, accessibility, performance, and clean component architecture that stays maintainable.",
  },
  {
    id: "service-4",
    align: "right",
    text: "3D scenes, interactive experiences, and scroll-driven storytelling.",
  },
];

export function Services() {
  const isPhoneLayout = useMediaQuery("(max-width: 640px)");

  return (
    <section id="services" className="services-section">
      <div className="services-header">
        <span className="services-label">Services</span>
        <p className="services-subtitle">
          A quick overview of the products and experiences I design, develop, and bring to
          production, with a focus on performance, scalability, and refined user experience.
        </p>
      </div>

      <div className="services-flow">
        {SERVICES.map((service, index) => (
          <div key={service.id} className={`services-row is-${service.align}`}>
            <TextAnimation
              as="p"
              text={service.text}
              direction={isPhoneLayout ? "down" : service.align === "left" ? "left" : "right"}
              classname="services-text"
              variants={
                isPhoneLayout
                  ? {
                      hidden: { filter: "blur(8px)", opacity: 0, y: 28 },
                      visible: {
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                        transition: { ease: "linear" },
                      },
                    }
                  : index % 2 === 0
                    ? {
                        hidden: { filter: "blur(8px)", opacity: 0, x: -24 },
                        visible: {
                          filter: "blur(0px)",
                          opacity: 1,
                          x: 0,
                          transition: { ease: "linear" },
                        },
                      }
                    : {
                        hidden: { filter: "blur(8px)", opacity: 0, x: 24 },
                        visible: {
                          filter: "blur(0px)",
                          opacity: 1,
                          x: 0,
                          transition: { ease: "linear" },
                        },
                      }
              }
            />
          </div>
        ))}

        <div className="services-row is-center">
          <motion.p
            className="services-text services-stack"
            initial={{ filter: "blur(8px)", opacity: 0, y: 24 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Tech stack: <span className="tech-react">React</span>,{" "}
            <span className="tech-ts">TypeScript</span>, <span className="tech-python">Python</span>
            , <span className="tech-sql">T-SQL</span>, <span className="tech-gsap">GSAP</span>,{" "}
            <span className="tech-framer">Framer Motion</span>,{" "}
            <span className="tech-tailwind">Tailwind</span>,{" "}
            <span className="tech-three">Three.js</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
