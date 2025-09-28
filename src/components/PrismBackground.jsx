import React, { useMemo } from "react";
import "./PrismBackground.css";

/**
 * AnimatedStarfield
 * - Pure React + CSS starfield with layered parallax, twinkle and shooting-star.
 * - Lightweight: reduces star count on small screens; respects prefers-reduced-motion.
 *
 * Usage: <AnimatedStarfield />
 * Make sure your .site-root has z-index > 0 so content sits above this background.
 */
export default function AnimatedStarfield() {
  // tune counts; smaller on narrow screens
  const isSmall = typeof window !== "undefined" && window.innerWidth <= 480;
  const layerAcount = isSmall ? 30 : 80; // distant stars
  const layerBcount = isSmall ? 18 : 50; // mid stars
  const layerCcount = isSmall ? 10 : 28; // near bright stars

  // helper to create random stars data only once
  const starsA = useMemo(
    () => generateStars(layerAcount, 0.6, 1.6),
    [layerAcount]
  );
  const starsB = useMemo(
    () => generateStars(layerBcount, 1.0, 2.4),
    [layerBcount]
  );
  const starsC = useMemo(
    () => generateStars(layerCcount, 1.6, 3.6),
    [layerCcount]
  );

  return (
    <div className="starfield-bg" aria-hidden="true">
      {/* soft nebulous color blobs (keep subtle) */}
      <div className="nebula nebula-left" />
      <div className="nebula nebula-right" />
      <div className="nebula nebula-center" />

      {/* layers of stars */}
      <div className="star-layer layer-a">
        {starsA.map((s, i) => (
          <span
            key={`a-${i}`}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.o,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.twinkle}s`,
            }}
          />
        ))}
      </div>

      <div className="star-layer layer-b">
        {starsB.map((s, i) => (
          <span
            key={`b-${i}`}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.o,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.twinkle}s`,
            }}
          />
        ))}
      </div>

      <div className="star-layer layer-c">
        {starsC.map((s, i) => (
          <span
            key={`c-${i}`}
            className="star bright"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.o,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.twinkle}s`,
            }}
          />
        ))}
      </div>

      {/* occasional shooting star element */}
      <div className="shooting-star" />

      {/* faint dust / grain overlay */}
      <div className="star-grain" />
    </div>
  );
}

/* helper: create deterministic-ish random star attributes */
function generateStars(count, minSize = 1, maxSize = 3) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = +(minSize + Math.random() * (maxSize - minSize)).toFixed(2);
    const o = +(0.35 + Math.random() * 0.8).toFixed(2);
    const delay = +(Math.random() * 8).toFixed(2);
    const twinkle = +(3 + Math.random() * 6).toFixed(2);
    arr.push({ x, y, size, o, delay, twinkle });
  }
  return arr;
}
