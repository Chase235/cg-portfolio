"use client";

import { motion } from 'framer-motion'
import { FinleyFlame, TEAL, DARK_TEAL } from './FinleyMark'

// Variant 02: Pulse Ring
// Soft ring radiates outward from container at steady cadence
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
          border: `1.5px solid ${TEAL}`,
        }}
        animate={{
          scale: [1, 1.6],
          opacity: [0.4, 0],
        }}
        transition={{
          duration: 3.2,
          ease: 'easeOut',
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
          border: `1px solid ${TEAL}`,
        }}
        animate={{
          scale: [1, 1.6],
          opacity: [0.25, 0],
        }}
        transition={{
          duration: 3.2,
          ease: 'easeOut',
          repeat: Infinity,
          delay: 1.6,
        }}
      />

      {/* Static container */}
      <div
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
      >
        {/* Flame holds steady with very subtle pulse */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{
            duration: 3.2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <FinleyFlame size={14} color={DARK_TEAL} />
        </motion.div>
      </div>
    </div>
  )
}
