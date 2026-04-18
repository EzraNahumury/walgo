"use client";

import { useEffect, useState } from "react";

export default function CommandHint() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        const term = document.getElementById("terminal");
        if (term) {
          term.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => {
            const input = term.querySelector("input");
            if (input instanceof HTMLInputElement) input.focus();
          }, 600);
        }
      }
      if (e.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", handler);
    const t = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 1800);
    return () => {
      window.removeEventListener("keydown", handler);
      clearTimeout(t);
    };
  }, [dismissed]);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      setDismissed(true);
    }, 5500);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[55] -translate-x-1/2 animate-[fadeIn_400ms_ease-out_forwards] opacity-0"
      style={{ animationFillMode: "forwards" }}
    >
      <div className="glass-strong flex items-center gap-2.5 rounded-full px-3 py-1.5 text-[12px] text-white/80">
        <span>Try</span>
        <span className="kbd">⌘</span>
        <span className="kbd">K</span>
        <span className="text-white/40">to ask the terminal anything</span>
        <button
          aria-label="Dismiss"
          onClick={() => {
            setVisible(false);
            setDismissed(true);
          }}
          className="ml-1 rounded-full border border-white/10 bg-white/[0.05] p-[2px] text-white/40 transition-colors hover:text-white"
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path
              d="M2 2L8 8M8 2L2 8"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
}
