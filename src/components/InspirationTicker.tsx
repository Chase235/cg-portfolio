"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { siteContent } from "@/data/content";

export default function InspirationTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current || animatedRef.current) return;
    animatedRef.current = true;

    const container = containerRef.current;
    const track = trackRef.current;
    const chars = track.querySelectorAll(".insp-char");
    if (chars.length === 0) return;

    // Allow overflow during scatter animation
    container.style.overflow = "visible";

    // Set initial state: heavily scattered — big vertical spread, rotation, scale variation
    gsap.set(chars, {
      opacity: 0,
      y: () => gsap.utils.random(-60, 60),
      x: () => gsap.utils.random(-10, 10),
      rotation: () => gsap.utils.random(-40, 40),
      scale: () => gsap.utils.random(0.3, 1.4),
    });

    // Animate letters falling into place — staggered cascade
    const tl = gsap.timeline();

    tl.to(chars, {
      opacity: 1,
      y: 0,
      x: 0,
      rotation: 0,
      scale: 1,
      duration: 0.8,
      stagger: {
        each: 0.004,
        from: "start",
      },
      ease: "back.out(1.4)",
      delay: 0.3,
    });

    // After letters settle, clip overflow and start horizontal scroll
    tl.call(() => {
      container.style.overflow = "hidden";
    });

    tl.to(
      track,
      {
        x: -(track.scrollWidth / 2),
        duration: track.scrollWidth / 2 / 30,
        ease: "none",
        repeat: -1,
      },
      "+=0.5"
    );
  }, []);

  const text = siteContent.inspirations.join(" · ") + " · ";
  const doubled = text + text;

  const charSpans = doubled.split("").map((char, i) => (
    <span key={i} className="insp-char inline-block" style={{ whiteSpace: "pre" }}>
      {char}
    </span>
  ));

  return (
    <div ref={containerRef} className="relative overflow-hidden" style={{ height: "calc(var(--type-footer) + 6px)" }}>
      <div
        ref={trackRef}
        className="whitespace-nowrap font-mono text-[var(--text-muted)] inline-flex"
        style={{ fontSize: "var(--type-footer)" }}
      >
        {charSpans}
      </div>
      <div className="absolute right-0 top-0 h-full w-20 md:w-32 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none z-10" />
    </div>
  );
}
