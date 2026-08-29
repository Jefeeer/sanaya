"use client";

import { Canvas, useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

/**
 * Procedural, lightweight premium hero scene — no external models or HDR files,
 * so it loads instantly and works fully offline. Champagne-toned floating forms
 * over the dark stage, with a gentle pointer parallax. Purely decorative:
 * headline + CTA live in the DOM overlay and never depend on this canvas.
 */

function Ring({ radius, tube, ...rest }: { radius: number; tube: number } & ThreeElements["mesh"]) {
  return (
    <mesh {...rest}>
      <torusGeometry args={[radius, tube, 24, 90]} />
      <meshStandardMaterial color="#cba95f" metalness={0.9} roughness={0.25} emissive="#5c451a" emissiveIntensity={0.25} />
    </mesh>
  );
}

function Orb({ size, color, ...rest }: { size: number; color: string } & ThreeElements["mesh"]) {
  const ref = useRef<Mesh>(null);
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} {...rest}>
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} flatShading />
      </mesh>
    </Float>
  );
}

function Scene() {
  const group = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    // Gentle parallax toward the pointer.
    group.current.rotation.x += (pointer.y * 0.15 - group.current.rotation.x) * 0.04;
    group.current.position.x += (pointer.x * 0.4 - group.current.position.x) * 0.04;
  });

  return (
    <group ref={group}>
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.8}>
        <Ring radius={2.6} tube={0.05} rotation={[Math.PI / 2.2, 0, 0]} />
        <Ring radius={3.4} tube={0.03} rotation={[Math.PI / 1.9, 0.4, 0]} />
      </Float>
      <Orb size={0.9} color="#e4cf9c" position={[-2.6, 0.6, -1]} />
      <Orb size={0.55} color="#cba95f" position={[2.4, -0.8, 0.5]} />
      <Orb size={0.35} color="#f6f2e9" position={[1.4, 1.4, -0.5]} />
      <Orb size={0.28} color="#cba95f" position={[-1.6, -1.2, 0.8]} />
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <fog attach="fog" args={["#0b0b0f", 6, 16]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 6, 6]} intensity={80} color="#e4cf9c" />
      <pointLight position={[-6, -4, 2]} intensity={40} color="#cba95f" />
      <Scene />
    </Canvas>
  );
}
