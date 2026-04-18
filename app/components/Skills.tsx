"use client";

import { useEffect, useRef, useState } from "react";
import GlassPanel from "./GlassPanel";
import Reveal from "./Reveal";
import { skills } from "../data/identity";
import { SectionHeader } from "./Projects";
import SectionGlyph from "./SectionGlyph";

const categories = ["Frontend", "Backend", "ML/AI", "Cloud", "Tools"] as const;

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={rootRef}
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <SectionGlyph>03</SectionGlyph>
      <Reveal>
        <SectionHeader
          label="03 — competency matrix"
          title="Skills"
          subtitle="Depth over breadth. Values self-assessed against peers."
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {categories.map((cat, idx) => {
          const items = skills.filter((s) => s.category === cat);
          if (items.length === 0) return null;
          const accent = idx % 2 === 1;
          return (
            <Reveal key={cat} delay={idx * 80}>
              <GlassPanel focusKey="skills" className="p-6 md:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={[
                        "inline-block h-1.5 w-1.5 rounded-full",
                        accent
                          ? "bg-[color:var(--color-accent-2)]"
                          : "bg-[color:var(--color-accent)]",
                      ].join(" ")}
                    />
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
                      {cat}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-white/35">
                    {items.length.toString().padStart(2, "0")} signals
                  </span>
                </div>
                <ul className="space-y-3.5">
                  {items.map((s, i) => {
                    const dots = Math.round(s.level / 10);
                    return (
                      <li
                        key={s.name}
                        className="flex items-center justify-between gap-6"
                      >
                        <span className="truncate text-[14px] text-white/85">
                          {s.name}
                        </span>
                        <div className="flex shrink-0 items-center gap-3">
                          <span
                            className="dotbar"
                            aria-label={`Level ${s.level} out of 100`}
                          >
                            {Array.from({ length: 10 }).map((_, d) => (
                              <span
                                key={d}
                                className={
                                  visible && d < dots
                                    ? accent
                                      ? "on on-2"
                                      : "on"
                                    : ""
                                }
                                style={{
                                  transitionDelay: `${i * 50 + d * 35}ms`,
                                }}
                              />
                            ))}
                          </span>
                          <span className="w-8 text-right font-mono text-[11px] tabular-nums text-white/40">
                            {s.level}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </GlassPanel>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
