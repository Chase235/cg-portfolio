"use client";

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { FinleyFlame, TEAL, DARK_TEAL, MINT } from './FinleyMark'

// Variant 03: Orbital
// Luminous dot orbits with physics — accelerates over poles, decelerates at equator.
// Comet tail of decaying binary dust trails behind.

function buildOrbitKeyframes(steps: number, radius: number) {
  const angles: number[] = []
  for (let i = 0; i < steps; i++) {
    const t = i / steps
    const warpedT = t + 0.06 * Math.sin(t * Math.PI * 4)
    angles.push(warpedT * Math.PI * 2)
  }
  angles.push(Math.PI * 2)

  const x = angles.map((a) => Math.cos(a) * radius)
  const y = angles.map((a) => Math.sin(a) * radius)
  const times = angles.map((_, i) => i / (angles.length - 1))

  return { x, y, times, angles }
}

// Generate binary dust particles for the comet tail
function useTailParticles(count: number) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      char: Math.random() > 0.5 ? '0' : '1',
      // How far behind the head this particle trails (0 = at head, 1 = far behind)
      trailOffset: (i + 1) / count,
      // Slight perpendicular scatter from the orbit path
      scatter: (Math.random() - 0.5) * 5,
      scatterY: (Math.random() - 0.5) * 5,
      // Smaller particles, denser tail
      size: 2.5 - (i / count) * 1.5,
    }))
  }, [count])
}

export function ThinkingOrbital() {
  const containerSize = 48
  const orbitRadius = containerSize / 2 + 6
  const steps = 120
  const tailParticleCount = 36

  const { x, y, times, angles } = buildOrbitKeyframes(steps, orbitRadius)
  const tailParticles = useTailParticles(tailParticleCount)

  // Build keyframes for each tail particle — same orbit but delayed
  const tailKeyframes = useMemo(() => {
    return tailParticles.map((particle) => {
      // Offset the angles backwards along the orbit
      const angleOffset = particle.trailOffset * 0.75 // Trail spans ~43° of arc
      const px = angles.map(
        (a) =>
          Math.cos(a - angleOffset) * orbitRadius + particle.scatter
      )
      const py = angles.map(
        (a) =>
          Math.sin(a - angleOffset) * orbitRadius + particle.scatterY
      )
      return { x: px, y: py }
    })
  }, [angles, orbitRadius, tailParticles])

  return (
    <div
      style={{
        position: 'relative',
        width: containerSize,
        height: containerSize,
      }}
    >
      {/* Comet tail — binary dust particles trailing behind the dot */}
      {tailParticles.map((particle, i) => (
        <motion.span
          key={particle.id}
          style={{
            position: 'absolute',
            fontSize: particle.size,
            fontFamily: 'JetBrains Mono, monospace',
            color: MINT,
            top: containerSize / 2 - particle.size / 2,
            left: containerSize / 2 - particle.size / 2,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
          animate={{
            x: tailKeyframes[i].x,
            y: tailKeyframes[i].y,
            opacity: [
              // Slower decay — tail particles stay visible longer
              0.78 * (1 - particle.trailOffset * 0.6),
              0.78 * (1 - particle.trailOffset * 0.6),
            ],
          }}
          transition={{
            duration: 6,
            ease: 'linear',
            times,
            repeat: Infinity,
          }}
        >
          {particle.char}
        </motion.span>
      ))}

      {/* Orbiting dot (comet head) */}
      <motion.div
        style={{
          position: 'absolute',
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: MINT,
          boxShadow: `0 0 12px 4px ${MINT}60, 0 0 24px 8px ${MINT}25`,
          top: containerSize / 2 - 2.5,
          left: containerSize / 2 - 2.5,
          zIndex: 2,
        }}
        animate={{ x, y }}
        transition={{
          duration: 6,
          ease: 'linear',
          times,
          repeat: Infinity,
        }}
      />

      {/* Container with tidal response */}
      <motion.div
        style={{
          width: containerSize,
          height: containerSize,
          borderRadius: '50%',
          backgroundColor: TEAL,
          boxShadow: `0 0 16px 4px ${TEAL}50, 0 0 32px 8px ${TEAL}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
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
        <motion.div
          animate={{ scale: [1, 1.03, 1, 0.97, 1] }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <FinleyFlame size={14} color={DARK_TEAL} />
        </motion.div>
      </motion.div>
    </div>
  )
}
