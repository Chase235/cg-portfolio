"use client";

import { motion } from 'framer-motion'
import { FinleyFlame, TEAL, DARK_TEAL, MINT } from './FinleyMark'

// Variant 04: Surface Tension
// Circle border shimmers with traveling gradient. Flame breathes underneath.
export function ThinkingMorph() {
  return (
    <div style={{ position: 'relative', width: 48, height: 48 }}>
      {/* Rotating conic gradient ring */}
      <motion.div
        style={{
          position: 'absolute',
          top: -3,
          left: -3,
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: `conic-gradient(from 0deg, transparent 0deg, ${MINT}90 50deg, ${MINT}40 90deg, transparent 140deg, transparent 360deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 5,
          ease: 'linear',
          repeat: Infinity,
        }}
      />

      {/* Inner container (masks the gradient ring to just a border) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: TEAL,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Flame breathes */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1, 0.95, 1],
          }}
          transition={{
            duration: 4,
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
