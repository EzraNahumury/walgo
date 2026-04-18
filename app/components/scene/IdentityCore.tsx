"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useFocus } from "../../lib/focus";

export default function IdentityCore() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const { focus } = useFocus();
  const scrollP = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      scrollP.current = Math.min(
        1,
        Math.max(0, window.scrollY / (vh * 0.9))
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.18;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.08;
      // Shrink the orb slightly as user scrolls past hero
      const s = THREE.MathUtils.lerp(1.2, 0.65, scrollP.current);
      group.current.scale.x +=
        (s - group.current.scale.x) * 0.05;
      group.current.scale.y = group.current.scale.x;
      group.current.scale.z = group.current.scale.x;
    }
    if (inner.current) {
      const target = focus === "identity" ? 1.12 : 1;
      inner.current.scale.x +=
        (target - inner.current.scale.x) * 0.06;
      inner.current.scale.y = inner.current.scale.x;
      inner.current.scale.z = inner.current.scale.x;
    }
    if (halo.current) {
      halo.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Sphere ref={inner} args={[1, 96, 96]}>
        <MeshDistortMaterial
          color="#7c5cff"
          emissive="#4628ff"
          emissiveIntensity={0.55}
          roughness={0.15}
          metalness={0.35}
          distort={0.42}
          speed={1.2}
        />
      </Sphere>

      <Sphere args={[1.28, 32, 16]}>
        <meshBasicMaterial
          color="#9b87ff"
          wireframe
          transparent
          opacity={0.12}
        />
      </Sphere>

      <mesh ref={halo} rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[1.55, 1.6, 96]} />
        <meshBasicMaterial
          color="#31d0ff"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.6, 0]}>
        <ringGeometry args={[1.85, 1.88, 96]} />
        <meshBasicMaterial
          color="#7c5cff"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
