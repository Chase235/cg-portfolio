"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { HeroTitle } from "@/components/finley-thinking/HeroTitle";
import { FINLEY_WORDMARK_PATH } from "@/components/finley-thinking/HeroTitle";
import { ThinkingPulseRing } from "@/components/finley-thinking/ThinkingPulseRing";
import { ThinkingOrbital } from "@/components/finley-thinking/ThinkingOrbital";
import { ThinkingMorph } from "@/components/finley-thinking/ThinkingMorph";
import { ThinkingFlameOnly } from "@/components/finley-thinking/ThinkingFlameOnly";
import { ThinkingBadgeTier2 } from "@/components/finley-thinking/ThinkingBadgeTier2";
import { ThinkingBadgeScatter } from "@/components/finley-thinking/ThinkingBadgeScatter";
import { ThinkingBadgeTimer } from "@/components/finley-thinking/ThinkingBadgeTimer";
import { ComponentSpecimens } from "@/components/finley-thinking/ComponentSpecimens";

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
              autoComplete="off"
              data-1p-ignore
              data-lpignore="true"
              data-form-type="other"
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

function Chevrons() {
  return (
    <div className="ts-divider-chevron">
      <svg viewBox="0 0 18 10" fill="none"><path d="M1 1l8 7 8-7" stroke="#6B8F93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg viewBox="0 0 18 10" fill="none"><path d="M1 1l8 7 8-7" stroke="#6B8F93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );
}

function FinleyMark() {
  return (
    <svg width={160} height={57} viewBox="0 0 228 81" fill="none">
      <path d={FINLEY_WORDMARK_PATH} fill="#99FFDD" />
    </svg>
  );
}

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
        .ts-app { width: 100%; min-height: 100vh; background: var(--ts-bg); color: var(--ts-text); font-family: system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
        .ts-hero-section { width: 100%; min-height: 100vh; border-bottom: 1px solid var(--ts-border); position: relative; overflow: hidden; }
        .ts-hero-wordmark-svg { width: 228px; height: auto; position: absolute; top: 50%; left: 0; right: 0; margin: 0 auto; transform: translateY(-50%); }
        .ts-hero-lower { position: absolute; bottom: 15vh; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 48px; }
        .ts-hero-flame { display: flex; align-items: center; justify-content: center; }
        .ts-hero-ticker-mask { overflow: hidden; mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%); }
        .ts-hero-ticker-track { display: flex; white-space: nowrap; width: max-content; }
        .ts-hero-ticker-text { font-family: var(--ts-mono); font-size: 13px; color: var(--ts-text-dim); letter-spacing: 2px; }
        .ts-hero-ticker-separator { margin: 0 16px; opacity: 0.4; }
        .ts-context-section { width: 100%; padding: 80px 40px; display: flex; justify-content: center; border-bottom: 1px solid var(--ts-border); }
        .ts-context-text { font-family: var(--ts-mono); font-size: 13px; color: var(--ts-text-dim); line-height: 1.8; max-width: 600px; text-align: center; margin: 0; }
        .ts-divider-section { width: 100%; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 48px; border-bottom: 1px solid var(--ts-border); }
        .ts-divider-label { font-family: var(--ts-mono); font-size: 13px; color: var(--ts-text-dim); letter-spacing: 2px; }
        .ts-divider-desc { font-family: var(--ts-mono); font-size: 12px; color: var(--ts-text-dim); line-height: 1.7; max-width: 480px; text-align: center; margin: 0; opacity: 0.7; }
        .ts-divider-chevron { margin-top: 12px; display: flex; flex-direction: column; align-items: center; gap: 2px; opacity: 0.35; }
        .ts-divider-chevron svg { width: 18px; height: 10px; }
        .ts-variant-section { width: 100%; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 40px; border-bottom: 1px solid var(--ts-border); position: relative; }
        .ts-variant-header { display: flex; flex-direction: column; align-items: center; gap: 8px; max-width: 560px; margin-bottom: 80px; text-align: center; }
        .ts-variant-number { font-family: var(--ts-mono); font-size: 21px; color: var(--ts-text); letter-spacing: 3px; margin-bottom: 20px; }
        .ts-variant-header h2 { font-size: 28px; font-weight: 600; color: var(--ts-text); margin: 0 0 12px; letter-spacing: -0.5px; }
        .ts-variant-header p { font-size: 14px; line-height: 1.6; color: var(--ts-text-dim); margin: 0; }
        .ts-variant-stage { display: flex; align-items: center; justify-content: center; width: 100%; height: 120px; }
        .ts-variant-meta { display: flex; gap: 32px; margin-top: 80px; font-family: var(--ts-mono); font-size: 11px; color: var(--ts-text-dim); letter-spacing: 0.5px; }
        .ts-specimens-section { width: 100%; padding: 100px 40px; display: flex; flex-direction: column; align-items: center; border-bottom: 1px solid var(--ts-border); }
        .ts-specimens-title { font-size: 28px; font-weight: 600; color: var(--ts-text); letter-spacing: -0.5px; margin: 0 0 16px; }
        .ts-specimens-desc { font-family: var(--ts-mono); font-size: 13px; color: var(--ts-text-dim); text-align: center; max-width: 560px; line-height: 1.6; margin: 0 0 60px; }
        .specimens-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; width: 100%; max-width: 1100px; }
        .specimen-card { background: #0E1A1D; border-radius: 8px; padding: 24px; display: flex; flex-direction: column; gap: 16px; min-height: 140px; }
        .specimen-card-wide { grid-column: span 2; }
        .specimen-label { font-family: var(--ts-mono); font-size: 11px; color: var(--ts-teal); letter-spacing: 1px; }
        .ts-app-footer { padding: 60px 40px; text-align: center; font-family: var(--ts-mono); font-size: 12px; color: var(--ts-text-dim); letter-spacing: 1px; }
        @media (max-width: 768px) {
          .ts-hero-wordmark-svg { width: 180px; top: 28%; }
          .ts-hero-lower { bottom: 26vh; gap: 24px; }
          .ts-variant-meta { flex-direction: column; gap: 8px; align-items: center; }
          .specimens-grid { grid-template-columns: 1fr; }
          .specimen-card-wide { grid-column: span 1; }
        }
      `}</style>

      <div className="ts-app">
        <HeroTitle />

        <section className="ts-context-section">
          <p className="ts-context-text">Finley&apos;s thinking state is a three-tier system. Each tier corresponds to a range of inference latency, from instant responses to complex multi-step operations. The animations below are options for each tier. Below the three tiers is a component specimen library of small, composable add-ons that Finley can attach to any tier when the context calls for it.</p>
        </section>

        {/* TIER 1 */}
        <section className="ts-divider-section">
          <FinleyMark />
          <span className="ts-divider-label">Tier 1 ThinkingBadge; instant-3 seconds</span>
          <p className="ts-divider-desc">The fastest responses. Finley acknowledges the request and begins streaming immediately. The thinking state is a brief, ambient pulse on the flame mark itself. Four options for the Tier 1 indicator animation.</p>
          <Chevrons />
        </section>

        <section className="ts-variant-section">
          <div className="ts-variant-header"><span className="ts-variant-number">01</span><div><h2>Sonar</h2><p>Sonar ring pulses outward from the container. The flame holds center, grounding the motion. Quiet confidence, active processing.</p></div></div>
          <div className="ts-variant-stage"><ThinkingPulseRing /></div>
          <div className="ts-variant-meta"><span>Loop: 4s</span><span>Motion: ease-out radial</span><span>Ring opacity: 0.2 → 0</span></div>
        </section>

        <section className="ts-variant-section">
          <div className="ts-variant-header"><span className="ts-variant-number">02</span><div><h2>Orbit</h2><p>Luminous dot in steady orbit around the container. The surface responds with tidal deformation at each pass. Precision as personality.</p></div></div>
          <div className="ts-variant-stage"><ThinkingOrbital /></div>
          <div className="ts-variant-meta"><span>Loop: 6s</span><span>Motion: linear orbit + tidal deformation</span><span>Dot: 5px, mint glow</span></div>
        </section>

        <section className="ts-variant-section">
          <div className="ts-variant-header"><span className="ts-variant-number">03</span><div><h2>Iridescence</h2><p>The circle&apos;s border shimmers with a traveling gradient, like light catching the surface of a liquid. The flame breathes underneath. Feels alive, organic, premium.</p></div></div>
          <div className="ts-variant-stage"><ThinkingMorph /></div>
          <div className="ts-variant-meta"><span>Loop: 5s</span><span>Motion: conic-gradient rotation</span><span>Border: 2px traveling highlight</span></div>
        </section>

        <section className="ts-variant-section">
          <div className="ts-variant-header"><span className="ts-variant-number">04</span><div><h2>Ember</h2><p>The flame alone, uncontained. Not a loading state. A new presence. The gentle scale-breathe and pulse behind it communicate active cognition.</p></div></div>
          <div className="ts-variant-stage"><ThinkingFlameOnly /></div>
          <div className="ts-variant-meta"><span>Loop: 3.6s</span><span>Motion: scale + glow pulse</span><span>Glow: radial, 50% → 20% opacity</span></div>
        </section>

        {/* TIER 2 */}
        <section className="ts-divider-section">
          <FinleyMark />
          <span className="ts-divider-label">Tier 2 ThinkingBadge; 3-10 seconds</span>
          <p className="ts-divider-desc">Finley is working through a moderately complex task. The flame indicator pairs with a rotating task word that tells the user what Finley is doing. Two text animation options for the Tier 2 badge.</p>
          <Chevrons />
        </section>

        <section className="ts-variant-section">
          <div className="ts-variant-header"><span className="ts-variant-number">05</span><div><h2>Helix</h2><p>The inline thinking indicator for tier 2 extended inference time. The flame animation will be consistent with the tier one flame animation, while the task word cycles with a soft motion that indicates calm consideration.</p></div></div>
          <div className="ts-variant-stage"><ThinkingBadgeTier2 /></div>
          <div className="ts-variant-meta"><span>Loop: 5.2s per word</span><span>Motion: spring in / blur out</span><span>Ellipsis: pulsing hold</span></div>
        </section>

        <section className="ts-variant-section">
          <div className="ts-variant-header"><span className="ts-variant-number">06</span><div><h2>Scatter</h2><p>Characters push in from the left, hold with pulsing ellipsis, then disperse rightward, each letter scattering with its own trajectory and rotation.</p></div></div>
          <div className="ts-variant-stage"><ThinkingBadgeScatter /></div>
          <div className="ts-variant-meta"><span>Loop: 5.2s per word</span><span>In: push left-to-right</span><span>Out: scatter with random y/rotation</span></div>
        </section>

        {/* TIER 3 */}
        <section className="ts-divider-section">
          <FinleyMark />
          <span className="ts-divider-label">Tier 3 ThinkingBadge; 10+ seconds</span>
          <p className="ts-divider-desc">Complex, multi-step operations. Finley is orchestrating across entities, running projections, or composing structured analysis. The thinking state adds a live elapsed timer so the user has a sense of duration without anxiety.</p>
          <Chevrons />
        </section>

        <section className="ts-variant-section">
          <div className="ts-variant-header"><span className="ts-variant-number">07</span><div><h2>Mini-Timer</h2><p>The counter ticks in real time, giving the user a sense of duration without urgency. Formats from seconds to minutes automatically.</p></div></div>
          <div className="ts-variant-stage"><ThinkingBadgeTimer /></div>
          <div className="ts-variant-meta"><span>Loop: 5.2s per word</span><span>Timer: live elapsed, tabular nums</span><span>Format: 12.4s → 1m 22s</span></div>
        </section>

        {/* COMPONENT SPECIMENS */}
        <section className="ts-specimens-section">
          <h2 className="ts-specimens-title">Component Specimens</h2>
          <p className="ts-specimens-desc">These are atom components and can be added to any of the three thinking state tiers when Finley deems them applicable or pertinent. They are composable building blocks, not standalone states.</p>
          <ComponentSpecimens />
        </section>

        <footer className="ts-app-footer">
          <p>Finley Thinking State · R1 Exploration · finfuego-assembly-2026</p>
        </footer>
      </div>
    </>
  );
}
