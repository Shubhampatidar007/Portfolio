import React from "react";
import "./Hero.css";
import userImg from "../img/user1.png";
export default function Hero({
  name = "Shubh!",
  title = "Driven Undergraduate exploring A.I",
  imageSrc = "/img/user.png",
}) {
  return (
    <section className="hero-root">
      <div className="hero-box">
        <div className="hero-top">
          <div className="hero-intro">
            <h1 className="hero-name-line">
              <span className="hero-im">I'm&nbsp;</span>
              <span className="hero-name">{name}</span>
            </h1>

            <h2 className="hero-title-line">{title}</h2>

            {/* Skills list instead of CTA */}
            <ul className="hero-skills">
              <li>Strong Communication Skills 🗣️</li>
              <li>Problem Solver 🧩</li>
              <li>Creative Thinker 💡</li>
            </ul>
          </div>
          <div className="hero-image-wrap">
            <div className="hero-photo-oval">
              <img src={userImg} alt={name} className="hero-photo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
