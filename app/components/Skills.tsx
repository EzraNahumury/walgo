"use client";

import type { ReactNode } from "react";
import GlassPanel from "./GlassPanel";
import Reveal from "./Reveal";
import { skills } from "../data/identity";
import { SectionHeader } from "./Projects";
import SectionGlyph from "./SectionGlyph";

const categories = ["Frontend", "Backend", "ML/AI", "Cloud", "Tools"] as const;

type IconSpec =
  | { kind: "cdn"; slug: string; color: string }
  | { kind: "svg"; color: string; node: ReactNode };

const iconMap: Record<string, IconSpec> = {
  React: { kind: "cdn", slug: "react", color: "61DAFB" },
  "Next.js": { kind: "cdn", slug: "nextdotjs", color: "FFFFFF" },
  JavaScript: { kind: "cdn", slug: "javascript", color: "F7DF1E" },
  "Tailwind CSS": { kind: "cdn", slug: "tailwindcss", color: "06B6D4" },
  "HTML5 / CSS3": { kind: "cdn", slug: "html5", color: "E34F26" },
  "Framer Motion": { kind: "cdn", slug: "framer", color: "0055FF" },
  "Node.js": { kind: "cdn", slug: "nodedotjs", color: "5FA04E" },
  "Laravel / PHP": { kind: "cdn", slug: "laravel", color: "FF2D20" },
  Java: { kind: "cdn", slug: "openjdk", color: "F89820" },
  Flask: { kind: "cdn", slug: "flask", color: "FFFFFF" },
  MySQL: { kind: "cdn", slug: "mysql", color: "4479A1" },
  Python: { kind: "cdn", slug: "python", color: "3776AB" },
  "TensorFlow / Keras": { kind: "cdn", slug: "tensorflow", color: "FF6F00" },
  "YOLOv8 · CV": {
    kind: "svg",
    color: "00B4D8",
    node: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <path
          d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  "Federated Learning": {
    kind: "svg",
    color: "B794FF",
    node: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
        <circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="4.5" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19.5" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12.5" r="2.2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.18" />
        <path
          d="M12 7.2V10.3M10.3 13.9l-4.2 2.5M13.7 13.9l4.2 2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  "Google Cloud Platform": { kind: "cdn", slug: "googlecloud", color: "4285F4" },
  Firebase: { kind: "cdn", slug: "firebase", color: "FFCA28" },
  Terraform: { kind: "cdn", slug: "terraform", color: "7B42BC" },
  "Kubernetes (GKE)": { kind: "cdn", slug: "kubernetes", color: "326CE5" },
  "Git & GitHub": { kind: "cdn", slug: "github", color: "FFFFFF" },
  Figma: { kind: "cdn", slug: "figma", color: "F24E1E" },
  Vercel: { kind: "cdn", slug: "vercel", color: "FFFFFF" },
};

function SkillIcon({ name, size = 30 }: { name: string; size?: number }) {
  const spec = iconMap[name];
  if (!spec) {
    return (
      <span className="flex h-full w-full items-center justify-center font-mono text-[11px] text-white/70">
        {name.slice(0, 2)}
      </span>
    );
  }
  if (spec.kind === "cdn") {
    return (
      <img
        src={`https://cdn.simpleicons.org/${spec.slug}/${spec.color}`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className="pointer-events-none select-none"
        draggable={false}
      />
    );
  }
  return (
    <span
      className="block"
      style={{ width: size, height: size, color: `#${spec.color}` }}
      aria-hidden
    >
      {spec.node}
    </span>
  );
}

function skillAccentColor(name: string): string {
  const spec = iconMap[name];
  return spec ? `#${spec.color}` : "#ffffff";
}

const shortNameMap: Record<string, string> = {
  "Tailwind CSS": "Tailwind",
  "HTML5 / CSS3": "HTML5",
  "Framer Motion": "Framer",
  "YOLOv8 · CV": "YOLOv8",
  "Laravel / PHP": "Laravel",
};

function skillShortName(name: string): string {
  return shortNameMap[name] ?? name;
}

export default function Skills() {
  return (
    <section
      id="skills"
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
              <GlassPanel focusKey="skills" className="h-full p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between">
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

                <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {items.map((s, i) => {
                    const color = skillAccentColor(s.name);
                    const dur = 3.4 + ((i * 37) % 22) / 10;
                    const delay = ((i * 53) % 30) / 10;
                    return (
                      <li
                        key={s.name}
                        className="skill-tile group/tile relative flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-white/8 bg-white/[0.02] p-2 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.05]"
                        style={
                          {
                            "--skill-color": color,
                            "--float-dur": `${dur}s`,
                            "--float-delay": `${delay}s`,
                          } as React.CSSProperties
                        }
                        title={`${s.name} · ${s.level}`}
                      >
                        <span className="skill-glow" aria-hidden />
                        <span className="relative flex h-7 w-7 items-center justify-center">
                          <SkillIcon name={s.name} size={28} />
                        </span>
                        <span className="relative w-full truncate text-center text-[9.5px] leading-tight text-white/60">
                          {skillShortName(s.name)}
                        </span>

                        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/85 px-2 py-1 font-mono text-[10px] text-white/90 opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover/tile:opacity-100">
                          {s.name}
                        </span>
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
