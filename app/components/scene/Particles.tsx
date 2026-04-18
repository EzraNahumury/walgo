"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  count?: number;
  radius?: number;
};

export default function Particles({ count = 1200, radius = 8 }: Props) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const { positions, seeds } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute on a thick spherical shell
      const r = radius * (0.4 + Math.random() * 0.6);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
      s[i] = Math.random();
    }
    return { positions: p, seeds: s };
  }, [count, radius]);

  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const t = state.clock.getElapsedTime();
    // Gentle drift rotation
    pts.rotation.y = t * 0.02;
    pts.rotation.x = Math.sin(t * 0.08) * 0.05;

    // Parallax tilt based on pointer
    const targetX = pointer.y * 0.15;
    const targetY = pointer.x * 0.25;
    pts.rotation.x += (targetX - pts.rotation.x) * 0.04;
    pts.rotation.y += (targetY - pts.rotation.y) * 0.04;

    // Subtle twinkle by updating attribute a few at a time
    const attr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < 30; i++) {
      const idx = (Math.floor(t * 60) + i * 41) % count;
      const seed = seeds[idx];
      const base = idx * 3;
      const jitter = Math.sin(t * (0.6 + seed) + seed * 10) * 0.004;
      arr[base] += jitter;
      arr[base + 1] += jitter;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.014}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
