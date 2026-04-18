"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import IdentityCore from "./scene/IdentityCore";
import OrbitNodes from "./scene/OrbitNodes";
import Particles from "./scene/Particles";
import CameraRig from "./scene/CameraRig";

export default function Scene3D() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 -z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <color attach="background" args={["#060608"]} />
        <fog attach="fog" args={["#060608", 7, 18]} />

        <ambientLight intensity={0.35} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#9b87ff" />
        <pointLight position={[-5, -3, 2]} intensity={0.9} color="#31d0ff" />

        <Suspense fallback={null}>
          <IdentityCore />
          <OrbitNodes />
          <Particles count={900} radius={8} />
        </Suspense>

        <CameraRig />
      </Canvas>

      {/* Vignette + subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(6,6,8,0.6) 80%, rgba(6,6,8,0.92) 100%)",
        }}
      />
    </div>
  );
}
