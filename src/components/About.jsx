// About.jsx
import React from "react";
import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaCalendarAlt,
  FaGithub,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";
import "./about.css";
import img from "../img/user1.jpg";
export default function About() {
  // Replace these with real timeline items or fetch from data file later
  const timeline = [
    {
      id: 1,
      title: "Undergraduate — B.Tech ",
      subtitle: "Computer Science — Mandsaur University ",
      period: "2025 - Present",
      icon: <FaGraduationCap />,
    },
    {
      id: 2,
      title: "-",
      subtitle: "-",
      period: "-",
      icon: <FaBriefcase />,
    },
    {
      id: 3,
      title: "Open-source contributor",
      subtitle: "Various repos — utilities & demos",
      period: "2025 - Present",
      icon: <FaGithub />,
    },
  ];

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "C",
    "Data Structures",
    "ML Basics",
    "Data science and algorithms",
  ];

  return (
    <main className="about-page">
      <section className="about-hero glass">
        <div className="about-left">
          <h1 className="about-title">About Me</h1>
          <p className="about-lead">
            Driven undergraduate exploring A.I — I build thoughtful web
            experiences, small-scale ML proofs-of-concept, and open-source tools
            to learn and teach.
          </p>

          <div className="about-meta">
            <div className="meta-item">
              <FaMapMarkerAlt className="meta-icon" />
              <div>
                <div className="meta-label">Location</div>
                <div className="meta-value">Mandsaur, Madhya Pradesh</div>
              </div>
            </div>

            <div className="meta-item">
              <FaGraduationCap className="meta-icon" />
              <div>
                <div className="meta-label">Study</div>
                <div className="meta-value">
                  Computer Science — Undergraduate
                </div>
              </div>
            </div>
          </div>

          <div className="about-ctas">
            <a className="btn btn-primary" href="/knowledge">
              View Knowledge
            </a>
            <a className="btn btn-ghost" href="/contact">
              Contact Me
            </a>
          </div>
        </div>

        <div className="about-right">
          <div className="avatar glass">
            {/* Replace src with your avatar image if you have one */}
            <img alt="avatar" src={img} aria-hidden className="avatar-img" />
            <div className="avatar-name">Shubh</div>
            <div className="avatar-role">Developer • AI Enthusiast</div>
          </div>

          <div className="socials">
            <a
              href="https://github.com/Shubhampatidar007"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a href="Shubhampatidar7851@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
            <a
              href="https://www.linkedin.com/in/shubham-patidar-87b6b9381/"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </section>

      <section className="about-skills glass">
        <h3 className="section-heading">Skills & Tools</h3>
        <div className="skills-list">
          {skills.map((s) => (
            <div key={s} className="skill-pill">
              {s}
            </div>
          ))}
        </div>
      </section>

      <section className="about-timeline glass">
        <h3 className="section-heading">Experience & Education</h3>
        <ol className="timeline">
          {timeline.map((t) => (
            <li key={t.id} className="timeline-item">
              <div className="timeline-icon">{t.icon}</div>
              <div className="timeline-body">
                <div className="timeline-head">
                  <h4 className="timeline-title">{t.title}</h4>
                  <div className="timeline-period">
                    <FaCalendarAlt /> {t.period}
                  </div>
                </div>
                <p className="timeline-sub">{t.subtitle}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-cta glass">
        <h3>Want to work together?</h3>
        <p>
          I'm open to collaborations and internships. Let's create something
          great.
        </p>
        <div className="about-ctas">
          <a className="btn btn-primary" href="/contact">
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
}
