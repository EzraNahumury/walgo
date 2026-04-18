"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useFocus } from "../../lib/focus";
import type { Focus } from "../../data/knowledge";

type Node = {
  label: string;
  focusKey: Exclude<Focus, null>;
  radius: number;
  speed: number;
  inclination: number;
  phase: number;
  size: number;
  color: string;
};

const nodes: Node[] = [
  { label: "projects", focusKey: "projects", radius: 2.6, speed: 0.32, inclination: 0.12, phase: 0, size: 0.11, color: "#b9a6ff" },
  { label: "skills", focusKey: "skills", radius: 3.2, speed: 0.22, inclination: -0.18, phase: 1.4, size: 0.09, color: "#7df3ff" },
  { label: "certificates", focusKey: "certificates", radius: 3.5, speed: 0.26, inclination: 0.22, phase: 2.1, size: 0.095, color: "#34d399" },
  { label: "experience", focusKey: "experience", radius: 3.9, speed: 0.16, inclination: -0.28, phase: 3.2, size: 0.1, color: "#ff7ae6" },
  { label: "identity", focusKey: "identity", radius: 2.2, speed: 0.5, inclination: -0.06, phase: 4.6, size: 0.08, color: "#ffffff" },
];

export default function OrbitNodes() {
  const { focus } = useFocus();
  const groupRef = useRef<THREE.Group>(null);

  const items = useMemo(
    () =>
      nodes.map((n) => ({
        ...n,
        meshRef: { current: null as THREE.Mesh | null },
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    items.forEach((n) => {
      const m = n.meshRef.current;
      if (!m) return;
      const angle = t * n.speed + n.phase;
      const x = Math.cos(angle) * n.radius;
      const z = Math.sin(angle) * n.radius;
      const y = Math.sin(angle * 1.3) * n.inclination;
      m.position.set(x, y, z);

      const focused = focus === n.focusKey;
      const targetScale = focused ? 1.8 : 1;
      const cur = m.scale.x;
      const next = cur + (targetScale - cur) * 0.08;
      m.scale.set(next, next, next);

      const mat = m.material as THREE.MeshBasicMaterial;
      if (mat && "opacity" in mat) {
        const targetOpacity = focus && !focused ? 0.25 : 1;
        mat.opacity = mat.opacity + (targetOpacity - mat.opacity) * 0.08;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((n, i) => (
        <group key={n.label}>
          {/* orbit ring */}
          <mesh rotation={[Math.PI / 2 + n.inclination, 0, 0]}>
            <ringGeometry args={[n.radius - 0.005, n.radius + 0.005, 128]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.06}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            ref={(el) => {
              items[i].meshRef.current = el;
            }}
          >
            <sphereGeometry args={[n.size, 24, 24]} />
            <meshBasicMaterial color={n.color} transparent opacity={1} />
          </mesh>
          {/* halo dot */}
          <mesh
            ref={(el) => {
              // no-op; rendered next to node via follow group would be nicer but we keep it light
              void el;
            }}
          />
        </group>
      ))}
    </group>
  );
}
