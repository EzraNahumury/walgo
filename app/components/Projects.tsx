"use client";

import { useMemo, useState } from "react";
import GlassPanel from "./GlassPanel";
import Reveal from "./Reveal";
import CurtainText from "./CurtainText";
import SectionGlyph from "./SectionGlyph";
import { projects } from "../data/identity";

const FILTERS = ["All", "Web/Apps", "Machine Learning"] as const;
type Filter = (typeof FILTERS)[number];

const YEARS = Array.from(new Set(projects.map((p) => p.year))).sort(
  (a, b) => Number(b) - Number(a)
);

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <SectionGlyph>02</SectionGlyph>
      <Reveal>
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            label="02 — selected work"
            title="Projects"
            subtitle="Public repositories. Each one shipped to GitHub."
          />
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={[
                  "rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all",
                  filter === f
                    ? "border-white/30 bg-white/[0.08] text-white"
                    : "border-white/10 bg-white/[0.02] text-white/55 hover:border-white/20 hover:text-white/85",
                ].join(" ")}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10 hidden items-center gap-4 md:flex">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/35">
            timeline
          </span>
          <div className="flex flex-1 items-center gap-4">
            {YEARS.map((y, i) => (
              <div key={y} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent-2)]" />
                  <span className="font-mono text-[12px] text-white/65">
                    {y}
                  </span>
                  <span className="font-mono text-[10.5px] text-white/30">
                    ·{" "}
                    {
                      projects.filter(
                        (p) =>
                          p.year === y &&
                          (filter === "All" || p.category === filter)
                      ).length
                    }{" "}
                    shipped
                  </span>
                </div>
                {i < YEARS.length - 1 && (
                  <span className="h-px w-6 bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i, 5) * 55}>
            <ProjectCard index={i} p={p} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 font-mono text-[11px] text-white/35">
        <span className="inline-block h-px w-8 bg-white/15" />
        {filtered.length.toString().padStart(2, "0")} of{" "}
        {projects.length.toString().padStart(2, "0")} shown
      </div>
    </section>
  );
}

function ProjectCard({
  p,
  index,
}: {
  p: (typeof projects)[number];
  index: number;
}) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const accent =
    p.category === "Machine Learning"
      ? "var(--color-accent-warm)"
      : "var(--color-accent-2)";

  return (
    <a
      href={p.link ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      className="group relative block"
    >
      <GlassPanel
        focusKey="projects"
        className="h-full overflow-hidden p-6 transition-all duration-300 group-hover:-translate-y-[2px] group-hover:border-white/20 md:p-7"
      >
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-[2px]"
          style={{
            background: `linear-gradient(180deg, ${accent}, transparent 70%)`,
            opacity: 0.55,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(340px circle at ${mouse.x}px ${mouse.y}px, rgba(124,92,255,0.14), transparent 60%)`,
          }}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/40">
              <span className="text-white/55">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>·</span>
              <span>{p.year}</span>
              <span>·</span>
              <span
                style={{
                  color:
                    p.category === "Machine Learning"
                      ? "var(--color-accent-warm)"
                      : "var(--color-accent-2)",
                  opacity: 0.9,
                }}
              >
                {p.category}
              </span>
            </div>
            <h3 className="mt-2.5 text-[22px] font-semibold leading-tight tracking-tight text-white md:text-[24px]">
              {p.name}
            </h3>
          </div>
          <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white/[0.08] group-hover:text-white">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M4 10L10 4M10 4H5M10 4V9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <p className="relative mt-4 max-w-md text-[14.5px] leading-[1.55] text-white/65">
          {p.tagline}
        </p>

        <div className="relative mt-6 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/8 bg-white/[0.025] px-2 py-[3px] font-mono text-[10.5px] text-white/65"
            >
              {s}
            </span>
          ))}
        </div>
      </GlassPanel>
    </a>
  );
}

export function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="relative flex flex-col gap-3">
      <span className="label-chip">{label}</span>
      <CurtainText
        as="h2"
        className="mt-1 text-[clamp(32px,4.5vw,48px)] font-semibold tracking-[-0.025em] text-white"
      >
        {title}
      </CurtainText>
      {subtitle && (
        <CurtainText
          as="p"
          delay={140}
          className="max-w-lg text-[15px] leading-[1.55] text-white/55"
        >
          {subtitle}
        </CurtainText>
      )}
    </div>
  );
}
