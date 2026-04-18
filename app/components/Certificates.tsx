"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { certificates } from "../data/identity";
import { SectionHeader } from "./Projects";
import SectionGlyph from "./SectionGlyph";

type IssuerLogoSpec = { src: string; scale?: number };

const issuerLogoMap: Record<string, IssuerLogoSpec> = {
  "Google Cloud": { src: "/issuers/google-cloud.png" },
  Dicoding: { src: "/issuers/dicoding.png" },
  "Oracle Academy": { src: "/issuers/oracle.png" },
  Cisco: { src: "/issuers/cisco.png", scale: 1.45 },
  "Google · Tokopedia · Gojek · Traveloka": { src: "/issuers/bangkit.png" },
  Certiport: { src: "/issuers/certiport.png" },
  "Indonesian Survey Institute": { src: "/issuers/isi.png" },
};

function IssuerLogo({
  issuer,
  size = 48,
  rounded = "rounded-xl",
}: {
  issuer: string;
  size?: number;
  rounded?: string;
}) {
  const spec = issuerLogoMap[issuer];
  if (!spec) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center border border-white/10 bg-white/[0.04] font-mono text-[12px] text-white/70 ${rounded}`}
        style={{ width: size, height: size }}
      >
        {issuer.slice(0, 2)}
      </span>
    );
  }
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-white ring-1 ring-white/10 ${rounded}`}
      style={{ width: size, height: size }}
    >
      <img
        src={spec.src}
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none h-full w-full select-none object-cover"
        style={spec.scale ? { transform: `scale(${spec.scale})` } : undefined}
        draggable={false}
      />
    </span>
  );
}

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

  const [openIssuer, setOpenIssuer] = useState<string | null>(null);
  const selected = grouped.find((g) => g.issuer === openIssuer) ?? null;

  useEffect(() => {
    if (!openIssuer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIssuer(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIssuer]);

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
            subtitle="Tap any issuer to reveal the individual certificates."
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

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {grouped.map((g, gi) => {
          const hasFeatured = g.items.some((c) => c.highlight);
          return (
            <Reveal key={g.issuer} delay={Math.min(gi, 6) * 60}>
              <button
                type="button"
                onClick={() => setOpenIssuer(g.issuer)}
                className="group/tile relative flex h-full w-full flex-col items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05] focus:outline-none focus-visible:border-[color:var(--color-accent-hot)]/60"
                aria-label={`Open ${g.issuer} certificates`}
              >
                <span className="absolute right-2.5 top-2.5 font-mono text-[10px] tabular-nums text-white/35">
                  ×{g.items.length}
                </span>
                {hasFeatured && (
                  <span
                    className="absolute left-2.5 top-2.5 text-[10px] text-[color:var(--color-accent-hot)]"
                    aria-hidden
                  >
                    ★
                  </span>
                )}
                <IssuerLogo issuer={g.issuer} size={56} rounded="rounded-xl" />
                <span className="line-clamp-2 text-[11.5px] leading-tight text-white/75 transition-colors group-hover/tile:text-white">
                  {g.issuer}
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-10 backdrop-blur-md"
          onClick={() => setOpenIssuer(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.issuer} certificates`}
        >
          <div
            className={[
              "relative flex max-h-[min(70vh,640px)] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0d]/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]",
              selected.items.length >= 10
                ? "max-w-3xl"
                : selected.items.length >= 5
                  ? "max-w-xl"
                  : "max-w-md",
            ].join(" ")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
              <IssuerLogo issuer={selected.issuer} size={32} rounded="rounded-md" />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[14px] font-medium leading-tight text-white">
                  {selected.issuer}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                  {selected.items.length} credential
                  {selected.items.length === 1 ? "" : "s"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpenIssuer(null)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <svg viewBox="0 0 16 16" width="11" height="11" fill="none">
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <ul
              className={[
                "flex-1 overflow-auto px-4 py-3 sm:px-5",
                selected.items.length >= 10
                  ? "grid grid-cols-1 gap-x-6 sm:grid-cols-2"
                  : "",
              ].join(" ")}
            >
              {selected.items.map((c, i) => (
                <li
                  key={`${c.title}-${i}`}
                  className="flex items-baseline gap-2 border-b border-white/5 py-2 last:border-b-0"
                >
                  <span className="min-w-0 flex-1 text-[12.5px] leading-snug text-white/85">
                    {c.highlight && (
                      <span className="mr-1 text-[color:var(--color-accent-hot)]">
                        ★
                      </span>
                    )}
                    {c.title}
                  </span>
                  <span
                    aria-hidden
                    className="hidden min-w-4 flex-1 border-b border-dotted border-white/10 sm:block"
                  />
                  <span className="shrink-0 font-mono text-[10px] tabular-nums text-white/35">
                    {c.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
