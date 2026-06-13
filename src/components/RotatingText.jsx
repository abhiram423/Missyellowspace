import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const ROTATING_PHRASES = [
  'Graphic Designing',
  'Digital Marketing',
  'Social Media Marketing',
  'Branding & Animations',
  'Performance Marketing',
  'SEO & Growth',
]

export default function RotatingText({ phrases = ROTATING_PHRASES, interval = 2600 }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % phrases.length), interval)
    return () => clearInterval(t)
  }, [phrases.length, interval])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={idx}
        style={{
          display: 'inline-block',
          color: '#FFD700',
          fontWeight: 900,
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {phrases[idx]}
      </motion.span>
    </AnimatePresence>
  )
}
