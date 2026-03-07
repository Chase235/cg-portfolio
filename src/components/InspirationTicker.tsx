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
    const chars = track.querySelectorAll<HTMLSpanElement>(".insp-char");
    if (chars.length === 0) return;

    const halfWidth = track.scrollWidth / 2;
    const scatterZone = 120; // px from left edge where scatter happens

    // Start all chars invisible
    gsap.set(chars, { opacity: 0 });

    // Track which chars are currently "active" (visible and settled)
    const settled = new Set<Element>();

    // Scatter a char and animate it settling
    function scatterIn(char: Element) {
      if (settled.has(char)) return;
      settled.add(char);
      gsap.fromTo(
        char,
        {
          opacity: 0,
          y: gsap.utils.random(-50, 50),
          x: gsap.utils.random(-8, 8),
          rotation: gsap.utils.random(-35, 35),
          scale: gsap.utils.random(0.4, 1.3),
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)",
        }
      );
    }

    // Reset a char when it exits right so it can scatter again on re-entry
    function resetChar(char: Element) {
      if (!settled.has(char)) return;
      settled.delete(char);
      gsap.set(char, { opacity: 0 });
    }

    // Start track offset left, scroll rightward
    gsap.set(track, { x: -halfWidth });

    const scrollTween = gsap.to(track, {
      x: 0,
      duration: halfWidth / 30,
      ease: "none",
      repeat: -1,
      onUpdate() {
        const containerRect = container.getBoundingClientRect();
        const leftEdge = containerRect.left;
        const rightEdge = containerRect.right;

        for (let i = 0; i < chars.length; i++) {
          const char = chars[i];
          const rect = char.getBoundingClientRect();
          const charCenter = rect.left + rect.width / 2;

          // Char entering from left — within scatter zone
          if (charCenter >= leftEdge - 20 && charCenter <= leftEdge + scatterZone) {
            scatterIn(char);
          }
          // Char exited past right edge — reset for next loop
          else if (charCenter > rightEdge + 50) {
            resetChar(char);
          }
          // Char is in the middle visible area but not settled (e.g. initial load)
          else if (charCenter > leftEdge + scatterZone && charCenter < rightEdge && !settled.has(char)) {
            // Instantly show chars already in view on first pass
            settled.add(char);
            gsap.set(char, { opacity: 1, y: 0, x: 0, rotation: 0, scale: 1 });
          }
        }
      },
    });

    return () => {
      scrollTween.kill();
    };
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
