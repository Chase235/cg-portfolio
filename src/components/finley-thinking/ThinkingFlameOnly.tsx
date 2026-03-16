"use client";

import { motion } from 'framer-motion'
import { FLAME_PATH, TEAL } from './FinleyMark'

// Variant 05: Flame Ember
// Flame alone, no container. Gentle breathe + soft glow pulse directly behind.
export function ThinkingFlameOnly() {
  return (
    <div
      style={{
        position: 'relative',
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Glow centered directly behind flame */}
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
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${TEAL}80 0%, ${TEAL}30 40%, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Flame breathes */}
      <motion.svg
        width={16}
        height={31}
        viewBox="0 0 33 64"
        fill="none"
        style={{ position: 'relative', zIndex: 1 }}
        animate={{
          scale: [1, 1.08, 1, 0.92, 1],
          y: [0, -1, 0, 1, 0],
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
  )
}
