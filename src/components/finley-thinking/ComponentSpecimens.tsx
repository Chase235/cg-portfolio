"use client";

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { FLAME_PATH, TEAL } from './FinleyMark'

const MINT = '#99FFDD'
const DIM = '#6B8F93'
const CARD_BG = '#0E1A1D'

// --- ThinkingTimer specimen ---
function TimerSpecimen() {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => setElapsed((Date.now() - start) / 1000), 100)
    return () => clearInterval(interval)
  }, [])

  const display = elapsed < 60
    ? `${elapsed.toFixed(1)}s`
    : `${Math.floor(elapsed / 60)}m ${Math.floor(elapsed % 60).toString().padStart(2, '0')}s`

  return (
    <div className="specimen-card">
      <span className="specimen-label">ThinkingTimer</span>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 22,
        color: MINT,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {display}
      </span>
    </div>
  )
}

// --- ThinkingShimmer specimen ---
function ShimmerSpecimen() {
  return (
    <div className="specimen-card">
      <span className="specimen-label">ThinkingShimmer</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[140, 100, 60].map((w, i) => (
          <motion.div
            key={i}
            style={{
              width: w,
              height: 10,
              borderRadius: 4,
              background: `linear-gradient(90deg, ${TEAL}30, ${TEAL}60, ${TEAL}30)`,
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 1.8, ease: 'linear', repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

// --- ThinkingStep specimen ---
function StepSpecimen() {
  const steps = [
    '→ Querying QB for Acme LLC Q2 actuals',
    '→ Comparing against cashflow model',
    '→ Identifying variance drivers',
  ]
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const lines = el.querySelectorAll('.step-line')
    gsap.fromTo(lines, { y: 12, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.4, stagger: 0.6,
      ease: 'back.out(1.2)',
    })

    const interval = setInterval(() => {
      gsap.fromTo(lines, { y: 12, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.4, stagger: 0.6,
        ease: 'back.out(1.2)',
      })
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="specimen-card">
      <span className="specimen-label">ThinkingStep</span>
      <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {steps.map((s, i) => (
          <span key={i} className="step-line" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: MINT,
            lineHeight: '20px',
            opacity: 0,
          }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

// --- ThinkingProgress specimen ---
function ProgressSpecimen() {
  const [filled, setFilled] = useState(0)
  const total = 8

  useEffect(() => {
    const interval = setInterval(() => {
      setFilled(prev => prev >= total ? 0 : prev + 1)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="specimen-card">
      <span className="specimen-label">ThinkingProgress</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {Array.from({ length: total }, (_, i) => (
            <motion.div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: i < filled ? MINT : `${DIM}40`,
              }}
              animate={{ background: i < filled ? MINT : `${DIM}40` }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: MINT,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {filled} of {total} entities
        </span>
      </div>
    </div>
  )
}

// --- ThinkingTimeline specimen ---
function TimelineSpecimen() {
  const [activeStep, setActiveStep] = useState(2)
  const steps = [
    { label: 'Retrieved financial data', time: '2.1s' },
    { label: 'Cross-referenced 3 entities', time: '4.8s' },
    { label: 'Generating cashflow projection', time: '8.2s' },
    { label: 'Composing response', time: '' },
    { label: 'Attaching provenance', time: '' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => prev >= steps.length - 1 ? 0 : prev + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="specimen-card specimen-card-wide">
      <span className="specimen-label">ThinkingTimeline</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {steps.map((step, i) => {
          const completed = i < activeStep
          const active = i === activeStep
          const pending = i > activeStep
          const icon = completed ? '✓' : active ? '●' : '○'
          const color = completed ? DIM : active ? MINT : `${DIM}60`

          return (
            <motion.div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color,
                lineHeight: '20px',
              }}
              animate={{ color }}
              transition={{ duration: 0.4 }}
            >
              <span>{icon} {step.label}{active ? '...' : ''}</span>
              {(completed || active) && step.time && (
                <span style={{ color: DIM, marginLeft: 16 }}>{step.time}</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// --- ThinkingPanel specimen ---
function PanelSpecimen() {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => setElapsed((Date.now() - start) / 1000), 100)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    'Querying QuickBooks for Acme LLC Q2 actuals',
    'Querying QuickBooks for Beacon Holdings Q2',
    'Cross-referencing against projected cashflow',
    'Identifying variance drivers',
    'Composing response...',
  ]
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const lines = el.querySelectorAll('.panel-step')
    gsap.fromTo(lines, { y: 10, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.35, stagger: 0.8, ease: 'back.out(1.2)',
    })
    const interval = setInterval(() => {
      gsap.fromTo(lines, { y: 10, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.35, stagger: 0.8, ease: 'back.out(1.2)',
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="specimen-card specimen-card-wide">
      <span className="specimen-label">ThinkingPanel (Chat)</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <motion.div
          style={{ width: 6, height: 6, borderRadius: '50%', background: TEAL }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: MINT }}>
          Analyzing cash flow across 3 entities...
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: DIM, fontVariantNumeric: 'tabular-nums' }}>
          {elapsed.toFixed(1)}s
        </span>
      </div>
      <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {steps.map((s, i) => (
          <span key={i} className="panel-step" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: DIM,
            lineHeight: '18px',
            opacity: 0,
          }}>
            → {s}
          </span>
        ))}
      </div>
    </div>
  )
}

// --- ThinkingOverlay specimen ---
function OverlaySpecimen() {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => setElapsed((Date.now() - start) / 1000), 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="specimen-card">
      <span className="specimen-label">ThinkingOverlay (Sidebar)</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#999' }}>
          Finley is working
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <motion.div
            style={{ width: 5, height: 5, borderRadius: '50%', background: TEAL }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: MINT }}>
            Analyzing cash flow...
          </span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: DIM, lineHeight: '16px', paddingLeft: 11 }}>
          3 entities, Q2 actuals<br />
          {elapsed.toFixed(1)}s elapsed
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: DIM, marginTop: 4 }}>
          Continue working →
        </span>
      </div>
    </div>
  )
}

// --- Main grid ---
export function ComponentSpecimens() {
  return (
    <div className="specimens-grid">
      <TimerSpecimen />
      <ShimmerSpecimen />
      <StepSpecimen />
      <ProgressSpecimen />
      <TimelineSpecimen />
      <PanelSpecimen />
      <OverlaySpecimen />
    </div>
  )
}
