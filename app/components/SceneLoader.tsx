"use client";

import { useEffect, useState } from "react";
import Scene3D from "./Scene3D";

export default function SceneLoader() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Scene3D />;
}
