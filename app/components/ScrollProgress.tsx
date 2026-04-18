"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`;
      }
      if (ringRef.current) {
        ringRef.current.style.setProperty(
          "background",
          `conic-gradient(var(--color-accent-2) ${pct * 360}deg, rgba(255,255,255,0.08) 0)`
        );
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
        style={{
          background:
            "linear-gradient(90deg, #7c5cff 0%, #31d0ff 50%, #ffd65c 100%)",
        }}
        ref={barRef}
      />
      <div
        aria-hidden
        ref={ringRef}
        className="fixed bottom-5 right-5 z-[60] h-10 w-10 rounded-full p-[2px] hidden md:block"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[color:var(--color-bg-elevated)] font-mono text-[10px] text-white/80">
          <span aria-hidden>↑</span>
        </div>
      </div>
    </>
  );
}
