"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.3, 0.6] }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

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
        <ul className="flex items-center gap-1">
          {items.map((it) => (
            <li key={it.id}>
              <button
                onClick={() => onJump(it.id)}
                className={[
                  "relative rounded-full px-3 py-1.5 text-[13px] transition-colors",
                  active === it.id
                    ? "text-white"
                    : "text-white/55 hover:text-white/90",
                ].join(" ")}
              >
                {active === it.id && (
                  <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]" />
                )}
                <span className="relative">{it.label}</span>
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
