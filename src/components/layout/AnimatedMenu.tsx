import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const MENU_ROWS = [
  { items: [{ label: "Home", to: "#home" }], className: "menu-row r-1" },
  { items: [{ label: "Projects", to: "#projects" }], className: "menu-row r-2" },
  { items: [{ label: "Certificates", to: "#certificates" }], className: "menu-row r-3" },
  { items: [{ label: "Job History", to: "#job-history" }], className: "menu-row r-4" },
  { items: [{ label: "FAQ", to: "#faq" }], className: "menu-row r-5" },
  { items: [{ label: "Services", to: "#services" }], className: "menu-row r-5" },
  { items: [{ label: "Contact", to: "#contact" }], className: "menu-row r-5" },
];

export function AnimatedMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = menuRef.current!.querySelectorAll(".menu-row");

    const tl = gsap.timeline({ paused: true });

    tl.to(contentRef.current, {
      duration: 2,
      ease: "power4.inOut",
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      scale: 0.5,
    });

    tl.to(
      rows,
      {
        duration: 3,
        left: "0%",
        ease: "power4.inOut",
        stagger: 0.1,
      },
      "-=2.5",
    );

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const handleToggle = () => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.reverse();
    } else {
      tlRef.current.play();
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Menu overlay */}
      <div ref={menuRef} className={`animated-menu${isOpen ? " is-open" : ""}`}>
        {MENU_ROWS.map((row, i) => (
          <div key={i} className={row.className}>
            {row.items.map(({ label, to }) => (
              <div key={label} className="menu-link">
                {to.startsWith("#") ? (
                  <a href={to} onClick={handleToggle}>
                    {label}
                  </a>
                ) : (
                  <Link to={to} onClick={handleToggle}>
                    {label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Website content slot â€” hero will render inside this */}
      <div ref={contentRef} className="menu-content-wrap" />

      {/* Navbar */}
      <nav className="animated-nav">
        <div className="animated-nav-logo">IP</div>
        <button className="animated-nav-toggle" onClick={handleToggle}>
          {isOpen ? "Close" : "Menu"}
        </button>
      </nav>
    </>
  );
}
