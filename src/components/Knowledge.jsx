// Knowledge.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaGithub,
  FaChevronDown,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { SiC } from "react-icons/si";
import "./Knowledge.css";

/* ---------- Data ---------- */
const skills = [
  {
    id: "html",
    label: "HTML",
    Icon: FaHtml5,
    projects: 5,
    experience: "2 yrs",
  },
  {
    id: "css",
    label: "CSS",
    Icon: FaCss3Alt,
    projects: 4,
    experience: "1.8 yrs",
  },
  {
    id: "js",
    label: "JavaScript",
    Icon: FaJs,
    projects: 6,
    experience: "1.5 yrs",
  },
  {
    id: "python",
    label: "Python",
    Icon: FaPython,
    projects: 3,
    experience: "1 yr",
  },
  { id: "c", label: "C", Icon: SiC, projects: 2, experience: "6 months" },
];

const progressItems = [
  { id: "pending", label: "Pending Projects", value: 64 },
  { id: "learning", label: "Learning Goals", value: 42 },
  { id: "research", label: "Upcoming Experiments", value: 28 },
];

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    tag: "Frontend",
    github: "https://github.com/yourname/portfolio",
  },
  {
    id: 2,
    title: "Chatbot Prototype",
    tag: "Python App",
    github: "https://github.com/yourname/chatbot",
  },
  {
    id: 3,
    title: "Sorting Visualizer",
    tag: "C Project",
    github: "https://github.com/yourname/sorting-visualizer",
  },
  {
    id: 4,
    title: "Task Manager",
    tag: "Fullstack",
    github: "https://github.com/yourname/task-manager",
  },
];

/* ---------- Helper: animate circular progress ---------- */
function useAnimateProgress(containerRef, target, enabled) {
  useEffect(() => {
    if (!enabled) return;
    const node = containerRef.current;
    if (!node) return;
    const circle = node.querySelector("circle.progress-circle");
    const valueNode = node.querySelector(".percent-value");
    if (!circle || !valueNode) return;

    // read radius from DOM (keeps JS & CSS in sync)
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    // initialize
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    valueNode.textContent = `0%`;

    let start = null;
    const startValue = 0;
    const duration = 900 + Math.random() * 600; // 0.9s - 1.5s

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(startValue + (target - startValue) * progress);
      const offset = circumference - (current / 100) * circumference;
      circle.style.strokeDashoffset = offset;
      valueNode.textContent = `${current}%`;
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }, [containerRef, target, enabled]);
}

/* ---------- Circular spinner component ----------
   - SVG viewBox 0 0 140 140 (center 70,70 radius 50)
   - CSS rotates the progress-circle so the arc grows FROM the bottom.
   - percent + label are rendered as sibling block below the SVG (so they're outside the ring).
*/
const CircularProgress = ({ value = 0, label, appear }) => {
  const containerRef = useRef(null);
  const gradientIdRef = useRef(
    `grad-${Math.random().toString(36).slice(2, 9)}`
  );

  useAnimateProgress(containerRef, value, appear);

  return (
    <div
      className={`pp-spinner ${appear ? "pp-show" : ""}`}
      ref={containerRef}
      aria-hidden={!appear}
    >
      <svg
        className="pp-svg"
        viewBox="0 0 140 140"
        role="img"
        aria-label={`${label} ${value}%`}
      >
        <defs>
          <linearGradient id={gradientIdRef.current} x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(255,209,102,0.95)" />
            <stop offset="100%" stopColor="rgba(255,120,180,0.95)" />
          </linearGradient>
        </defs>

        {/* center 70, radius 50, stroke 10 (matches Knowledge.css) */}
        <circle className="bg-circle" cx="70" cy="70" r="50" />
        <circle
          className="progress-circle"
          cx="70"
          cy="70"
          r="50"
          stroke={`url(#${gradientIdRef.current})`}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* meta block placed under the ring to avoid overlap */}
      <div className="pp-meta">
        <div className="percent-value">0%</div>
        <div className="pp-label">{label}</div>
      </div>
    </div>
  );
};

/* ---------- Main Knowledge component (skills / progress / projects) ---------- */
export default function Knowledge() {
  const [showProgress, setShowProgress] = useState(false);
  const [spinnersAppear, setSpinnersAppear] = useState(false);

  // active skill state (for click-to-expand)
  const [activeSkill, setActiveSkill] = useState(null);
  const [skillCount, setSkillCount] = useState(0);
  const prevActiveRef = useRef(null);

  useEffect(() => {
    if (showProgress) {
      const t = setTimeout(() => setSpinnersAppear(true), 140);
      return () => clearTimeout(t);
    } else {
      setSpinnersAppear(false);
    }
  }, [showProgress]);

  // animate skill project counter when activated
  useEffect(() => {
    if (!activeSkill) {
      setSkillCount(0);
      prevActiveRef.current = null;
      return;
    }

    const skillObj = skills.find((s) => s.id === activeSkill);
    if (!skillObj) return;

    if (prevActiveRef.current === activeSkill) return;
    prevActiveRef.current = activeSkill;

    const target = skillObj.projects || 0;
    let start = null;
    const duration = 700 + Math.random() * 300;

    function step(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(progress * target);
      setSkillCount(current);
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }, [activeSkill]);

  function toggleSkill(id) {
    setActiveSkill((cur) => (cur === id ? null : id));
  }

  return (
    <main className="pp-page" aria-labelledby="pp-heading">
      <div className="pp-hero glass" id="pp-heading">
        <h1 className="pp-title">My Progress</h1>
        <p className="pp-sub">Tracking my journey in development.</p>
      </div>

      <section className="pp-skills glass" aria-labelledby="skills-heading">
        <h3 id="skills-heading" className="section-heading">
          Completed Languages / Skills
        </h3>

        <div className="skills-grid">
          {skills.map((s) => {
            const Icon = s.Icon;
            const isActive = activeSkill === s.id;
            return (
              <div
                key={s.id}
                className={`skill-box ${isActive ? "active" : ""}`}
                title={s.label}
                onClick={() => toggleSkill(s.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleSkill(s.id);
                  }
                }}
                aria-pressed={isActive}
                aria-expanded={isActive}
              >
                <div className="skill-inner">
                  <div className="skill-icon" aria-hidden>
                    <Icon />
                  </div>
                  <div className="skill-label">{s.label}</div>

                  <div
                    className={`skill-details ${isActive ? "show" : ""}`}
                    aria-hidden={!isActive}
                  >
                    <div className="details-row">
                      <div className="details-count">
                        <div className="count-num">
                          {isActive ? skillCount : 0}
                        </div>
                        <div className="count-label">Projects</div>
                      </div>
                      <div className="details-exp">
                        <div className="exp-label">Experience</div>
                        <div className="exp-value">{s.experience}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="more-row">
          <button
            className={`more-btn ${showProgress ? "active" : ""}`}
            onClick={() => setShowProgress((v) => !v)}
            aria-expanded={showProgress}
            aria-controls="pp-progress-area"
          >
            <FaChevronDown className="chev" />
            {showProgress ? "Hide" : "More"}
          </button>
        </div>

        <div
          id="pp-progress-area"
          className={`progress-area ${showProgress ? "visible" : ""}`}
        >
          <div className={`spinners ${spinnersAppear ? "entered" : ""}`}>
            {progressItems.map((p) => (
              <CircularProgress
                key={p.id}
                value={p.value}
                label={p.label}
                appear={spinnersAppear}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pp-projects glass" aria-labelledby="projects-heading">
        <h3 id="projects-heading" className="section-heading">
          Main Projects
        </h3>

        <div className="projects-grid">
          {projects.map((pr) => (
            <article
              key={pr.id}
              className="project-card"
              role="article"
              aria-label={pr.title}
            >
              <div className="project-content">
                <h4 className="project-title">{pr.title}</h4>
                <span className="project-tag">{pr.tag}</span>
              </div>
              <div className="project-actions">
                <a
                  className="icon-btn"
                  href={pr.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${pr.title} on GitHub`}
                >
                  <FaGithub />
                  <FaExternalLinkAlt className="ext" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="pp-footer" aria-label="Progress page footer">
        <div className="pp-footer-inner glass">
          <div>Made with ❤️ — contact me on GitHub</div>
          <div className="pp-footer-links">
            <a
              href="https://github.com/yourname"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a href="mailto:youremail@example.com">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
