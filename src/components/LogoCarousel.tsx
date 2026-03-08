"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LOGO_FILES = [
  "Clerestory",
  "coraa",
  "duaneReade",
  "finfuego",
  "highline",
  "monday",
  "ncino",
];

interface LogoData {
  slug: string;
  viewBox: string;
  paths: string[];
  width: number;
  height: number;
}

// ─── Cursor Trail ───────────────────────────────────────────

const TRAIL_COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
  "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F",
  "#BB8FCE", "#85C1E9", "#F1948A", "#82E0AA",
];

const TRAIL_POOL_SIZE = 30;

function CursorTrail({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const trailRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const trail = trailRef.current;
    if (!container || !trail) return;

    const pool: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_POOL_SIZE; i++) {
      const el = document.createElement("div");
      el.style.cssText = `
        position: absolute;
        pointer-events: none;
        width: 12px;
        height: 12px;
        opacity: 0;
        z-index: 1;
      `;
      if (i % 3 === 0) {
        el.style.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
      } else if (i % 3 === 1) {
        el.style.borderRadius = "50%";
      } else {
        el.style.clipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
      }
      el.style.backgroundColor = TRAIL_COLORS[i % TRAIL_COLORS.length];
      trail.appendChild(el);
      pool.push(el);
    }

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const count = Math.floor(Math.random() * 2) + 1;
      for (let c = 0; c < count; c++) {
        const el = pool[indexRef.current % TRAIL_POOL_SIZE];
        indexRef.current++;

        const size = gsap.utils.random(6, 18);
        const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];

        gsap.killTweensOf(el);
        gsap.set(el, {
          x: x - size / 2,
          y: y - size / 2,
          width: size,
          height: size,
          opacity: 1,
          scale: 1,
          rotation: gsap.utils.random(0, 360),
          backgroundColor: color,
        });

        gsap.to(el, {
          x: `+=${gsap.utils.random(-60, 60)}`,
          y: `+=${gsap.utils.random(-60, 60)}`,
          opacity: 0,
          scale: gsap.utils.random(0.2, 2.5),
          rotation: `+=${gsap.utils.random(-180, 180)}`,
          duration: gsap.utils.random(0.5, 1.2),
          ease: "power2.out",
        });
      }
    };

    container.addEventListener("mousemove", handleMove);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      pool.forEach((el) => el.remove());
    };
  }, [containerRef]);

  return (
    <div
      ref={trailRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
    />
  );
}

// ─── Blueprint Resolve Logo Carousel ────────────────────────

export default function LogoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [logos, setLogos] = useState<LogoData[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Fetch and parse all SVGs
  useEffect(() => {
    Promise.all(
      LOGO_FILES.map(async (slug) => {
        const res = await fetch(`/logos/${slug}.svg`);
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const svg = doc.querySelector("svg");
        if (!svg) return null;

        const viewBox = svg.getAttribute("viewBox") || "0 0 100 100";
        const parts = viewBox.split(/\s+/).map(Number);
        const w = parts[2] || 100;
        const h = parts[3] || 100;

        const paths: string[] = [];
        svg.querySelectorAll("path").forEach((p) => {
          const d = p.getAttribute("d");
          if (d) paths.push(d);
        });

        return { slug, viewBox, paths, width: w, height: h };
      })
    ).then((results) => {
      setLogos(results.filter(Boolean) as LogoData[]);
    });
  }, []);

  // Build GSAP timeline
  useEffect(() => {
    if (logos.length === 0 || !svgRef.current) return;

    const rafId = requestAnimationFrame(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const master = gsap.timeline({ repeat: -1, delay: 0.5 });

      logos.forEach((_, i) => {
        const group = svg.querySelector(`.logo-group-${i}`) as SVGGElement;
        const strokePaths = svg.querySelectorAll(`.logo-group-${i} .stroke-path`);
        const fillPaths = svg.querySelectorAll(`.logo-group-${i} .fill-path`);
        const annotations = svg.querySelector(`.logo-group-${i} .annotations`);
        const dimLines = svg.querySelectorAll(`.logo-group-${i} .dim-line`);
        const labels = svg.querySelectorAll(`.logo-group-${i} .bp-label`);
        const corners = svg.querySelectorAll(`.logo-group-${i} .corner-bracket`);

        if (!group || strokePaths.length === 0) return;

        // Measure and set stroke dash
        strokePaths.forEach((p) => {
          const el = p as SVGPathElement;
          try {
            const len = el.getTotalLength();
            gsap.set(el, {
              strokeDasharray: len,
              strokeDashoffset: len,
              opacity: 1,
            });
          } catch {
            gsap.set(el, { opacity: 1 });
          }
        });

        gsap.set(fillPaths, { opacity: 0 });
        gsap.set(group, { x: 500, opacity: 0 });
        if (annotations) gsap.set(annotations, { opacity: 0 });

        const sub = gsap.timeline();

        // ENTER
        sub.to(group, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });

        if (annotations) {
          sub.to(annotations, { opacity: 0.6, duration: 0.4 }, "<0.3");
        }

        // Dim lines draw on
        if (dimLines.length) {
          dimLines.forEach((line) => {
            try {
              const len = (line as SVGGeometryElement).getTotalLength?.() || 100;
              gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
            } catch { /* skip */ }
          });
          sub.to(dimLines, {
            strokeDashoffset: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power1.inOut",
          }, "<0.2");
        }

        // DRAW
        sub.to(strokePaths, {
          strokeDashoffset: 0,
          duration: 1.4,
          stagger: 0.04,
          ease: "power1.inOut",
        }, "-=0.3");

        // Labels
        if (labels.length) {
          sub.to(labels, { opacity: 1, duration: 0.4, stagger: 0.1 }, "-=0.8");
        }

        // Corners
        if (corners.length) {
          corners.forEach((c) => {
            try {
              const len = (c as SVGGeometryElement).getTotalLength();
              gsap.set(c, { strokeDasharray: len, strokeDashoffset: len });
            } catch { /* skip */ }
          });
          sub.to(corners, {
            strokeDashoffset: 0,
            duration: 0.5,
            stagger: 0.05,
          }, "-=1.0");
        }

        // RESOLVE
        sub.to(fillPaths, {
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: "power2.inOut",
        });
        sub.to(strokePaths, { opacity: 0, duration: 0.6 }, "<");
        if (annotations) {
          sub.to(annotations, { opacity: 0, duration: 0.5 }, "<0.1");
        }

        // HOLD
        sub.to({}, { duration: 2.0 });

        // EXIT
        sub.to(fillPaths, { opacity: 0, duration: 0.3 });
        sub.to(
          group,
          {
            x: -500,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
          },
          "<0.1"
        );

        master.add(sub);
      });

      timelineRef.current = master;
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [logos]);

  const canvasPad = 40;
  const canvasW = 500 + canvasPad * 2;
  const canvasH = 160;
  const bpColor = "#5A7FB5";

  return (
    <div
      ref={containerRef}
      className="relative aspect-[21/7] w-[calc(100%+var(--space-gutter))] md:w-full md:aspect-auto md:h-[68%] md:rounded-l-xl md:rounded-r-none rounded-none bg-[var(--video-bg)] flex items-center justify-center overflow-hidden cursor-none"
    >
      {logos.length > 0 && (
        <svg
          ref={svgRef}
          viewBox={`${-canvasPad} 0 ${canvasW} ${canvasH}`}
          className="w-[75%] h-auto relative"
          style={{ maxHeight: "60%", zIndex: 1 }}
        >
          {logos.map((logo, i) => {
            const contentW = canvasW - canvasPad * 2;
            const maxW = contentW * 0.48;
            const maxH = canvasH * 0.4;
            const scale = Math.min(maxW / logo.width, maxH / logo.height);
            const scaledW = logo.width * scale;
            const scaledH = logo.height * scale;
            const tx = (contentW - scaledW) / 2;
            const ty = (canvasH - scaledH) / 2;
            const pad = 12 / scale;

            return (
              <g
                key={logo.slug}
                className={`logo-group-${i}`}
                transform={`translate(${tx}, ${ty}) scale(${scale})`}
              >
                {/* Blueprint annotations */}
                <g className="annotations">
                  {/* Dimension lines */}
                  <line
                    className="dim-line"
                    x1={0} y1={logo.height + pad}
                    x2={logo.width} y2={logo.height + pad}
                    stroke={bpColor} strokeWidth={0.8 / scale} strokeDasharray="4 2"
                  />
                  <line
                    className="dim-line"
                    x1={-pad} y1={0}
                    x2={-pad} y2={logo.height}
                    stroke={bpColor} strokeWidth={0.8 / scale} strokeDasharray="4 2"
                  />
                  {/* H-dim end caps */}
                  <line className="dim-line"
                    x1={0} y1={logo.height + pad - 3/scale}
                    x2={0} y2={logo.height + pad + 3/scale}
                    stroke={bpColor} strokeWidth={0.6 / scale}
                  />
                  <line className="dim-line"
                    x1={logo.width} y1={logo.height + pad - 3/scale}
                    x2={logo.width} y2={logo.height + pad + 3/scale}
                    stroke={bpColor} strokeWidth={0.6 / scale}
                  />
                  {/* V-dim end caps */}
                  <line className="dim-line"
                    x1={-pad - 3/scale} y1={0}
                    x2={-pad + 3/scale} y2={0}
                    stroke={bpColor} strokeWidth={0.6 / scale}
                  />
                  <line className="dim-line"
                    x1={-pad - 3/scale} y1={logo.height}
                    x2={-pad + 3/scale} y2={logo.height}
                    stroke={bpColor} strokeWidth={0.6 / scale}
                  />
                  {/* Center crosshair */}
                  <line className="dim-line"
                    x1={logo.width * 0.4} y1={logo.height / 2}
                    x2={logo.width * 0.6} y2={logo.height / 2}
                    stroke={bpColor} strokeWidth={0.4 / scale} opacity={0.4}
                  />
                  <line className="dim-line"
                    x1={logo.width / 2} y1={logo.height * 0.35}
                    x2={logo.width / 2} y2={logo.height * 0.65}
                    stroke={bpColor} strokeWidth={0.4 / scale} opacity={0.4}
                  />
                  {/* Corner brackets */}
                  <path className="corner-bracket"
                    d={`M ${-4/scale},0 L 0,0 L 0,${-4/scale}`}
                    fill="none" stroke={bpColor} strokeWidth={0.6 / scale}
                  />
                  <path className="corner-bracket"
                    d={`M ${logo.width + 4/scale},0 L ${logo.width},0 L ${logo.width},${-4/scale}`}
                    fill="none" stroke={bpColor} strokeWidth={0.6 / scale}
                  />
                  <path className="corner-bracket"
                    d={`M ${-4/scale},${logo.height} L 0,${logo.height} L 0,${logo.height + 4/scale}`}
                    fill="none" stroke={bpColor} strokeWidth={0.6 / scale}
                  />
                  <path className="corner-bracket"
                    d={`M ${logo.width + 4/scale},${logo.height} L ${logo.width},${logo.height} L ${logo.width},${logo.height + 4/scale}`}
                    fill="none" stroke={bpColor} strokeWidth={0.6 / scale}
                  />
                  {/* Labels */}
                  <text className="bp-label"
                    x={logo.width / 2} y={logo.height + pad + 10/scale}
                    fill={bpColor} fontSize={8 / scale}
                    fontFamily="'JetBrains Mono', monospace"
                    textAnchor="middle" opacity={0}
                  >
                    W: {Math.round(logo.width)}
                  </text>
                  <text className="bp-label"
                    x={-pad - 8/scale} y={logo.height / 2}
                    fill={bpColor} fontSize={8 / scale}
                    fontFamily="'JetBrains Mono', monospace"
                    textAnchor="middle" opacity={0}
                    transform={`rotate(-90, ${-pad - 8/scale}, ${logo.height / 2})`}
                  >
                    H: {Math.round(logo.height)}
                  </text>
                  <text className="bp-label"
                    x={logo.width + 6/scale} y={-4/scale}
                    fill={bpColor} fontSize={6 / scale}
                    fontFamily="'JetBrains Mono', monospace"
                    opacity={0}
                  >
                    SCALE 1:1
                  </text>
                </g>

                {/* Stroke layer — blueprint */}
                {logo.paths.map((d, j) => (
                  <path key={`s-${j}`} className="stroke-path"
                    d={d} fill="none" stroke={bpColor} strokeWidth={0.8 / scale}
                  />
                ))}

                {/* Fill layer — resolved */}
                {logo.paths.map((d, j) => (
                  <path key={`f-${j}`} className="fill-path"
                    d={d} fill="rgba(255,255,255,0.9)"
                  />
                ))}
              </g>
            );
          })}
        </svg>
      )}
      <CursorTrail containerRef={containerRef} />
    </div>
  );
}
