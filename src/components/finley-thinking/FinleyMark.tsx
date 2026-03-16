"use client";

// Finley flame SVG path extracted from Figma
export const FLAME_PATH =
  'M 24.87 2.05 L 23.84 0 L 12.17 9.96 L 4.5 16.5 C -0.88 21.09 -1.53 29.18 3.04 34.58 L 10.96 43.93 C 12.94 46.27 13.31 49.58 11.89 52.29 L 6.84 61.96 L 7.87 63.99 L 7.87 64 L 25.29 49.14 L 27.21 47.5 C 32.59 42.91 33.24 34.82 28.67 29.42 L 20.75 20.07 C 18.77 17.74 18.4 14.43 19.82 11.71'

export const FLAME_VIEWBOX = '0 0 33 64'

// Brand colors
export const TEAL = '#3EC8B5'
export const DARK_TEAL = '#123237'
export const MINT = '#99FFDD'
export const BG = '#0E1F22'

export function FinleyFlame({
  size = 24,
  color = DARK_TEAL,
  className = '',
}: {
  size?: number
  color?: string
  className?: string
}) {
  const aspect = 64 / 33
  const w = size
  const h = size * aspect

  return (
    <svg
      width={w}
      height={h}
      viewBox={FLAME_VIEWBOX}
      fill="none"
      className={className}
    >
      <path d={FLAME_PATH} fill={color} />
    </svg>
  )
}
