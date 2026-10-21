"use client";

import { useEffect, useRef } from "react";

export function HeroGlow() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = false;
    const sync = () => {
      element.style.setProperty("--glow-play", visible && !document.hidden ? "running" : "paused");
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return <div ref={root} className="hero-glow" aria-hidden="true"><span className="hero-glow-blue"/><span className="hero-glow-violet"/><span className="hero-glow-edge"/></div>;
}
