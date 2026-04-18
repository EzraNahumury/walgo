"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";

const items = [
  { id: "identity", label: "Identity" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certs" },
  { id: "experience", label: "Trajectory" },
  { id: "chain", label: "On-chain" },
];

export default function Navigation() {
  const [active, setActive] = useState<string>("identity");
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(
    null
  );
  const [pillReady, setPillReady] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const getSections = () =>
      items
        .map((i) => document.getElementById(i.id))
        .filter((el): el is HTMLElement => el !== null);

    const update = () => {
      setScrolled(window.scrollY > 12);

      const trigger = window.scrollY + window.innerHeight * 0.35;
      const sections = getSections();
      if (sections.length === 0) return;

      let currentId = sections[0].id;
      for (const s of sections) {
        if (s.offsetTop <= trigger) currentId = s.id;
      }

      const docBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight - 2;
      if (docBottom >= pageBottom) {
        currentId = sections[sections.length - 1].id;
      }

      setActive((prev) => (prev === currentId ? prev : currentId));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const measurePill = () => {
    const listEl = listRef.current;
    const btn = itemRefs.current[active];
    if (!listEl || !btn) return;
    const listRect = listEl.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setPill({
      left: btnRect.left - listRect.left,
      width: btnRect.width,
    });
  };

  useLayoutEffect(() => {
    measurePill();
    requestAnimationFrame(() => setPillReady(true));
    const onResize = () => measurePill();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const onJump = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={[
        "fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500",
        scrolled ? "top-3" : "top-6",
      ].join(" ")}
    >
      <nav
        className="glass-strong flex items-center gap-1 rounded-full px-1.5 py-1.5 pr-2 text-sm"
        aria-label="Primary"
      >
        <div className="flex items-center gap-2 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
          <span>ID · online</span>
        </div>
        <div className="mx-1 h-5 w-px bg-white/10" />

        <ul
          ref={listRef}
          className="relative flex items-center gap-1"
        >
          {pill && (
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-0 rounded-full"
              style={{
                left: pill.left,
                width: pill.width,
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                transition: pillReady
                  ? "left 420ms cubic-bezier(0.22,1,0.36,1), width 420ms cubic-bezier(0.22,1,0.36,1)"
                  : "none",
              }}
            />
          )}

          {items.map((it) => (
            <li key={it.id}>
              <button
                type="button"
                ref={(el) => {
                  itemRefs.current[it.id] = el;
                }}
                onClick={(e) => {
                  onJump(it.id);
                  e.currentTarget.blur();
                }}
                style={{
                  backgroundColor: "transparent",
                  color:
                    active === it.id
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.55)",
                }}
                className="relative rounded-full px-3 py-1.5 text-[13px] transition-colors hover:!text-white/90 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/25"
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mx-1 h-5 w-px bg-white/10" />
        <MagneticButton
          variant="ghost"
          strength={0.18}
          className="!px-3 !py-1 !text-[12px]"
          onClick={() => onJump("terminal")}
        >
          Ask AI →
        </MagneticButton>
      </nav>
    </header>
  );
}
