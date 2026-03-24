import { Link } from "react-router-dom";
import ImageMouseTrail from "@components/ui/mousetrail";
import mediaFallback from "@assets/placeholders/media-fallback.svg";

// Import all .webp images from the contact assets folder.
// Vite glob import automatically picks up every .webp you drop in that folder.
// No need to list them manually; just add/remove files from the folder.
const imageModules = import.meta.glob("../../assets/contact/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

const CONTACT_IMAGES: string[] = Object.values(imageModules);
const TRAIL_IMAGES = CONTACT_IMAGES.length > 0 ? CONTACT_IMAGES : [mediaFallback];

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <ImageMouseTrail
        items={TRAIL_IMAGES}
        distance={55}
        lerp={0.06}
        imgClass="contact-trail-img"
        className="contact-trail"
        poolSize={10}
        fallbackSrc={mediaFallback}
      >
        <div className="contact-shell">
          <p className="contact-eyebrow">Let's work together</p>

          <h2 className="contact-heading">
            Got a project
            <br />
            in <em>mind?</em>
          </h2>

          <p className="contact-sub">
            Whether it's a brand-new build or a redesign, I'd love to hear about it.
          </p>

          <ul className="contact-info-row">
            <li className="contact-info-item">
              <span className="contact-info-label">Email</span>
              <a href="mailto:ipdeveloper2001@gmail.com" className="contact-info-value">
                ipdeveloper2001@gmail.com
              </a>
            </li>
            <li className="contact-info-divider" aria-hidden="true" />
            <li className="contact-info-item">
              <span className="contact-info-label">Based in</span>
              <span className="contact-info-value">Bosnia &amp; Herzegovina</span>
            </li>
            <li className="contact-info-divider" aria-hidden="true" />
            <li className="contact-info-item">
              <span className="contact-info-label">Availability</span>
              <span className="contact-info-value contact-available">
                <span className="contact-dot" />
                Open to work
              </span>
            </li>
          </ul>

          <div className="contact-actions">
            <Link
              to="/start-project"
              target="_blank"
              rel="noreferrer"
              className="contact-btn-primary"
            >
              Start a project
            </Link>
            <a href="mailto:ipdeveloper2001@gmail.com" className="contact-btn-secondary">
              Send an email
            </a>
          </div>
        </div>
      </ImageMouseTrail>
    </section>
  );
}
