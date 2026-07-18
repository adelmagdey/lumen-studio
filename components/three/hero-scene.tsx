"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import * as THREE from "three";

// The r3f intrinsic JSX namespace isn't being picked up in this build
// (likely due to React 19 types vs r3f types mismatches). Use React.createElement
// everywhere to bypass the type checking while still rendering correctly.

const el = (type: string, props: Record<string, unknown> = {}, ...children: React.ReactNode[]) =>
  React.createElement(type, props, ...children);

function FloatingShape({
  position,
  color,
  speed = 1,
  distort = 0.4,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
}) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={1.2}
          roughness={0.15}
          metalness={0.6}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField({ count = 600 }: { count?: number }) {
  const points = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.04,
      color: new THREE.Color("#a78bfa"),
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    return new THREE.Points(geom, mat);
  }, [count]);

  useFrame((state) => {
    points.rotation.y = state.clock.elapsedTime * 0.04;
    points.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return el("primitive", { object: points });
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.15) * 0.6;
    state.camera.position.y = Math.cos(t * 0.18) * 0.4;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      {el("color", { attach: "background", args: ["#00000000"] })}
      {el("ambientLight", { intensity: 0.4 })}
      {el("directionalLight", { position: [5, 5, 5], intensity: 1.2, color: "#c4b5fd" })}
      {el("directionalLight", { position: [-5, -3, -2], intensity: 0.6, color: "#7c3aed" })}
      {el("pointLight", { position: [0, 0, 3], intensity: 1.2, color: "#a78bfa" })}

      <CameraRig />

      <FloatingShape position={[-2.2, 0.6, 0]} color="#8b5cf6" speed={0.8} />
      <FloatingShape position={[2.4, -0.4, -1]} color="#6366f1" speed={0.9} distort={0.55} />
      <FloatingShape position={[0, 1.6, -2]} color="#a78bfa" speed={1.1} distort={0.3} />
      <FloatingShape position={[-1.2, -1.5, 1.5]} color="#c4b5fd" speed={0.7} />

      <ParticleField />

      <Environment preset="city" />
    </Canvas>
  );
}
