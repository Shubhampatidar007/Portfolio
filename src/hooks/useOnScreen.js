import { useEffect, useState } from "react";

/**
 * Observe when an element is on screen.
 * @param {React.RefObject<HTMLElement>} ref - element ref to observe
 * @param {string} rootMargin - e.g. "-100px" to trigger earlier
 * @returns {boolean}
 */
export default function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const node = ref?.current;
    if (!node) return;

    // If IntersectionObserver is unavailable (SSR/tests), consider visible.
    if (
      typeof window === "undefined" ||
      typeof window.IntersectionObserver === "undefined"
    ) {
      setIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { root: null, rootMargin, threshold: 0.01 }
    );
    observer.observe(node);

    return () => {
      try {
        observer.unobserve(node);
      } catch {}
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}
