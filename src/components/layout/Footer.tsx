import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";

const SERVICE_LINKS = [
  { href: "/#services", label: "Website Development" },
  { href: "/#services", label: "Frontend Systems" },
  { href: "/#services", label: "Motion & Interaction" },
  { href: "/contact", label: "Project Planning" },
];

const EXPLORE_LINKS = [
  { href: "/projects", label: "All Projects" },
  { href: "/#projects", label: "Selected Work" },
  { href: "/#certificates", label: "Certificates" },
];

const SOCIAL_LINKS: Array<{
  href: string;
  label: string;
  value: string;
  icon: LucideIcon;
  external?: boolean;
}> = [
  {
    href: "https://instagram.com/ipwebdev",
    label: "Instagram",
    value: "@ipwebdev",
    icon: Instagram,
    external: true,
  },
  {
    href: "https://linkedin.com/in/ipprod",
    label: "LinkedIn",
    value: "linkedin.com/in/ipprod",
    icon: Linkedin,
    external: true,
  },
  {
    href: "https://github.com/IvanPavlovic-web",
    label: "GitHub",
    value: "github.com/IvanPavlovic-web",
    icon: Github,
    external: true,
  },
  {
    href: "mailto:ipdeveloper2001@gmail.com",
    label: "Email",
    value: "ipdeveloper2001@gmail.com",
    icon: Mail,
  },
];

const STACK_ITEMS = [
  "React 19",
  "TypeScript",
  "Python",
  "T-SQL",
  "GSAP",
  "Framer Motion",
  "Three.js",
  "Vite",
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-card">
        <div className="footer-top">
          <div className="footer-intro">
            <p className="footer-intro-copy">
              Frontend developer
              <br />
              for polished web experiences
            </p>
          </div>

          <a className="footer-contact-pill" href="/contact">
            <span>Contact</span>
            <ArrowUpRight size={24} aria-hidden="true" />
          </a>
        </div>

        <div className="footer-grid">
          <div className="footer-column">
            <p className="footer-column-title">Services</p>
            <div className="footer-link-list">
              {SERVICE_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="footer-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Explore</p>
            <div className="footer-link-list">
              {EXPLORE_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="footer-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Say hello!</p>
            <div className="footer-socials">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="footer-social-pill"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    aria-label={link.label}
                  >
                    <Icon size={14} aria-hidden="true" />
                    <span>{link.value}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Creative stack</p>
            <div className="footer-stack">
              {STACK_ITEMS.map((item) => (
                <span key={item} className="footer-stack-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
