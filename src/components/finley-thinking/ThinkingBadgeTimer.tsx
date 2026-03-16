"use client";

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { FLAME_PATH, TEAL, DARK_TEAL, MINT as MINT_COLOR } from './FinleyMark'

// ThinkingBadge Tier 3 — Same as Helix (option 05) + live elapsed timer

const WORDS = [
  'Working',
  'Processing',
  'Analyzing',
  'Reasoning',
  'Evaluating',
  'Synthesizing',
  'Resolving',
]

const MINT = '#99FFDD'
const DIM = '#6B8F93'
const HOLD_DURATION = 5200

function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`
  }
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}m ${secs.toString().padStart(2, '0')}s`
}

export function ThinkingBadgeTimer() {
  const [wordIndex, setWordIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const wordRef = useRef<HTMLSpanElement>(null)
  const ellipsisRef = useRef<HTMLSpanElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const startTimeRef = useRef(Date.now())

  // Elapsed timer
  useEffect(() => {
    startTimeRef.current = Date.now()
    const interval = setInterval(() => {
      setElapsed((Date.now() - startTimeRef.current) / 1000)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const animateIn = useCallback(() => {
    const el = wordRef.current
    if (!el) return

    const text = WORDS[wordIndex]
    el.innerHTML = text
      .split('')
      .map((char) => `<span class="tb-char" style="display:inline-block;opacity:0">${char}</span>`)
      .join('')

    const chars = el.querySelectorAll('.tb-char')

    gsap.fromTo(
      chars,
      { y: 18, opacity: 0, rotateX: -40 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.45,
        stagger: 0.035,
        ease: 'back.out(1.4)',
      }
    )

    if (ellipsisRef.current) {
      gsap.fromTo(
        ellipsisRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, delay: text.length * 0.035 + 0.3 }
      )
    }

    timeoutRef.current = setTimeout(() => {
      animateOut()
    }, HOLD_DURATION)
  }, [wordIndex])

  const animateOut = useCallback(() => {
    const el = wordRef.current
    if (!el) return

    const chars = el.querySelectorAll('.tb-char')

    if (ellipsisRef.current) {
      gsap.to(ellipsisRef.current, { opacity: 0, duration: 0.2 })
    }

    gsap.to(chars, {
      y: -14,
      opacity: 0,
      rotateX: 30,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        setWordIndex((prev) => (prev + 1) % WORDS.length)
      },
    })
  }, [])

  useEffect(() => {
    animateIn()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [animateIn])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        height: 72,
      }}
    >
      {/* Orbital indicator — scaled up, centered with text block */}
      <div
        style={{
          position: 'relative',
          width: 48,
          height: 48,
          flexShrink: 0,
          alignSelf: 'center',
        }}
      >
        {/* Orbiting dot */}
        <motion.div
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: MINT_COLOR,
            boxShadow: `0 0 6px 1px ${MINT_COLOR}40`,
            top: 24 - 2,
            left: 24 - 2,
            zIndex: 2,
          }}
          animate={{
            x: Array.from({ length: 61 }, (_, i) =>
              Math.cos((i / 60) * Math.PI * 2) * 30
            ),
            y: Array.from({ length: 61 }, (_, i) =>
              Math.sin((i / 60) * Math.PI * 2) * 30
            ),
          }}
          transition={{
            duration: 6,
            ease: 'linear',
            repeat: Infinity,
          }}
        />

        {/* Container with tidal response */}
        <motion.div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: TEAL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animate={{
            scaleX: [1, 1.025, 1, 0.975, 1],
            scaleY: [1, 0.975, 1, 1.025, 1],
          }}
          transition={{
            duration: 6,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <motion.svg
            width={14}
            height={28}
            viewBox="0 0 33 64"
            fill="none"
            animate={{ scale: [1, 1.03, 1, 0.97, 1] }}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          >
            <path d={FLAME_PATH} fill={DARK_TEAL} />
          </motion.svg>
        </motion.div>
      </div>

      {/* Animated word + ellipsis + timer stacked */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          height: 24,
          overflow: 'hidden',
          minWidth: 180,
          perspective: 400,
        }}
      >
        <span
          ref={wordRef}
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 15,
            color: MINT,
            letterSpacing: '0.5px',
            lineHeight: '24px',
            whiteSpace: 'nowrap',
          }}
        />
        <span
          ref={ellipsisRef}
          style={{
            display: 'inline-flex',
            width: 24,
            marginLeft: 1,
            opacity: 0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 15,
                color: MINT,
                lineHeight: '24px',
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 1.4,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: i * 0.28,
              }}
            >
              .
            </motion.span>
          ))}
        </span>
      </div>

      {/* Elapsed timer */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          color: DIM,
          letterSpacing: '0.5px',
          lineHeight: '16px',
          whiteSpace: 'nowrap',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formatTime(elapsed)}
      </span>
      </div>
    </div>
  )
}
