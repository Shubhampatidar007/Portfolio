import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./DarkNavbar.css";

export default function DarkNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const location = useLocation(); // to detect active page

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Knowledge", path: "/knowledge" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e) => {
      if (!e.target.closest(".navbar")) setMenuOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [menuOpen]);

  return (
    <div className="navbar-wrapper">
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              THE VIBE CODER
            </Link>
          </div>

          {/* Desktop Links */}
          {!isMobile && (
            <nav className="navbar-links">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={location.pathname === link.path ? "active" : ""}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Navbar Actions */}
          <div className="navbar-actions">
            {!isMobile && (
              <Link to="/contact" className="request-btn">
                Contact Me ❤️
              </Link>
            )}

            {isMobile && (
              <button
                className="icon-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="menu toggle"
              >
                <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && menuOpen && (
          <div className="navbar-links mobile-menu">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={location.pathname === link.path ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mobile-contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact Me ❤️
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
