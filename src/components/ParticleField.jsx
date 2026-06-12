import { useEffect, useRef } from 'react'

export default function ParticleField({ count = 70, className, style }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = 0, H = 0, animId

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const mouse = { x: W / 2, y: H / 2 }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.6,
      baseOpacity: Math.random() * 0.55 + 0.25,
      opacity: 0,
    }))

    const ACCENT = '255, 245, 220'
    const LINK_DIST = 120
    const REPEL_DIST = 90
    let angle = 0

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const cx = W * 0.5
      const cy = H * 0.5
      const rot = 0.0009
      const cos = Math.cos(rot)
      const sin = Math.sin(rot)
      angle += rot

      particles.forEach(p => {
        const dx = p.x - cx
        const dy = p.y - cy
        p.x = cx + dx * cos - dy * sin
        p.y = cy + dx * sin + dy * cos
        // Mouse repulsion
        const distX = p.x - mouse.x
        const distY = p.y - mouse.y
        const dist = Math.hypot(distX, distY)
        if (dist < REPEL_DIST) {
          const force = ((REPEL_DIST - dist) / REPEL_DIST) * 1.5
          p.vx += (distX / dist) * force * 0.06
          p.vy += (distY / dist) * force * 0.06
        }

        // Velocity decay
        p.vx *= 0.98
        p.vy *= 0.98

        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10
        if (p.y > H + 10) p.y = -10

        // Fade in
        p.opacity = Math.min(p.opacity + 0.005, p.baseOpacity)

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT}, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.12
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    canvas.addEventListener('mousemove', onMouseMove, { passive: true })
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas.parentElement || canvas)
    draw()

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      resizeObserver.disconnect()
      cancelAnimationFrame(animId)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        ...style,
      }}
    />
  )
}
