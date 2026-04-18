"use client";

import { useEffect, useRef } from "react";
import GlassPanel from "./GlassPanel";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import Scramble from "./Scramble";
import WordReveal from "./WordReveal";
import {
  identity,
  projects,
  skills,
  certificates,
} from "../data/identity";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, y / (vh * 0.9)));
      el.style.setProperty("--hero-y", `${-p * 40}px`);
      el.style.setProperty("--hero-s", `${1 - p * 0.05}`);
      el.style.setProperty("--hero-o", `${1 - p * 0.85}`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="identity"
      ref={heroRef}
      className="hero-parallax relative mx-auto grid min-h-[96vh] max-w-6xl grid-cols-1 items-center gap-10 px-6 pt-28 pb-16 md:pt-32 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16"
    >
      {/* Left column */}
      <div className="relative">
        <Reveal>
          <GlassPanel
            focusKey="identity"
            className="mb-9 inline-flex items-center gap-3 px-4 py-2"
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/75">
              live · Walrus identity · stream open
            </span>
          </GlassPanel>
        </Reveal>

        <h1 className="text-balance font-[var(--font-space)] text-[clamp(44px,7vw,80px)] font-semibold leading-[1.02] tracking-[-0.03em] text-gradient">
          <Scramble text={identity.name} speed={45} lockDelay={10} />
          <span>.</span>
        </h1>

        <h2 className="mt-5 font-[var(--font-space)] text-[clamp(20px,2.5vw,30px)] font-medium leading-tight tracking-[-0.015em]">
          <WordReveal
            text="Front-end engineer, built on the cloud."
            delay={1500}
            stagger={80}
            className="text-white/82"
          />
        </h2>

        <Reveal delay={1900}>
          <p className="mt-7 max-w-xl text-pretty text-[17px] leading-[1.6] text-white/60">
            {identity.bio}
          </p>
        </Reveal>

        <Reveal delay={2100}>
          <div className="mt-10 grid max-w-xl grid-cols-4 divide-x divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025]">
            <Vital value={projects.length} label="Shipped" />
            <Vital value={certificates.length} label="Credentials" accent />
            <Vital value={skills.length} label="Signals" />
            <Vital value={1} label="On-chain" hot />
          </div>
        </Reveal>

        <Reveal delay={2300}>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <MagneticButton
              onClick={() => {
                document
                  .getElementById("terminal")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-hot"
            >
              Ask the terminal
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M8 4l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Browse work
            </MagneticButton>
            <span className="ml-1 flex items-center gap-1.5 font-mono text-[11px] text-white/35">
              <span className="kbd">⌘</span>
              <span className="kbd">K</span>
              <span>to query</span>
            </span>
          </div>
        </Reveal>
      </div>

      {/* Right column — identity card */}
      <Reveal delay={700}>
        <GlassPanel
          strong
          focusKey="identity"
          className="relative overflow-hidden p-0"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.2]"
          >
            <div className="techno-grid h-full w-full" />
          </div>

          <div className="relative flex items-center justify-between border-b border-white/5 px-5 py-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/60">
              identity.card
            </span>
            <span className="font-mono text-[10.5px] text-white/35">v1.0</span>
          </div>

          <div className="relative flex items-center justify-center py-8">
            <div className="relative h-36 w-36">
              {/* Outer spinning ring */}
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border border-white/12" />
              {/* Inner ring */}
              <div className="absolute inset-[6px] rounded-full border border-white/6" />
              {/* Soft glow behind */}
              <div
                aria-hidden
                className="absolute -inset-3 -z-10 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124,92,255,0.35), rgba(49,208,255,0.15) 55%, transparent 75%)",
                }}
              />
              {/* Photo medallion */}
              <div
                className="absolute inset-[14px] overflow-hidden rounded-full border border-white/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)_inset]"
                style={{
                  background:
                    "linear-gradient(180deg, #1a1a24 0%, #0a0a10 100%)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/image.png"
                  alt="Ezra Kristanto Nahumury"
                  className="h-full w-full object-cover object-[center_18%]"
                  style={{
                    filter:
                      "brightness(1.12) contrast(1.12) saturate(1.08)",
                  }}
                  loading="eager"
                  draggable={false}
                />
                {/* Subtle top-light highlight */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% -20%, rgba(255,255,255,0.18), transparent 55%)",
                  }}
                />
              </div>
              {/* Online dot */}
              <span
                aria-hidden
                className="absolute bottom-2 right-2 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[color:var(--color-bg-elevated)] bg-emerald-400 pulse-dot shadow-[0_0_10px_rgba(52,211,153,0.6)]"
              />
            </div>
          </div>

          <dl className="relative grid grid-cols-[90px_1fr] gap-x-4 gap-y-3 border-t border-white/5 px-5 py-5 font-mono text-[12px]">
            <Row k="handle" v={identity.handle} accent />
            <Row k="role" v="Front-End Dev" />
            <Row k="loc" v={identity.location} />
            <Row k="status" v="Open to work" ok />
            <Row k="motto" v={`"${identity.motto}"`} quiet />
          </dl>

          <div className="relative border-t border-white/5 px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/35">
            → stored permanently on Walrus
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}

function Vital({
  value,
  label,
  accent,
  hot,
}: {
  value: number;
  label: string;
  accent?: boolean;
  hot?: boolean;
}) {
  return (
    <div className="px-3 py-4 text-center md:py-5">
      <div
        className={[
          "font-[var(--font-space)] text-[clamp(22px,3vw,32px)] font-semibold tabular-nums leading-none",
          hot
            ? "text-[color:var(--color-accent-hot)]"
            : accent
              ? "text-[color:var(--color-accent-2)]"
              : "text-white",
        ].join(" ")}
      >
        <CountUp to={value} />
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
        {label}
      </div>
    </div>
  );
}

function Row({
  k,
  v,
  accent,
  ok,
  quiet,
}: {
  k: string;
  v: string;
  accent?: boolean;
  ok?: boolean;
  quiet?: boolean;
}) {
  return (
    <>
      <dt className="text-[10px] uppercase tracking-[0.2em] text-white/35">
        {k}
      </dt>
      <dd
        className={[
          "truncate",
          accent
            ? "text-[color:var(--color-accent-2)]"
            : ok
              ? "text-emerald-300"
              : quiet
                ? "italic text-white/55"
                : "text-white/85",
        ].join(" ")}
      >
        {ok && (
          <span className="mr-1.5 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-emerald-400 pulse-dot" />
        )}
        {v}
      </dd>
    </>
  );
}
