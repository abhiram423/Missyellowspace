import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringWrapRef = useRef(null)
  const mouse = useRef({ x: -200, y: -200 })
  const ringPos = useRef({ x: -200, y: -200 })
  const rafRef = useRef(null)
  const hoveredRef = useRef(false)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Disable on mobile/touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true)
      return
    }

    const dot = dotRef.current
    const ring = ringWrapRef.current
    if (!dot || !ring) return

    const lerp = (a, b, t) => a + (b - a) * t

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (!visible) setVisible(true)
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
    }

    const onOver = (e) => {
      const isHover = !!e.target.closest('a, button, [data-cursor="hover"], input, textarea, select, label')
      if (isHover !== hoveredRef.current) {
        hoveredRef.current = isHover
        setHovered(isHover)
      }
    }

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.09)
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.09)
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      rafRef.current = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.body.classList.add('custom-cursor')
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.body.classList.remove('custom-cursor')
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8,
          background: 'var(--accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s',
          boxShadow: '0 0 8px var(--accent-glow)',
        }}
      />

      {/* Ring wrapper — position lerped via RAF */}
      <div
        ref={ringWrapRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40,
          pointerEvents: 'none',
          zIndex: 999998,
          willChange: 'transform',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      >
        {/* Inner ring — scale transitions via CSS */}
        <div
          style={{
            width: '100%', height: '100%',
            border: `1.5px solid ${hovered ? 'var(--accent)' : 'rgba(245,197,24,0.4)'}`,
            borderRadius: '50%',
            transform: hovered ? 'scale(1.6)' : 'scale(1)',
            background: hovered ? 'rgba(245,197,24,0.06)' : 'transparent',
            transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, background 0.25s',
            transformOrigin: 'center',
          }}
        />
      </div>
    </>
  )
}
