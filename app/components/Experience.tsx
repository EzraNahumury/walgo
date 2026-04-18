"use client";

import GlassPanel from "./GlassPanel";
import Reveal from "./Reveal";
import { experience } from "../data/identity";
import { SectionHeader } from "./Projects";
import SectionGlyph from "./SectionGlyph";

type IconKey = "star" | "org" | "edu";

function inferIcon(org: string, role: string): IconKey {
  const s = (org + " " + role).toLowerCase();
  if (s.includes("top graduate") || s.includes("bangkit")) return "star";
  if (s.includes("university") || s.includes("ukdw") || s.includes("b.sc"))
    return "edu";
  return "org";
}

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionGlyph>05</SectionGlyph>
      <Reveal>
        <SectionHeader
          label="05 — trajectory"
          title="Experience"
          subtitle="Each stop shipped something measurable."
        />
      </Reveal>

      <Reveal delay={120}>
        <GlassPanel focusKey="experience" className="mt-12 p-0">
          <div className="relative px-6 py-6 md:px-10 md:py-8">
            <div className="spine" aria-hidden />
            <ol className="space-y-2">
              {experience.map((e, i) => {
                const icon = inferIcon(e.org, e.role);
                return (
                  <li
                    key={i}
                    className="group relative grid grid-cols-1 gap-2 rounded-xl px-4 py-5 pl-14 transition-colors hover:bg-white/[0.02] md:grid-cols-[160px_1fr_72px] md:gap-8"
                  >
                    <span className="spine-node" style={{ top: "38px" }} />

                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
                      <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-[color:var(--color-accent-2)]">
                        <Icon kind={icon} />
                      </span>
                      <span>{e.period}</span>
                    </div>
                    <div>
                      <h3 className="text-[19px] font-medium leading-snug tracking-tight text-white md:text-[21px]">
                        {e.role}
                      </h3>
                      <div className="mt-1 text-[13.5px] text-white/50">
                        {e.org}
                      </div>
                      <p className="mt-3 max-w-2xl text-[14.5px] leading-[1.6] text-white/65">
                        {e.summary}
                      </p>
                    </div>
                    <div className="hidden items-start justify-end md:flex">
                      <span className="mt-1 inline-flex h-7 items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 font-mono text-[10.5px] text-white/55">
                        {icon === "star"
                          ? "honors"
                          : icon === "edu"
                            ? "education"
                            : "organization"}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}

function Icon({ kind }: { kind: IconKey }) {
  if (kind === "star") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1.5l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11.5l-3.9 2.1.8-4.4L1.7 6.1l4.4-.6L8 1.5z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
          fill="rgba(49,208,255,0.2)"
        />
      </svg>
    );
  }
  if (kind === "edu") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M1.5 6L8 3l6.5 3L8 9 1.5 6z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M4 7.5v3c0 .8 1.8 1.5 4 1.5s4-.7 4-1.5v-3"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 4h10v9H3V4z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M6 7h1M9 7h1M6 10h1M9 10h1"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
