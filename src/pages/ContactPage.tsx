import { Link } from "react-router-dom";

export function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-page-shell">
        <div className="contact-page-header">
          <span className="contact-label">Contact</span>
          <p className="contact-subtitle">Let’s connect. I’m ready for the next build.</p>
        </div>

        <div className="contact-card contact-details contact-page-card">
          <h3>Contact details</h3>
          <p>Reach out directly or say hi on socials.</p>
          <ul className="contact-list">
            <li>
              <span>Email</span>
              <a href="mailto:ipdeveloper@gmail.com">ipdeveloper@gmail.com</a>
            </li>
            <li>
              <span>Phone</span>
              <a href="tel:+38766043000">+387 66 043 000</a>
            </li>
            <li>
              <span>Instagram</span>
              <a href="https://instagram.com/ipwebdev" target="_blank" rel="noreferrer">
                @ipwebdev
              </a>
            </li>
            <li>
              <span>GitHub</span>
              <a href="https://github.com/IvanPavlovic-web" target="_blank" rel="noreferrer">
                IvanPavlovic-web
              </a>
            </li>
            <li>
              <span>LinkedIn</span>
              <a href="https://linkedin.com/in/ipprod" target="_blank" rel="noreferrer">
                linkedin.com/in/ipprod
              </a>
            </li>
          </ul>
          <Link to="/" className="contact-submit">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
