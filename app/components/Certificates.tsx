"use client";

import { useMemo } from "react";
import GlassPanel from "./GlassPanel";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { certificates } from "../data/identity";
import { SectionHeader } from "./Projects";
import SectionGlyph from "./SectionGlyph";

export default function Certificates() {
  const { grouped, total } = useMemo(() => {
    const m = new Map<string, typeof certificates>();
    certificates.forEach((c) => {
      const list = m.get(c.issuer) ?? [];
      list.push(c);
      m.set(c.issuer, list);
    });
    const grouped = [...m.entries()]
      .map(([issuer, items]) => ({ issuer, items }))
      .sort((a, b) => b.items.length - a.items.length);
    return { grouped, total: certificates.length };
  }, []);

  return (
    <section
      id="certificates"
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <SectionGlyph>04</SectionGlyph>
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            label="04 — credentials"
            title="Wall of Credentials"
            subtitle="Every badge is a unit. Each cell below is a real certificate."
          />
          <div className="flex items-baseline gap-2">
            <span className="font-[var(--font-space)] text-[clamp(48px,6vw,72px)] font-semibold tabular-nums leading-none text-[color:var(--color-accent-hot)]">
              <CountUp to={total} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
              credentials
            </span>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 space-y-5">
        {grouped.map((g, gi) => (
          <Reveal key={g.issuer} delay={Math.min(gi, 4) * 70}>
            <GlassPanel focusKey="certificates" className="p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-md px-2 font-mono text-[11px] font-semibold tabular-nums"
                    style={{
                      background: "rgba(255, 214, 92, 0.12)",
                      color: "var(--color-accent-hot)",
                      border: "1px solid rgba(255, 214, 92, 0.2)",
                    }}
                  >
                    ×{g.items.length}
                  </span>
                  <h3 className="truncate text-[15px] font-medium text-white">
                    {g.issuer}
                  </h3>
                  {g.items.some((c) => c.highlight) && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[color:var(--color-accent-hot)]/30 bg-[color:var(--color-accent-hot)]/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[color:var(--color-accent-hot)]">
                      featured
                    </span>
                  )}
                </div>
                <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/35">
                  issuer #{String(gi + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {g.items.map((c, i) => (
                  <div
                    key={`${c.title}-${i}`}
                    className={[
                      "group/cert relative flex items-start gap-2 rounded-lg border px-2.5 py-2 transition-all",
                      c.highlight
                        ? "border-[color:var(--color-accent-hot)]/25 bg-[color:var(--color-accent-hot)]/[0.04]"
                        : "border-white/6 bg-white/[0.02] hover:-translate-y-[1px] hover:border-white/18 hover:bg-white/[0.045]",
                    ].join(" ")}
                    title={`${c.title} · ${c.year}`}
                  >
                    <span
                      className={[
                        "mt-[5px] inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                        c.highlight
                          ? "bg-[color:var(--color-accent-hot)]"
                          : "bg-white/25",
                      ].join(" ")}
                    />
                    <div className="min-w-0">
                      <div className="truncate text-[12px] leading-tight text-white/85">
                        {c.title}
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] text-white/35">
                        {c.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
