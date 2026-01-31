// Footer.jsx
import React from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = ({
  whatsappNumber = "NO--",
  instagram = "https://instagram.com/vibeswithshubh",
  linkedin = "www.linkedin.com/in/shubham-patidar-87b6b9381",
  github = "https://github.com/shubhampatidar007",
  email = "shubhampatidar007@gmail.com",
  location = "Mandsaur, India (In) ",
}) => {
  // sanitize number to digits only for wa.me links
  const cleanNumber = (whatsappNumber || "").replace(/\D/g, "");
  const waLink = cleanNumber ? `https://wa.me/${cleanNumber}` : "#";

  return (
    <footer className="vibe-footer">
      <div className="vibe-container">
        <div className="vibe-left">
          <h3 className="vibe-title">THE VIBE CODER</h3>
          <p className="vibe-desc">
            Driven Undergraduate exploring A.I — let's build things that feel
            alive.
          </p>

          <div className="vibe-social" aria-hidden>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="icon"
            >
              <FaInstagram />
            </a>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="icon"
            >
              <FaWhatsapp />
            </a>

            <a href={`mailto:${email}`} aria-label="Email" className="icon">
              <FaEnvelope />
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="icon"
            >
              <FaLinkedin />
            </a>

            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="icon"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        <div className="vibe-middle">
          <h4>Contact</h4>
          <ul className="contact-list">
            <li>
              <FaWhatsapp className="li-icon" />
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                {whatsappNumber}
              </a>
            </li>

            <li>
              <FaEnvelope className="li-icon" />
              <a href={`mailto:${email}`}>{email}</a>
            </li>

            <li>
              <FaMapMarkerAlt className="li-icon" />
              <span>{location}</span>
            </li>
          </ul>
        </div>

        <div className="vibe-right">
          <h4>More</h4>
          <p className="more-text">
            Open-source projects, blog & collaborations — check my GitHub &
            LinkedIn.
          </p>
          <div className="vibe-cta">
            <a
              className="btn"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub
            </a>
            <a
              className="btn ghost"
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect
            </a>
          </div>
        </div>
      </div>

      <div className="vibe-bottom">
        <p>
          © {new Date().getFullYear()} The Vibe Coder — Designed with ❤️ by
          Shubh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
