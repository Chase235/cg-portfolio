"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { HeroTitle } from "@/components/finley-thinking/HeroTitle";
import { ThinkingPulseRing } from "@/components/finley-thinking/ThinkingPulseRing";
import { ThinkingOrbital } from "@/components/finley-thinking/ThinkingOrbital";
import { ThinkingMorph } from "@/components/finley-thinking/ThinkingMorph";
import { ThinkingFlameOnly } from "@/components/finley-thinking/ThinkingFlameOnly";

// Inline password modal adapted from the portfolio's PasswordModal pattern
function EmberGate({
  onAuthenticated,
}: {
  onAuthenticated: () => void;
}) {
  const [passcode, setPasscode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === "ember") {
      onAuthenticated();
    } else {
      if (formRef.current) {
        gsap.to(formRef.current, {
          keyframes: [
            { x: -8, duration: 0.06 },
            { x: 8, duration: 0.06 },
            { x: -6, duration: 0.05 },
            { x: 6, duration: 0.05 },
            { x: 0, duration: 0.04 },
          ],
          ease: "power1.inOut",
        });
      }
      setPasscode("");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0E1F22",
      }}
    >
      <div
        ref={formRef}
        style={{
          width: "100%",
          maxWidth: 380,
          margin: "0 16px",
          background: "#0A161A",
          border: "1px solid #1E3338",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: "1px solid #1E3338",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#3EC8B5",
            }}
          />
          <span
            style={{
              marginLeft: 12,
              fontFamily: "monospace",
              fontSize: 11,
              color: "#6B8F93",
            }}
          >
            authenticate
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            minHeight: 200,
          }}
        >
          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "monospace",
                fontSize: 12,
                color: "#6B8F93",
                marginBottom: 6,
              }}
            >
              <span style={{ color: "#3EC8B5" }}>$</span>passcode
            </label>
            <input
              ref={inputRef}
              type="password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="enter passcode"
              autoFocus
              style={{
                width: "100%",
                background: "#071012",
                border: "1px solid #1E3338",
                borderRadius: 4,
                padding: "10px 12px",
                fontFamily: "monospace",
                fontSize: 14,
                color: "#F2F2F2",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ flex: 1 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: 8,
            }}
          >
            <button
              type="submit"
              style={{
                padding: "8px 20px",
                fontFamily: "monospace",
                fontSize: 12,
                fontWeight: 500,
                background: "#3EC8B5",
                color: "#0E1F22",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Variant section data
const variants = [
  {
    num: "01",
    title: "Pulse Ring",
    desc: "Sonar ring pulses outward from the container. The flame holds center, grounding the motion. Quiet confidence, active processing.",
    meta: ["Loop: 3.2s", "Motion: ease-out radial", "Ring opacity: 0.4 → 0"],
    Component: ThinkingPulseRing,
  },
  {
    num: "02",
    title: "Orbit",
    desc: "Luminous dot in steady orbit around the container. The surface responds with tidal deformation at each pass. Precision as personality.",
    meta: ["Loop: 6s", "Motion: linear orbit + ease-in-out deformation", "Dot: 5px, mint glow"],
    Component: ThinkingOrbital,
  },
  {
    num: "03",
    title: "Surface Tension",
    desc: "The circle's border shimmers with a traveling gradient — like light catching the surface of a liquid. The flame breathes underneath. Feels alive, organic, premium.",
    meta: ["Loop: 5s", "Motion: conic-gradient rotation", "Border: 2px traveling highlight"],
    Component: ThinkingMorph,
  },
  {
    num: "04",
    title: "Flame Ember",
    desc: "The flame alone, uncontained. Not a loading state. A new presence. The gentle scale-breathe and pulse behind it communicate active cognition.",
    meta: ["Loop: 3.6s", "Motion: scale + glow pulse", "Glow: radial, 30% → 12% opacity"],
    Component: ThinkingFlameOnly,
  },
];

export default function FinleyThinkingStatePage() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <EmberGate onAuthenticated={() => setAuthenticated(true)} />;
  }

  return (
    <>
      <style>{`
        :root {
          --ts-bg: #0E1F22;
          --ts-bg-card: #123237;
          --ts-teal: #3EC8B5;
          --ts-mint: #99FFDD;
          --ts-text: #F2F2F2;
          --ts-text-dim: #6B8F93;
          --ts-border: #284B50;
          --ts-mono: 'JetBrains Mono', ui-monospace, monospace;
        }

        .ts-app {
          width: 100%;
          min-height: 100vh;
          background: var(--ts-bg);
          color: var(--ts-text);
          font-family: system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .ts-hero-section {
          width: 100%;
          min-height: 100vh;
          border-bottom: 1px solid var(--ts-border);
          position: relative;
          overflow: hidden;
        }

        .ts-hero-wordmark-svg {
          width: 228px;
          height: auto;
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          margin: 0 auto;
          transform: translateY(-50%);
        }

        .ts-hero-lower {
          position: absolute;
          bottom: 15vh;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 48px;
        }

        .ts-hero-flame {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ts-hero-ticker-mask {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        }

        .ts-hero-ticker-track {
          display: flex;
          white-space: nowrap;
          width: max-content;
        }

        .ts-hero-ticker-text {
          font-family: var(--ts-mono);
          font-size: 13px;
          color: var(--ts-text-dim);
          letter-spacing: 2px;
        }

        .ts-hero-ticker-separator {
          margin: 0 16px;
          opacity: 0.4;
        }

        .ts-variant-section {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 40px;
          border-bottom: 1px solid var(--ts-border);
          position: relative;
        }

        .ts-variant-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          max-width: 560px;
          margin-bottom: 80px;
          text-align: center;
        }

        .ts-variant-number {
          font-family: var(--ts-mono);
          font-size: 21px;
          color: var(--ts-text);
          letter-spacing: 3px;
          margin-bottom: 20px;
        }

        .ts-variant-header h2 {
          font-size: 28px;
          font-weight: 600;
          color: var(--ts-text);
          margin: 0 0 12px;
          letter-spacing: -0.5px;
        }

        .ts-variant-header p {
          font-size: 14px;
          line-height: 1.6;
          color: var(--ts-text-dim);
          margin: 0;
        }

        .ts-variant-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 120px;
        }

        .ts-variant-meta {
          display: flex;
          gap: 32px;
          margin-top: 80px;
          font-family: var(--ts-mono);
          font-size: 11px;
          color: var(--ts-text-dim);
          letter-spacing: 0.5px;
        }

        .ts-app-footer {
          padding: 60px 40px;
          text-align: center;
          font-family: var(--ts-mono);
          font-size: 12px;
          color: var(--ts-text-dim);
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .ts-hero-wordmark-svg { width: 180px; }
          .ts-hero-lower { bottom: 12vh; gap: 24px; }
          .ts-variant-meta { flex-direction: column; gap: 8px; align-items: center; }
        }
      `}</style>

      <div className="ts-app">
        <HeroTitle />

        {variants.map((v) => (
          <section key={v.num} className="ts-variant-section">
            <div className="ts-variant-header">
              <span className="ts-variant-number">{v.num}</span>
              <div>
                <h2>{v.title}</h2>
                <p>{v.desc}</p>
              </div>
            </div>
            <div className="ts-variant-stage">
              <v.Component />
            </div>
            <div className="ts-variant-meta">
              {v.meta.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          </section>
        ))}

        <footer className="ts-app-footer">
          <p>Finley Thinking State · R1 Exploration · finfuego-assembly-2026</p>
        </footer>
      </div>
    </>
  );
}
