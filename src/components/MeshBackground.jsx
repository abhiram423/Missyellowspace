import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function MeshBackground({ style }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x07091a, 1)

    // ── Scene / Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x07091a, 6, 22)

    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100)
    camera.position.set(0, 0, 0.5)

    // ── Geometry: large icosahedron, camera sits inside ──────────────────────
    // detail=4 → 5120 flat-shaded triangles, which exactly recreates the faceted look
    const geo = new THREE.IcosahedronGeometry(12, 4)
    const posAttr = geo.getAttribute('position')
    const vertexCount = posAttr.count
    const origPos = new Float32Array(posAttr.array) // snapshot of rest-pose

    // Dark metallic interior surface
    const solidMat = new THREE.MeshPhongMaterial({
      color: 0x060c1e,
      emissive: 0x020510,
      specular: 0xf5c518,
      shininess: 80,
      flatShading: true,   // this gives the crisp low-poly facet look
      side: THREE.BackSide, // render inner faces (we're inside the sphere)
    })
    const solid = new THREE.Mesh(geo, solidMat)
    scene.add(solid)

    // Gold wireframe overlay — produces the glowing edge lines
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xf5c518,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
    })
    const wire = new THREE.Mesh(geo, wireMat)
    scene.add(wire)

    // ── Lighting ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x05091a, 5))

    const goldLight = new THREE.PointLight(0xf5c518, 12, 28)
    scene.add(goldLight)

    const blueLight = new THREE.PointLight(0x1a4fff, 7, 25)
    blueLight.position.set(-6, -5, -4)
    scene.add(blueLight)

    const rimLight = new THREE.PointLight(0xffffff, 3, 20)
    rimLight.position.set(0, 8, 0)
    scene.add(rimLight)

    // ── Resize handler ────────────────────────────────────────────────────────
    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    // ── Animation loop ────────────────────────────────────────────────────────
    let raf
    const clock = new THREE.Clock()

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // --- Vertex morphing (radial displacement along vertex normal) ---
      const arr = posAttr.array
      for (let i = 0; i < vertexCount; i++) {
        const i3 = i * 3
        const ox = origPos[i3], oy = origPos[i3 + 1], oz = origPos[i3 + 2]

        // Unit normal (for a sphere = vertex position / radius)
        const len = Math.sqrt(ox * ox + oy * oy + oz * oz)
        const nx = ox / len, ny = oy / len, nz = oz / len

        // Layered sine waves → organic, never repeating undulation
        const wave =
          Math.sin(nx * 5.0 + t * 0.55) * Math.cos(ny * 4.5 + t * 0.40) +
          Math.sin(ny * 4.0 + t * 0.70) * Math.cos(nz * 3.5 + t * 0.35) +
          Math.sin(nz * 5.5 + t * 0.45) * Math.cos(nx * 3.0 + t * 0.60)

        const disp = (wave / 3) * 1.4 // normalise & scale: ±1.4 units
        arr[i3]     = ox + nx * disp
        arr[i3 + 1] = oy + ny * disp
        arr[i3 + 2] = oz + nz * disp
      }
      posAttr.needsUpdate = true
      geo.computeVertexNormals()

      // --- Slow mesh rotation for the continuous flow effect ---
      solid.rotation.x = t * 0.035
      solid.rotation.y = t * 0.055
      wire.rotation.copy(solid.rotation)

      // --- Orbit gold light for sweeping specular highlights ---
      goldLight.position.x = Math.sin(t * 0.28) * 7
      goldLight.position.y = Math.sin(t * 0.18) * 4
      goldLight.position.z = Math.cos(t * 0.28) * 7

      renderer.render(scene, camera)
    }

    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      renderer.dispose()
      geo.dispose()
      solidMat.dispose()
      wireMat.dispose()
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
        display: 'block',
        zIndex: 0,
        ...style,
      }}
    />
  )
}
