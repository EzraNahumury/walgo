"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useFocus } from "../../lib/focus";

// Focus offsets (x, y) — applied on top of the scroll trajectory.
const FOCUS_OFFSET: Record<string, THREE.Vector3> = {
  identity: new THREE.Vector3(0, 0.2, 0),
  projects: new THREE.Vector3(1.8, 0.6, -0.4),
  skills: new THREE.Vector3(-2.0, 0.4, -0.2),
  certificates: new THREE.Vector3(1.4, -0.8, -0.3),
  experience: new THREE.Vector3(0.2, -1.2, 0),
};

// Hero → after-hero camera trajectory (depends on scroll progress 0..1).
function heroTrack(p: number) {
  // p=0: orb on the right of viewport (camera shifted left), close (z=5.5)
  // p=1: camera centered and pulled back (z=8.2), tilted down slightly
  const x = THREE.MathUtils.lerp(-1.8, 0, p);
  const y = THREE.MathUtils.lerp(0.1, -0.2, p);
  const z = THREE.MathUtils.lerp(5.5, 8.2, p);
  return new THREE.Vector3(x, y, z);
}

export default function CameraRig() {
  const { camera, pointer } = useThree();
  const { focus } = useFocus();
  const scrollP = useRef(0);
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const raw = Math.min(1, Math.max(0, window.scrollY / (vh * 0.9)));
      scrollP.current = raw;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useFrame(() => {
    const base = heroTrack(scrollP.current);
    const offset =
      (focus && FOCUS_OFFSET[focus]) || new THREE.Vector3(0, 0, 0);
    // Attenuate focus offsets when deep in scroll (orb is smaller/further).
    const attn = 1 - scrollP.current * 0.4;

    const px = pointer.x * 0.45 * (1 - scrollP.current * 0.6);
    const py = pointer.y * 0.3 * (1 - scrollP.current * 0.6);

    const desired = new THREE.Vector3(
      base.x + offset.x * attn + px,
      base.y + offset.y * attn + py,
      base.z + offset.z * attn
    );
    camera.position.lerp(desired, 0.045);

    // look target drifts slightly right at hero, toward center afterwards
    const lookX = THREE.MathUtils.lerp(0.9, 0, scrollP.current);
    target.current.set(lookX, 0, 0);
    camera.lookAt(target.current);
  });

  return null;
}
