import { Link } from "react-router-dom";

export function StartProjectPage() {
  return (
    <section className="start-project-page">
      <div className="start-project-shell">
        <div className="start-project-grid">
          <div className="start-project-hero">
            <p className="start-project-eyebrow">Start a project</p>
            <h1 className="start-project-title">
              DROP US
              <br />
              A LINE
            </h1>
          </div>

          <div className="start-project-card">
            <h3>Contact</h3>
            <a href="mailto:ipdeveloper@gmail.com">ipdeveloper@gmail.com</a>
            <a href="tel:+38766043000">+387 66 043 000</a>
          </div>

          <div className="start-project-card">
            <h3>Stalk us</h3>
            <a
              href="https://instagram.com/ipwebdev"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a href="https://github.com/IvanPavlovic-web" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/ipprod" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

          <div className="start-project-wide">
            <p>
              I&apos;m available to help with any questions about your next digital
              product. Reach out any time and I&apos;ll respond within 24 hours.
            </p>
            <Link to="/" className="start-project-button">
              Get me back to the main page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
