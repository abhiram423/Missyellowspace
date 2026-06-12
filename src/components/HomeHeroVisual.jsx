import { useEffect, useRef } from 'react'

/* Instant-loading Canvas animation — replaces heavy Three.js PremiumHeroMesh */

const RINGS = [
  { a: 0.33, b: 0.09, rotSpeed: 0.18, rgb: '245,197,24',  op: 0.68 },
  { a: 0.27, b: 0.14, rotSpeed: 0.30, rgb: '80,140,255',  op: 0.55 },
  { a: 0.42, b: 0.11, rotSpeed: 0.13, rgb: '180, 80,255', op: 0.45 },
]

const SATS = [
  { ringIdx: 0, orbitSpeed:  0.75, phase: 0,            rgb: '80,140,255',  size: 5.5 },
  { ringIdx: 1, orbitSpeed: -1.10, phase: Math.PI,       rgb: '200,90,255',  size: 4.0 },
  { ringIdx: 2, orbitSpeed:  0.55, phase: Math.PI * 0.5, rgb: '245,197,24',  size: 6.0 },
]

const PARTICLES = Array.from({ length: 30 }, () => ({
  x: Math.random(), y: Math.random(),
  vx: (Math.random() - 0.5) * 0.0006,
  vy: (Math.random() - 0.5) * 0.0006,
  r: Math.random() * 1.1 + 0.4,
  op: Math.random() * 0.35 + 0.15,
}))

function drawRing(ctx, cx, cy, size, ring, elapsed, idx) {
  const rx = ring.a * size
  const ry = ring.b * size
  const rot = 0.4 * idx + elapsed * ring.rotSpeed

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(rot)

  const layers = [
    { lw: 9,   alpha: 0.08 },
    { lw: 2.5, alpha: 0.25 },
    { lw: 0.9, alpha: 1.0  },
  ]
  for (const { lw, alpha } of layers) {
    ctx.beginPath()
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${ring.rgb},${(ring.op * alpha).toFixed(3)})`
    ctx.lineWidth = lw
    ctx.stroke()
  }
  ctx.restore()
  return rot
}

function drawSat(ctx, cx, cy, size, sat, ringRot) {
  const ring = RINGS[sat.ringIdx]
  const rx = ring.a * size
  const ry = ring.b * size
  const angle = sat.phase + sat.orbitSpeed * (performance.now() * 0.001)

  // Transform ellipse point by ring rotation matrix
  const ex = rx * Math.cos(angle)
  const ey = ry * Math.sin(angle)
  const sx = cx + ex * Math.cos(ringRot) - ey * Math.sin(ringRot)
  const sy = cy + ex * Math.sin(ringRot) + ey * Math.cos(ringRot)

  // Outer glow
  const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, sat.size * 4.5)
  g.addColorStop(0, `rgba(${sat.rgb},0.9)`)
  g.addColorStop(1, `rgba(${sat.rgb},0)`)
  ctx.beginPath()
  ctx.arc(sx, sy, sat.size * 4.5, 0, Math.PI * 2)
  ctx.fillStyle = g
  ctx.fill()

  // Core dot
  ctx.beginPath()
  ctx.arc(sx, sy, sat.size, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${sat.rgb},1)`
  ctx.fill()
}

function drawOrb(ctx, cx, cy, size) {
  const r = size * 0.22

  const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.8)
  halo.addColorStop(0, 'rgba(245,197,24,0.07)')
  halo.addColorStop(1, 'rgba(245,197,24,0)')
  ctx.beginPath()
  ctx.arc(cx, cy, r * 2.8, 0, Math.PI * 2)
  ctx.fillStyle = halo
  ctx.fill()

  const mid = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
  mid.addColorStop(0, 'rgba(255,225,110,0.22)')
  mid.addColorStop(0.55, 'rgba(245,197,24,0.10)')
  mid.addColorStop(1, 'rgba(245,197,24,0)')
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fillStyle = mid
  ctx.fill()

  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.38)
  core.addColorStop(0, 'rgba(255,248,200,0.80)')
  core.addColorStop(0.6, 'rgba(245,197,24,0.40)')
  core.addColorStop(1, 'rgba(245,197,24,0)')
  ctx.beginPath()
  ctx.arc(cx, cy, r * 0.38, 0, Math.PI * 2)
  ctx.fillStyle = core
  ctx.fill()
}

export default function HomeHeroVisual({ style, className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId = null
    let W = 0, H = 0, cx = 0, cy = 0, size = 0

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
      cx = W * 0.5
      cy = H * 0.5
      size = Math.min(W, H)
    }
    resize()

    const draw = () => {
      const elapsed = performance.now() * 0.001
      ctx.clearRect(0, 0, W, H)

      // Particles
      for (const p of PARTICLES) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,238,185,${p.op})`
        ctx.fill()
      }

      // Central orb
      drawOrb(ctx, cx, cy, size)

      // Rings + collect their rotations for satellite tracking
      const rotations = RINGS.map((ring, i) => drawRing(ctx, cx, cy, size, ring, elapsed, i))

      // Satellites (each tracks its ring's rotation)
      SATS.forEach(sat => drawSat(ctx, cx, cy, size, sat, rotations[sat.ringIdx]))

      animId = requestAnimationFrame(draw)
    }

    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', ...style }}
    />
  )
}
