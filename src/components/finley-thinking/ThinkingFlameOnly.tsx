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
          scale: [1, 1.5, 1],
          opacity: [0.6, 0.25, 0.6],
        }}
        transition={{
          duration: 3.6,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${TEAL}A0 0%, ${TEAL}50 35%, ${TEAL}18 60%, transparent 80%)`,
          }}
        />
      </motion.div>

      {/* Outer glow pulse — slower, wider halo */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.08, 0.2],
        }}
        transition={{
          duration: 5,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${TEAL}40 0%, ${TEAL}15 50%, transparent 75%)`,
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
          scale: [1, 1.14, 1, 0.88, 1],
          y: [0, -2, 0, 1.5, 0],
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
