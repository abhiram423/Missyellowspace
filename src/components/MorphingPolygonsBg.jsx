import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────
   Morphing Polygon Mesh Background
   • Grid of vertices that undulate with multi-phase sine waves
   • Edges drawn between adjacent grid cells (polygon mesh)
   • Particle plexus overlay (free-floating nodes + connections)
   • 7 strategic golden pulsating particles for depth
   ───────────────────────────────────────────── */

const COLS = 18
const ROWS = 11
const PLEXUS_COUNT = 55
const PLEXUS_LINK_DIST = 130
const PLEXUS_SPEED = 0.18

// Pre-built vertex phase offsets for unique movement per vertex
function buildVertexPhases(cols, rows) {
  const phases = []
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      phases.push({
        ax: Math.random() * 18 + 8,   // x amplitude px
        ay: Math.random() * 20 + 10,  // y amplitude px
        fx: Math.random() * 0.4 + 0.15, // x freq multiplier
        fy: Math.random() * 0.35 + 0.12,
        px: Math.random() * Math.PI * 2,
        py: Math.random() * Math.PI * 2,
        fx2: Math.random() * 0.25 + 0.08,
        fy2: Math.random() * 0.22 + 0.06,
        px2: Math.random() * Math.PI * 2,
        py2: Math.random() * Math.PI * 2,
      })
    }
  }
  return phases
}

// Golden pulsating particles — strategic positions (relative to viewport)
const GOLDEN_PARTICLES = [
  { rx: 0.28, ry: 0.72, baseR: 2.8, pulseAmp: 1.6, pulseSpeed: 1.1, phase: 0 },
  { rx: 0.72, ry: 0.68, baseR: 2.2, pulseAmp: 1.2, pulseSpeed: 0.9, phase: 1.4 },
  { rx: 0.18, ry: 0.55, baseR: 1.8, pulseAmp: 1.0, pulseSpeed: 1.3, phase: 2.7 },
  { rx: 0.58, ry: 0.82, baseR: 3.0, pulseAmp: 1.8, pulseSpeed: 0.8, phase: 0.7 },
  { rx: 0.82, ry: 0.38, baseR: 2.0, pulseAmp: 1.3, pulseSpeed: 1.5, phase: 3.5 },
  { rx: 0.42, ry: 0.60, baseR: 2.4, pulseAmp: 1.4, pulseSpeed: 1.0, phase: 1.9 },
  { rx: 0.65, ry: 0.45, baseR: 1.6, pulseAmp: 1.1, pulseSpeed: 1.2, phase: 4.2 },
]

export default function MorphingPolygonsBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })

    let W = 0, H = 0
    let animId = null
    const phases = buildVertexPhases(COLS, ROWS)

    // Build plexus particles
    const plexus = Array.from({ length: PLEXUS_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * PLEXUS_SPEED * 0.01,
      vy: (Math.random() - 0.5) * PLEXUS_SPEED * 0.01,
      r: Math.random() * 1.2 + 0.5,
      op: Math.random() * 0.3 + 0.12,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas.parentElement || canvas)
    resize()

    const draw = () => {
      const t = performance.now() * 0.001
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#0a0d18'
      ctx.fillRect(0, 0, W, H)

      // ── 1. Morphing polygon mesh ──────────────────────────────
      const vx = new Float32Array((COLS + 1) * (ROWS + 1))
      const vy = new Float32Array((COLS + 1) * (ROWS + 1))

      const cellW = W / COLS
      const cellH = H / ROWS

      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const idx = r * (COLS + 1) + c
          const p = phases[idx]
          const bx = c * cellW
          const by = r * cellH
          vx[idx] = bx + p.ax * Math.sin(t * p.fx + p.px) + p.ax * 0.5 * Math.cos(t * p.fx2 + p.px2)
          vy[idx] = by + p.ay * Math.cos(t * p.fy + p.py) + p.ay * 0.4 * Math.sin(t * p.fy2 + p.py2)
        }
      }

      // Draw mesh edges
      ctx.lineWidth = 0.7
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const tl = r * (COLS + 1) + c
          const tr = tl + 1
          const bl = tl + (COLS + 1)
          const br = bl + 1

          // Quad face fill (very subtle)
          const edgeDist = Math.min(
            Math.min(c / COLS, 1 - c / COLS),
            Math.min(r / ROWS, 1 - r / ROWS)
          )
          const faceAlpha = 0.024 + edgeDist * 0.032

          ctx.beginPath()
          ctx.moveTo(vx[tl], vy[tl])
          ctx.lineTo(vx[tr], vy[tr])
          ctx.lineTo(vx[br], vy[br])
          ctx.lineTo(vx[bl], vy[bl])
          ctx.closePath()
          ctx.fillStyle = `rgba(255,230,180,${faceAlpha})`
          ctx.fill()

          // Edges — horizontal top
          const alpha = 0.13 + edgeDist * 0.16
          ctx.beginPath()
          ctx.moveTo(vx[tl], vy[tl])
          ctx.lineTo(vx[tr], vy[tr])
          ctx.strokeStyle = `rgba(255,215,0,${alpha})`
          ctx.stroke()

          // Vertical left
          ctx.beginPath()
          ctx.moveTo(vx[tl], vy[tl])
          ctx.lineTo(vx[bl], vy[bl])
          ctx.stroke()

          // Diagonal (every other cell for variety)
          if ((r + c) % 2 === 0) {
            ctx.beginPath()
            ctx.moveTo(vx[tr], vy[tr])
            ctx.lineTo(vx[bl], vy[bl])
            ctx.strokeStyle = `rgba(255,215,0,${alpha * 0.55})`
            ctx.stroke()
          }

          // Bottom row — draw bottom edge
          if (r === ROWS - 1) {
            ctx.beginPath()
            ctx.moveTo(vx[bl], vy[bl])
            ctx.lineTo(vx[br], vy[br])
            ctx.strokeStyle = `rgba(255,215,0,${alpha})`
            ctx.stroke()
          }
          // Right col — draw right edge
          if (c === COLS - 1) {
            ctx.beginPath()
            ctx.moveTo(vx[tr], vy[tr])
            ctx.lineTo(vx[br], vy[br])
            ctx.strokeStyle = `rgba(200,30,36,${alpha})`
            ctx.stroke()
          }
        }
      }

      // Vertex nodes (subtle dots at intersections)
      for (let i = 0; i < vx.length; i++) {
        const row = Math.floor(i / (COLS + 1))
        const col = i % (COLS + 1)
        const edgeFactor = Math.min(
          col / COLS, 1 - col / COLS,
          row / ROWS, 1 - row / ROWS
        )
        if (edgeFactor < 0.04) continue
        ctx.beginPath()
        ctx.arc(vx[i], vy[i], 1.0, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,240,200,${0.08 + edgeFactor * 0.18})`
        ctx.fill()
      }

      // ── 2. Particle plexus overlay ────────────────────────────
      for (const p of plexus) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > 1) { p.x = 1; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > 1) { p.y = 1; p.vy *= -1 }
      }

      // Plexus connections
      for (let i = 0; i < plexus.length; i++) {
        const a = plexus[i]
        const ax = a.x * W, ay = a.y * H
        for (let j = i + 1; j < plexus.length; j++) {
          const b = plexus[j]
          const bx = b.x * W, by = b.y * H
          const dx = ax - bx, dy = ay - by
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < PLEXUS_LINK_DIST) {
            const alpha = (1 - d / PLEXUS_LINK_DIST) * 0.12
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx, by)
            ctx.strokeStyle = `rgba(255,245,200,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Plexus particle dots
      for (const p of plexus) {
        const px = p.x * W, py = p.y * H
        // Glow halo
        ctx.beginPath()
        ctx.arc(px, py, p.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,245,210,${p.op * 0.18})`
        ctx.fill()
        // Core
        ctx.beginPath()
        ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,220,${p.op})`
        ctx.fill()
      }

      // ── 3. Golden pulsating particles ─────────────────────────
      for (const gp of GOLDEN_PARTICLES) {
        const px = gp.rx * W
        const py = gp.ry * H
        const pulse = Math.sin(t * gp.pulseSpeed + gp.phase)
        const r = gp.baseR + gp.pulseAmp * pulse
        const glowR = r * 5 + gp.pulseAmp * 3 * (0.5 + 0.5 * pulse)
        const alpha = 0.5 + 0.4 * pulse

        // Outer glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, glowR)
        grad.addColorStop(0, `rgba(255,210,80,${alpha * 0.55})`)
        grad.addColorStop(0.4, `rgba(245,180,40,${alpha * 0.2})`)
        grad.addColorStop(1, 'rgba(245,180,40,0)')
        ctx.beginPath()
        ctx.arc(px, py, glowR, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,220,100,${alpha * 0.9})`
        ctx.fill()

        // Bright center
        ctx.beginPath()
        ctx.arc(px, py, r * 0.45, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,220,${alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  )
}
