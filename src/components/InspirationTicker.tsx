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

    const totalChars = chars.length;
    const halfCount = totalChars / 2;
    const halfWidth = track.scrollWidth / 2;
    const isMobile = window.innerWidth < 768;
    const scatterZone = isMobile ? 125 : 250;

    // Each char gets unique scatter values + a random resolve offset
    const scatterData = Array.from({ length: totalChars }, () => ({
      y: gsap.utils.random(-12, 12),
      x: gsap.utils.random(-20, 20),
      rotation: gsap.utils.random(-90, 90),
      scale: gsap.utils.random(0.3, 1.8),
      offset: gsap.utils.random(0, 0.5),
    }));

    // Start all chars scattered
    chars.forEach((char, i) => {
      gsap.set(char, {
        opacity: 0,
        y: scatterData[i].y,
        x: scatterData[i].x,
        rotation: scatterData[i].rotation,
        scale: scatterData[i].scale,
      });
    });

    gsap.set(track, { x: -halfWidth });

    const easer = gsap.parseEase("power3.out");

    const scrollTween = gsap.to(track, {
      x: 0,
      duration: halfWidth / 30,
      ease: "none",
      repeat: -1,
      onRepeat() {
        for (let i = 0; i < halfCount; i++) {
          const char1 = chars[i];
          const char2 = chars[i + halfCount];
          const op = gsap.getProperty(char1, "opacity") as number;
          if (op > 0.5) {
            gsap.set(char2, { opacity: 1, y: 0, x: 0, rotation: 0, scale: 1 });
          } else {
            const sd = scatterData[i + halfCount];
            gsap.set(char2, { opacity: 0, y: sd.y, x: sd.x, rotation: sd.rotation, scale: sd.scale });
          }
          const sd1 = scatterData[i];
          gsap.set(char1, { opacity: 0, y: sd1.y, x: sd1.x, rotation: sd1.rotation, scale: sd1.scale });
        }
      },
      onUpdate() {
        const containerRect = container.getBoundingClientRect();
        const leftEdge = containerRect.left;
        const rightEdge = containerRect.right;

        for (let i = 0; i < totalChars; i++) {
          const char = chars[i];
          const rect = char.getBoundingClientRect();
          const charCenter = rect.left + rect.width / 2;
          const distFromLeft = charCenter - leftEdge;

          if (distFromLeft < -40) {
            continue;
          } else if (distFromLeft <= scatterZone) {
            const sd = scatterData[i];
            const rawProgress = Math.max(0, (distFromLeft + 40) / (scatterZone + 40));
            const adjusted = Math.min(1, Math.max(0, (rawProgress - sd.offset) / (1 - sd.offset)));
            const eased = easer(adjusted);

            gsap.set(char, {
              opacity: eased,
              y: sd.y * (1 - eased),
              x: sd.x * (1 - eased),
              rotation: sd.rotation * (1 - eased),
              scale: 1 + (sd.scale - 1) * (1 - eased),
            });
          } else {
            const containerWidth = rightEdge - leftEdge;
            const distFromRight = containerWidth - distFromLeft;

            if (distFromRight < -40) {
              continue;
            } else if (distFromRight <= scatterZone) {
              const sd = scatterData[i];
              const rawProgress = Math.max(0, (distFromRight + 40) / (scatterZone + 40));
              const adjusted = Math.min(1, Math.max(0, (rawProgress - sd.offset) / (1 - sd.offset)));
              const eased = easer(adjusted);

              gsap.set(char, {
                opacity: eased,
                y: sd.y * (1 - eased),
                x: sd.x * (1 - eased),
                rotation: sd.rotation * (1 - eased),
                scale: 1 + (sd.scale - 1) * (1 - eased),
              });
            } else {
              const op = gsap.getProperty(char, "opacity") as number;
              if (op < 1) {
                gsap.set(char, { opacity: 1, y: 0, x: 0, rotation: 0, scale: 1 });
              }
            }
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
    <div ref={containerRef} className="relative overflow-hidden" style={{ height: "calc(var(--type-footer) + 28px)", paddingTop: "10px" }}>
      <div
        ref={trackRef}
        className="whitespace-nowrap font-mono text-[var(--text-muted)] inline-flex"
        style={{ fontSize: "var(--type-footer)" }}
      >
        {charSpans}
      </div>
    </div>
  );
}
