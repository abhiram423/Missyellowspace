import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────
   Sub-Page Background: Flowing Crystal Lattice
   • Drifting Voronoi-like seed points
   • Delaunay-inspired triangulated connections
   • Flowing energy pulses along edges
   • Very different visual feel from MorphingPolygonsBg
   ───────────────────────────────────────────── */

const SEED_COUNT = 28
const MAX_LINK_DIST = 180
const PULSE_SPEED = 0.55
const DRIFT_SPEED = 0.012

function buildSeeds() {
  return Array.from({ length: SEED_COUNT }, (_, i) => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * DRIFT_SPEED * 0.01,
    vy: (Math.random() - 0.5) * DRIFT_SPEED * 0.01,
    r: Math.random() * 2.0 + 1.0,
    op: Math.random() * 0.35 + 0.18,
    phase: Math.random() * Math.PI * 2,
    pulseFreq: Math.random() * 0.5 + 0.6,
  }))
}

// Energy pulse data on each edge connection
function buildEdgePulses(count) {
  return Array.from({ length: count * count }, () => ({
    t: Math.random(),
    speed: Math.random() * 0.4 + 0.2,
    active: Math.random() > 0.6,
  }))
}

export default function SubPageBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })

    let W = 0, H = 0
    let animId = null
    const seeds = buildSeeds()
    const pulses = buildEdgePulses(SEED_COUNT)

    // Additional flowing stream lines
    const STREAM_COUNT = 8
    const streams = Array.from({ length: STREAM_COUNT }, (_, i) => ({
      phase: (i / STREAM_COUNT) * Math.PI * 2,
      freq: 0.15 + i * 0.04,
      amp: 0.06 + (i % 3) * 0.025,
      speed: 0.08 + (i % 4) * 0.015,
      yBase: (i + 0.5) / STREAM_COUNT,
      alpha: 0.06 + (i % 3) * 0.02,
    }))

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    resize()

    const draw = () => {
      const t = performance.now() * 0.001
      ctx.clearRect(0, 0, W, H)

      // ── 1. Flowing stream lines (horizontal energy flows) ─────
      for (const s of streams) {
        ctx.beginPath()
        const y0 = (s.yBase + s.amp * Math.sin(t * s.speed + s.phase)) * H
        ctx.moveTo(0, y0)

        const steps = Math.ceil(W / 8)
        for (let i = 1; i <= steps; i++) {
          const sx = (i / steps) * W
          const sy = (s.yBase + s.amp * Math.sin(t * s.speed + s.phase + i * s.freq)) * H
          ctx.lineTo(sx, sy)
        }
        ctx.strokeStyle = `rgba(255,215,0,${s.alpha})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // ── 2. Crystalline lattice — drifting seeds ───────────────
      for (const s of seeds) {
        s.x += s.vx
        s.y += s.vy
        // Soft boundary bounce with damping
        if (s.x < 0.02) { s.x = 0.02; s.vx *= -0.8 }
        if (s.x > 0.98) { s.x = 0.98; s.vx *= -0.8 }
        if (s.y < 0.02) { s.y = 0.02; s.vy *= -0.8 }
        if (s.y > 0.98) { s.y = 0.98; s.vy *= -0.8 }
      }

      // Draw connections between nearby seeds
      let edgeIdx = 0
      for (let i = 0; i < seeds.length; i++) {
        const a = seeds[i]
        const ax = a.x * W, ay = a.y * H
        for (let j = i + 1; j < seeds.length; j++) {
          const b = seeds[j]
          const bx = b.x * W, by = b.y * H
          const dx = ax - bx, dy = ay - by
          const d = Math.sqrt(dx * dx + dy * dy)
          edgeIdx++

          if (d < MAX_LINK_DIST) {
            const strength = 1 - d / MAX_LINK_DIST
            const lineAlpha = strength * 0.18

            // Base edge line
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx, by)
            ctx.strokeStyle = `rgba(200,40,50,${lineAlpha})`
            ctx.lineWidth = 0.65
            ctx.stroke()

            // Triangle face fill for nearby triplets (alternate)
            if (i % 3 === 0 && strength > 0.55 && j < seeds.length - 1) {
              const c = seeds[(j + i) % seeds.length]
              const cx2 = c.x * W, cy2 = c.y * H
              const d2 = Math.sqrt((ax - cx2) ** 2 + (ay - cy2) ** 2)
              if (d2 < MAX_LINK_DIST * 0.75) {
                ctx.beginPath()
                ctx.moveTo(ax, ay)
                ctx.lineTo(bx, by)
                ctx.lineTo(cx2, cy2)
                ctx.closePath()
                ctx.fillStyle = `rgba(255,215,0,${strength * 0.025})`
                ctx.fill()
              }
            }

            // Energy pulse traveling along edge
            const pulse = pulses[edgeIdx % pulses.length]
            if (pulse.active) {
              pulse.t += pulse.speed * 0.008
              if (pulse.t > 1) { pulse.t = 0; pulse.active = Math.random() > 0.4 }
              const px = ax + (bx - ax) * pulse.t
              const py = ay + (by - ay) * pulse.t
              const pAlpha = strength * 0.7 * Math.sin(pulse.t * Math.PI)

              // Pulse glow
              const pg = ctx.createRadialGradient(px, py, 0, px, py, 6)
              pg.addColorStop(0, `rgba(255,100,100,${pAlpha})`)
              pg.addColorStop(1, 'rgba(255,50,50,0)')
              ctx.beginPath()
              ctx.arc(px, py, 6, 0, Math.PI * 2)
              ctx.fillStyle = pg
              ctx.fill()

              // Pulse core
              ctx.beginPath()
              ctx.arc(px, py, 1.8, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(255,180,180,${pAlpha})`
              ctx.fill()
            } else if (Math.random() < 0.001) {
              pulse.active = true
              pulse.t = 0
            }
          }
        }
      }

      // Seed node dots with pulsing glow
      for (const s of seeds) {
        const sx = s.x * W, sy = s.y * H
        const pulse = 0.5 + 0.5 * Math.sin(t * s.pulseFreq + s.phase)
        const r = s.r + 0.8 * pulse

        // Glow
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 5)
        g.addColorStop(0, `rgba(230,60,60,${s.op * 0.6 * pulse})`)
        g.addColorStop(1, 'rgba(230,60,60,0)')
        ctx.beginPath()
        ctx.arc(sx, sy, r * 5, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,120,120,${s.op})`
        ctx.fill()
      }

      // ── 3. Subtle scanning line (premium effect) ──────────────
      const scanY = ((t * 0.07) % 1) * H
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60)
      scanGrad.addColorStop(0, 'rgba(255,215,0,0)')
      scanGrad.addColorStop(0.5, 'rgba(255,215,0,0.03)')
      scanGrad.addColorStop(1, 'rgba(255,215,0,0)')
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY - 60, W, 120)

      animId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

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
        willChange: 'transform',
      }}
    />
  )
}
