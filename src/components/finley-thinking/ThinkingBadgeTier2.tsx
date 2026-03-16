"use client";

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { FLAME_PATH, TEAL } from './FinleyMark'

// ThinkingBadge Tier 2 — Flame ember + GSAP character-split word animation
// Characters animate in staggered (y + opacity), hold with pulsing ellipsis, then out

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
const HOLD_DURATION = 5200 // ms to hold each word (longer hold)

export function ThinkingBadgeTier2() {
  const [wordIndex, setWordIndex] = useState(0)
  const wordRef = useRef<HTMLSpanElement>(null)
  const ellipsisRef = useRef<HTMLSpanElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const animateIn = useCallback(() => {
    const el = wordRef.current
    if (!el) return

    // Split text into character spans
    const text = WORDS[wordIndex]
    el.innerHTML = text
      .split('')
      .map((char) => `<span class="tb-char" style="display:inline-block;opacity:0">${char}</span>`)
      .join('')

    const chars = el.querySelectorAll('.tb-char')

    // Animate characters in — staggered y + opacity, like the GSAP SplitText demo
    gsap.fromTo(
      chars,
      {
        y: 18,
        opacity: 0,
        rotateX: -40,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.45,
        stagger: 0.035,
        ease: 'back.out(1.4)',
      }
    )

    // Fade in ellipsis after characters land
    if (ellipsisRef.current) {
      gsap.fromTo(
        ellipsisRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, delay: text.length * 0.035 + 0.3 }
      )
    }

    // Schedule exit animation
    timeoutRef.current = setTimeout(() => {
      animateOut()
    }, HOLD_DURATION)
  }, [wordIndex])

  const animateOut = useCallback(() => {
    const el = wordRef.current
    if (!el) return

    const chars = el.querySelectorAll('.tb-char')

    // Fade out ellipsis first
    if (ellipsisRef.current) {
      gsap.to(ellipsisRef.current, { opacity: 0, duration: 0.2 })
    }

    // Animate characters out — stagger upward + fade
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
        gap: 14,
        height: 48,
      }}
    >
      {/* Flame ember */}
      <div
        style={{
          position: 'relative',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {/* Glow */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 3.6,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${TEAL}80 0%, ${TEAL}30 40%, transparent 70%)`,
            }}
          />
        </motion.div>

        {/* Flame */}
        <motion.svg
          width={11}
          height={22}
          viewBox="0 0 33 64"
          fill="none"
          style={{ position: 'relative', zIndex: 1 }}
          animate={{
            scale: [1, 1.08, 1, 0.92, 1],
            y: [0, -0.5, 0, 0.5, 0],
          }}
          transition={{
            duration: 3.6,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <path d={FLAME_PATH} fill={TEAL} />
        </motion.svg>
      </div>

      {/* Animated word + ellipsis */}
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
        {/* Pulsing ellipsis during hold */}
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
    </div>
  )
}
