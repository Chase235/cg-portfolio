"use client";

import { motion } from 'framer-motion'
import { FinleyFlame, TEAL, DARK_TEAL, MINT } from './FinleyMark'

// Variant 03: Iridescence
// Circle border shimmers with traveling iridescent gradient. Flame breathes underneath.
export function ThinkingMorph() {
  return (
    <div style={{ position: 'relative', width: 48, height: 48 }}>
      {/* Rotating iridescent conic gradient ring */}
      <motion.div
        style={{
          position: 'absolute',
          top: -3,
          left: -3,
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            #99FFDDA0 40deg,
            #7EB9FE80 65deg,
            #C4A0FF50 85deg,
            #99FFDD40 105deg,
            transparent 150deg,
            transparent 360deg
          )`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 5,
          ease: 'linear',
          repeat: Infinity,
        }}
      />

      {/* Inner container */}
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
