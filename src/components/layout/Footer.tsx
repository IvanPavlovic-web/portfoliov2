import portrait from "@assets/footer/portrait.jpg";
import portraitFallback from "@assets/placeholders/portrait-fallback.svg";

const NAV_LINKS = [
  { href: "https://instagram.com/ipwebdev", label: "Instagram" },
  { href: "https://linkedin.com/in/ipprod", label: "LinkedIn" },
  { href: "https://github.com/IvanPavlovic-web", label: "GitHub" },
  { href: "mailto:ipdeveloper2001@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <span className="footer-brand">...END OF THE LINE</span>
        <ul className="footer-nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="footer-main">
        <div className="footer-left">
          <div className="footer-description">
            <p className="footer-desc-label">Bla bla bla blaa</p>
            <div className="footer-desc-cols">
              <p>
                Building modern, performant web experiences with React, TypeScript, and clean,
                scalable UI architecture, with a strong focus on maintainability and performance
                optimization. Experienced in developing responsive interfaces and structuring
                applications for long-term growth and reliability.
              </p>
              <p>
                Focused on smooth, high-performance animations using GSAP and Framer Motion,
                enhancing user interaction without sacrificing speed. Passionate about creating
                polished, visually engaging experiences that balance aesthetics with usability,
                supported by real-world problem-solving and production experience.
              </p>
            </div>
          </div>

          <h2 className="footer-headline">IVAN PAVLOVIC</h2>

          <div className="footer-bottom-row">
            <div className="footer-icons">
              <div className="icon-block">
                <div className="icon-inner" />
              </div>
              <div className="icon-block">
                <div className="icon-inner" />
              </div>
            </div>

            <a
              className="footer-arrow-btn"
              href="mailto:ipdeveloper2001@gmail.com"
              aria-label="Send email"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16v12H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <span>LET&apos;S CONNECT</span>
            </a>
          </div>
        </div>

        <div className="footer-right">
          <img
            src={portrait}
            alt="Portrait"
            className="footer-figure"
            onError={(event) => {
              if (event.currentTarget.src.endsWith(portraitFallback)) return;
              event.currentTarget.src = portraitFallback;
            }}
          />
          <div className="footer-orange-overlay" />
        </div>

        <div className="footer-dots">
          <span className="dot" />
          <span className="dot dot--active" />
          <span className="dot" />
        </div>
      </div>
    </footer>
  );
}
