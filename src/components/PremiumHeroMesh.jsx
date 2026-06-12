import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function GlassMesh() {
  const meshRef = useRef()
  const wireRef = useRef()

  // Organic abstract shape: icosahedron with baked vertex-noise displacement
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.55, 4)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i)
      const len = Math.hypot(x, y, z)
      const nx = x / len, ny = y / len, nz = z / len
      const noise =
        Math.sin(nx * 4.2 + 0.9) * Math.cos(ny * 3.8 + 2.1) * 0.18 +
        Math.sin(ny * 5.1 + 1.7) * Math.cos(nz * 4.3 + 0.5) * 0.13 +
        Math.sin(nz * 3.7 + 3.2) * Math.cos(nx * 4.8 + 1.3) * 0.15
      pos.setXYZ(i, x + nx * noise, y + ny * noise, z + nz * noise)
    }
    g.computeVertexNormals()
    return g
  }, [])

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    if (!meshRef.current) return

    // Continuous slow rotation + subtle mouse parallax
    meshRef.current.rotation.x = t * 0.08 + pointer.y * 0.18
    meshRef.current.rotation.y = t * 0.13 + pointer.x * 0.18
    meshRef.current.rotation.z = t * 0.04

    // Smooth Y float
    const fy = Math.sin(t * 0.5) * 0.28
    meshRef.current.position.y = fy

    // Subtle scale pulse
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.9) * 0.022)

    if (wireRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation)
      wireRef.current.position.y = fy
      wireRef.current.scale.copy(meshRef.current.scale)
    }
  })

  return (
    <group>
      <mesh ref={meshRef} geometry={geo}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={256}
          thickness={0.5}
          chromaticAberration={0.025}
          anisotropy={0.15}
          distortion={0.1}
          distortionScale={0.25}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#ffeebb"
          roughness={0.04}
          transmission={0.92}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      {/* Gold wireframe overlay for futuristic mesh aesthetic */}
      <mesh ref={wireRef} geometry={geo}>
        <meshBasicMaterial color="#f5c518" wireframe transparent opacity={0.1} depthWrite={false} />
      </mesh>
    </group>
  )
}

function Satellite({ speed, radius, color, emissive, size, phaseOffset = 0 }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + phaseOffset
    ref.current.position.set(
      Math.sin(t * speed) * radius,
      Math.cos(t * speed * 0.8) * (radius * 0.6),
      Math.sin(t * speed * 0.6) * (radius * 0.45),
    )
    ref.current.rotation.x = t * 0.6
    ref.current.rotation.y = t * 0.9
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[size, 1]} />
      <meshPhysicalMaterial
        color={color} emissive={emissive} emissiveIntensity={0.65}
        metalness={0.9} roughness={0.05} clearcoat={1}
        transparent opacity={0.88}
      />
    </mesh>
  )
}

function GoldDot() {
  const ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.position.set(
      Math.sin(t * 1.1) * 1.9,
      Math.cos(t * 0.85) * 2.1,
      Math.sin(t * 0.7) * 1.4,
    )
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.09, 12, 12]} />
      <meshPhysicalMaterial color="#f5c518" emissive="#ffa000" emissiveIntensity={1.2} metalness={0.95} roughness={0.02} />
    </mesh>
  )
}

export default function PremiumHeroMesh({ style, className }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      style={style}
      className={className}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
      }}
    >
      <ambientLight intensity={1.5} />
      <pointLight position={[5, 5, 5]} color="#f5c518" intensity={22} />
      <pointLight position={[-4, -2, 4]} color="#4488ff" intensity={18} />
      <pointLight position={[4, -4, -3]} color="#cc44ff" intensity={12} />
      <pointLight position={[0, 6, 2]} color="#ffffff" intensity={8} />
      <Environment preset="city" />

      <GlassMesh />
      <Satellite speed={0.38} radius={2.4} color="#4488ff" emissive="#2244cc" size={0.32} phaseOffset={0} />
      <Satellite speed={0.52} radius={2.1} color="#cc55ff" emissive="#8800cc" size={0.17} phaseOffset={Math.PI} />
      <GoldDot />
      <Sparkles count={28} size={2} scale={6} color="#f5c518" opacity={0.18} />
    </Canvas>
  )
}
