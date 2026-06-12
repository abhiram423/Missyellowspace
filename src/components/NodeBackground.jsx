import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

const NODE_COUNT = 78
const LINK_DIST = 148
const SPEED = 0.2

export default function NodeBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    let animId = null

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    resize()

    const isDark = theme === 'dark'
    const NODE_RGB = isDark ? '255, 238, 185' : '140, 110, 55'
    const LINE_RGB = isDark ? '245, 197, 24' : '170, 130, 45'
    const LINE_MAX_ALPHA = isDark ? 0.22 : 0.13

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      r: Math.random() * 1.3 + 0.7,
      opacity: Math.random() * 0.45 + 0.3,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1

        // Outer glow halo
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${NODE_RGB}, ${n.opacity * 0.12})`
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${NODE_RGB}, ${n.opacity})`
        ctx.fill()
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * LINE_MAX_ALPHA
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${LINE_RGB}, ${alpha})`
            ctx.lineWidth = 0.55
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.5,
        willChange: 'transform',
      }}
    />
  )
}
