"use client";

import { useRef, useCallback } from "react";

interface BlurHeadlineProps {
  text: string;
}

export default function BlurHeadline({ text }: BlurHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const chars = charsRef.current;
    if (!chars.length) return;

    const mouseX = e.clientX;
    const radius = 160; // px radius of the clear zone

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (!char) continue;
      const rect = char.getBoundingClientRect();
      const charCenter = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - charCenter);

      if (dist < radius) {
        const progress = 1 - dist / radius;
        const eased = progress * progress * (3 - 2 * progress); // smoothstep
        const blur = (1 - eased) * 2;
        char.style.filter = `blur(${blur}px)`;
        char.style.opacity = `${0.4 + eased * 0.6}`;
      } else {
        char.style.filter = "blur(2px)";
        char.style.opacity = "0.4";
      }
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const chars = charsRef.current;
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (!char) continue;
      char.style.filter = "blur(2px)";
      char.style.opacity = "0.4";
    }
  }, []);

  return (
    <h1
      ref={containerRef}
      className="font-display font-normal leading-none text-[var(--text-primary)] tracking-tight cursor-default"
      style={{ fontSize: "var(--type-display)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => { charsRef.current[i] = el; }}
          className="inline-block transition-[filter,opacity] duration-100"
          style={{ filter: "blur(2px)", opacity: 0.75, whiteSpace: "pre" }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}
