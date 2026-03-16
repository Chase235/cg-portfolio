"use client";

import { motion } from 'framer-motion'
import { FinleyFlame, TEAL, DARK_TEAL } from './FinleyMark'

// Variant 01: Sonar
// Soft rings radiate outward from container — slower, smoother, more fluid
export function ThinkingPulseRing() {
  return (
    <div style={{ position: 'relative', width: 48, height: 48 }}>
      {/* Pulse ring 1 */}
      <motion.div
        style={{
          position: 'absolute',
          top: -4,
          left: -4,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: `1px solid ${TEAL}`,
        }}
        animate={{
          scale: [1, 1.6],
          opacity: [0.2, 0],
        }}
        transition={{
          duration: 4,
          ease: [0.25, 0.1, 0.25, 1],
          repeat: Infinity,
        }}
      />

      {/* Pulse ring 2 — staggered */}
      <motion.div
        style={{
          position: 'absolute',
          top: -4,
          left: -4,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: `0.75px solid ${TEAL}`,
        }}
        animate={{
          scale: [1, 1.6],
          opacity: [0.15, 0],
        }}
        transition={{
          duration: 4,
          ease: [0.25, 0.1, 0.25, 1],
          repeat: Infinity,
          delay: 2,
        }}
      />

      {/* Pulse ring 3 — third wave for continuous flow */}
      <motion.div
        style={{
          position: 'absolute',
          top: -4,
          left: -4,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: `0.5px solid ${TEAL}`,
        }}
        animate={{
          scale: [1, 1.6],
          opacity: [0.1, 0],
        }}
        transition={{
          duration: 4,
          ease: [0.25, 0.1, 0.25, 1],
          repeat: Infinity,
          delay: 3,
        }}
      />

      {/* Container with shockwave bump synced to ring emission */}
      <motion.div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: TEAL,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        animate={{
          scale: [1, 1.08, 1, 1, 1, 1, 1, 1.08, 1, 1, 1, 1, 1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          ease: 'easeOut',
          repeat: Infinity,
          times: [0, 0.015, 0.05, 0.25, 0.33, 0.49, 0.5, 0.515, 0.55, 0.74, 0.75, 0.765, 0.8, 0.83, 0.87],
        }}
      >
        <FinleyFlame size={14} color={DARK_TEAL} />
      </motion.div>
    </div>
  )
}
