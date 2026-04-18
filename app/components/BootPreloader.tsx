"use client";

import { useEffect, useState } from "react";

const LINES = [
  "handshake · initializing",
  "decrypting identity blob",
  "verifying walrus signature",
  "mounting terminal interface",
  "ready",
];

const GLYPHS = "01ABCDEFabcdef·#@*+=<>";

function scrambleTo(target: string, progress: number) {
  if (!target) return "";
  let out = "";
  const revealed = Math.floor(target.length * progress);
  for (let i = 0; i < target.length; i++) {
    if (target[i] === " ") {
      out += " ";
    } else if (i < revealed) {
      out += target[i];
    } else {
      out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
  }
  return out;
}

export default function BootPreloader() {
  const [progress, setProgress] = useState(0);
  const [display, setDisplay] = useState(LINES[0]);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [shouldRun, setShouldRun] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("booted") === "1") {
        setMounted(false);
        return;
      }
    } catch {
      /* private mode fallback */
    }
    setShouldRun(true);
  }, []);

  useEffect(() => {
    if (!shouldRun) return;
    const start = performance.now();
    const duration = 2400;
    let raf = 0;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(p);

      const rawIdx = Math.floor(p * LINES.length);
      const li = Math.min(LINES.length - 1, Math.max(0, rawIdx));
      const line = LINES[li] ?? LINES[LINES.length - 1];
      const localP = Math.min(1, ((p * LINES.length) % 1) * 2);
      setDisplay(scrambleTo(line, localP));

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(LINES[LINES.length - 1]);
        try {
          sessionStorage.setItem("booted", "1");
        } catch {
          /* no-op */
        }
        setTimeout(() => setExiting(true), 450);
        setTimeout(() => setMounted(false), 1650);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldRun]);

  if (!mounted) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[200] flex items-center justify-center bg-[color:var(--color-bg)]",
        exiting ? "boot-exit" : "",
      ].join(" ")}
      aria-label="Booting identity terminal"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
      >
        <div className="techno-grid h-full w-full" />
      </div>

      <div className="relative flex w-[min(520px,88vw)] flex-col items-start gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent-hot)] pulse-dot" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/60">
            identity terminal · booting
          </span>
        </div>

        <div className="font-[var(--font-space)] text-4xl font-semibold leading-tight tracking-[-0.02em] text-gradient md:text-5xl">
          Unlocking<br />
          <span className="text-accent-gradient">an on-chain human.</span>
        </div>

        <div className="relative mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.round(progress * 100)}%`,
              background:
                "linear-gradient(90deg, #7c5cff 0%, #31d0ff 60%, #ffd65c 100%)",
              transition: "width 80ms linear",
            }}
          />
          <span
            aria-hidden
            className="absolute inset-y-0 w-1/3 bg-white/20 blur-md"
            style={{
              animation: "boot-stripe 1.2s linear infinite",
            }}
          />
        </div>

        <div className="flex w-full items-center justify-between font-mono text-[11.5px] text-white/55">
          <span>
            <span className="text-[color:var(--color-accent-2)]">›</span>{" "}
            {display}
          </span>
          <span className="tabular-nums text-white/40">
            {Math.round(progress * 100)
              .toString()
              .padStart(3, "0")}
            %
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/25">
          <span>network · walrus mainnet</span>
          <span>tls · 1.3</span>
          <span>blob · 0xA91F…7E2D</span>
        </div>
      </div>
    </div>
  );
}
