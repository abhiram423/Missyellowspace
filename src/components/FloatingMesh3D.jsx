import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function FloatingMesh3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let w = mount.clientWidth || 500
    let h = mount.clientHeight || 500

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h, false)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5
    renderer.outputColorSpace = THREE.SRGBColorSpace

    mount.appendChild(renderer.domElement)
    Object.assign(renderer.domElement.style, {
      position: 'absolute', top: '0', left: '0',
      width: '100%', height: '100%', display: 'block',
    })

    // ── Scene / Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.z = 5.5

    // ── Main geometry: TorusKnot — organic, futuristic ────────────────────────
    const geo = new THREE.TorusKnotGeometry(1.2, 0.35, 220, 32, 2, 3)

    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf5c518),
      emissive: new THREE.Color(0xf08c00),
      emissiveIntensity: 0.4,
      metalness: 0.35,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Wireframe overlay for mesh-grid aesthetic
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xf5c518,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    })
    const wire = new THREE.Mesh(geo, wireMat)
    scene.add(wire)

    // ── Secondary objects ─────────────────────────────────────────────────────
    // Blue icosahedron orbiting the main mesh
    const icoGeo = new THREE.IcosahedronGeometry(0.38, 2)
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x4488ff,
      emissive: new THREE.Color(0x2244cc),
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.06,
      clearcoat: 1,
      transparent: true,
      opacity: 0.9,
    })
    const ico1 = new THREE.Mesh(icoGeo, icoMat)
    scene.add(ico1)

    // Purple sphere
    const s2Geo = new THREE.SphereGeometry(0.18, 16, 16)
    const s2Mat = new THREE.MeshPhysicalMaterial({
      color: 0xcc55ff,
      emissive: new THREE.Color(0x8800cc),
      emissiveIntensity: 0.7,
      metalness: 0.85,
      roughness: 0.05,
      clearcoat: 1,
      transparent: true,
      opacity: 0.88,
    })
    const s2 = new THREE.Mesh(s2Geo, s2Mat)
    scene.add(s2)

    // Small gold accent dot
    const s3Geo = new THREE.SphereGeometry(0.1, 12, 12)
    const s3Mat = new THREE.MeshPhysicalMaterial({
      color: 0xf5c518,
      emissive: new THREE.Color(0xffa000),
      emissiveIntensity: 1.0,
      metalness: 0.9,
      roughness: 0.03,
    })
    const s3 = new THREE.Mesh(s3Geo, s3Mat)
    scene.add(s3)

    // ── Lighting ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 1.5))

    const goldDir = new THREE.DirectionalLight(0xffd700, 5)
    goldDir.position.set(5, 5, 5)
    scene.add(goldDir)

    const bluePoint = new THREE.PointLight(0x4488ff, 18, 25)
    bluePoint.position.set(-4, -2, 4)
    scene.add(bluePoint)

    const purplePoint = new THREE.PointLight(0xcc44ff, 12, 20)
    purplePoint.position.set(4, -4, -3)
    scene.add(purplePoint)

    const rimLight = new THREE.PointLight(0xffffff, 8, 18)
    rimLight.position.set(0, 6, 2)
    scene.add(rimLight)

    // ── Mouse interaction ─────────────────────────────────────────────────────
    let mX = 0, mY = 0, tX = 0, tY = 0
    const onMouse = (e) => {
      mX = (e.clientX / window.innerWidth - 0.5) * 2
      mY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      const cw = mount.clientWidth
      const ch = mount.clientHeight
      if (!cw || !ch) return
      w = cw; h = ch
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)

    // ── Animation loop ────────────────────────────────────────────────────────
    let raf
    const clock = new THREE.Clock()

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Continuous slow rotation
      mesh.rotation.x = t * 0.1
      mesh.rotation.y = t * 0.18

      // Smooth Y float
      const floatY = Math.sin(t * 0.55) * 0.32
      mesh.position.y = floatY
      wire.position.y = floatY

      // Subtle scale pulse
      const s = 1 + Math.sin(t * 1.0) * 0.024
      mesh.scale.setScalar(s)
      wire.scale.setScalar(s)
      wire.rotation.copy(mesh.rotation)

      // Blue sphere orbiting
      ico1.position.x = Math.sin(t * 0.5) * 2.5
      ico1.position.y = Math.cos(t * 0.4) * 1.6 + floatY * 0.4
      ico1.position.z = Math.sin(t * 0.3) * 1.2
      ico1.rotation.x = t * 0.5
      ico1.rotation.y = t * 0.7

      // Purple sphere orbiting (counter-direction)
      s2.position.x = Math.cos(t * 0.55) * 2.2
      s2.position.y = Math.sin(t * 0.65) * 1.8 + floatY * 0.3
      s2.position.z = Math.cos(t * 0.45) * 1.0

      // Gold dot fast orbit
      s3.position.x = Math.sin(t * 1.2) * 1.8
      s3.position.y = Math.cos(t * 0.9) * 2.0 + floatY
      s3.position.z = Math.sin(t * 0.8) * 1.5

      // Mouse parallax — smooth lerp
      tX += (mX * 0.35 - tX) * 0.05
      tY += (mY * 0.35 - tY) * 0.05
      mesh.rotation.y += tX
      mesh.rotation.x += tY
      wire.rotation.copy(mesh.rotation)

      // Orbit main directional light for sweeping highlights
      goldDir.position.x = Math.sin(t * 0.25) * 7
      goldDir.position.y = Math.sin(t * 0.15) * 4
      goldDir.position.z = Math.cos(t * 0.25) * 7

      renderer.render(scene, camera)
    }

    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
      renderer.dispose()
      ;[geo, mat, wireMat, icoGeo, icoMat, s2Geo, s2Mat, s3Geo, s3Mat].forEach(x => x.dispose())
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
