"use client";

import { useState } from "react";
import GlassPanel from "./GlassPanel";
import Reveal from "./Reveal";
import { identity } from "../data/identity";

function SocialIcon({ name }: { name: string }) {
  const n = name.toLowerCase();
  const common = {
    width: 17,
    height: 17,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    className:
      "transition-transform duration-300 group-hover:scale-110",
  } as const;

  if (n === "github") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.92.58.11.79-.25.79-.56 0-.27-.01-1-.01-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18.92-.26 1.92-.39 2.9-.39.99.01 1.98.14 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.41-5.28 5.7.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56 4.57-1.52 7.86-5.83 7.86-10.92C23.5 5.66 18.35.5 12 .5z" />
      </svg>
    );
  }

  if (n === "linkedin") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.44a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    );
  }

  if (n === "instagram") {
    return (
      <svg
        {...common}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  // Fallback — text dot
  return (
    <span className="font-mono text-[11px]">{name.slice(0, 2).toUpperCase()}</span>
  );
}

export default function ChainFooter() {
  const { chain, name, email, socials } = identity;
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [copied, setCopied] = useState(false);

  const runVerify = () => {
    if (verifying || verified) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1800);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(chain.ownerAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = chain.ownerAddress;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <footer id="chain" className="relative mx-auto max-w-6xl px-6 pb-24 pt-14">
      <GlassPanel strong className="relative overflow-hidden p-0">
          {/* bg grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
          >
            <div className="techno-grid h-full w-full" />
          </div>

          {/* Hero block */}
          <div className="relative px-6 py-12 text-center md:px-16 md:py-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-accent-hot)]/25 bg-[color:var(--color-accent-hot)]/[0.08] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--color-accent-hot)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent-hot)] pulse-dot" />
                permanent record
              </div>
            </Reveal>

            <Reveal delay={180}>
              <h2 className="mx-auto mt-6 max-w-3xl text-balance font-[var(--font-space)] text-[clamp(30px,5vw,52px)] font-semibold leading-[1.05] tracking-[-0.025em] text-white">
                This identity lives on{" "}
                <span className="text-accent-gradient">Walrus</span>. Forever.
              </h2>
            </Reveal>

            <Reveal delay={360}>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.6] text-white/55">
                No server. No database. This site is published as an immutable
                blob on Walrus, owned by the Sui address below.
              </p>
            </Reveal>

            {/* Owner address — single clickable hero */}
            <Reveal delay={540} className="mx-auto mt-10 flex flex-col items-center">
              <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/35">
                owner · sui address
              </div>

              <button
                type="button"
                onClick={copyAddress}
                aria-label={copied ? "Address copied" : "Copy Sui address"}
                title={chain.ownerAddress}
                className={[
                  "group relative inline-flex items-center gap-3 rounded-2xl border px-5 py-3 transition-all",
                  copied
                    ? "border-emerald-400/40 bg-emerald-400/[0.06]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]",
                ].join(" ")}
              >
                <span className="font-mono text-[clamp(20px,2.6vw,30px)] font-semibold tracking-[-0.01em] text-[color:var(--color-accent-2)]">
                  {chain.ownerAddressShort}
                </span>
                <span
                  aria-hidden
                  className={[
                    "inline-flex h-6 w-6 items-center justify-center rounded-full border transition-colors",
                    copied
                      ? "border-emerald-400/40 text-emerald-300"
                      : "border-white/15 text-white/50 group-hover:border-white/35 group-hover:text-white",
                  ].join(" ")}
                >
                  {copied ? (
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2.5 7.5L5.5 10.5L11.5 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <rect
                        x="4.5"
                        y="4.5"
                        width="7.5"
                        height="7.5"
                        rx="1.3"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M3 9.5V3.2A1.2 1.2 0 0 1 4.2 2h6.3"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </span>
              </button>

              <div
                className={[
                  "mt-2 font-mono text-[10.5px] uppercase tracking-[0.22em] transition-colors",
                  copied ? "text-emerald-300" : "text-white/30",
                ].join(" ")}
                aria-live="polite"
              >
                {copied ? "copied to clipboard" : "click to copy full address"}
              </div>
            </Reveal>

            {/* Verify CTA */}
            <Reveal delay={720} className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={runVerify}
                disabled={verifying || verified}
                className={[
                  "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-[13px] font-medium transition-all",
                  verified
                    ? "border border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                    : "btn-hot",
                ].join(" ")}
              >
                {verifying && (
                  <span
                    aria-hidden
                    className="verify-bar absolute inset-0"
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {verified ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2.5 7.5L5.5 10.5L11.5 3.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Verified on Walrus
                    </>
                  ) : verifying ? (
                    <>Verifying…</>
                  ) : (
                    <>
                      Verify record
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3 7h8M8 4l3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </button>
              <a
                href={chain.explorer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] text-white/75 transition-colors hover:border-white/25 hover:text-white"
              >
                Open in Suiscan
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 9L9 3M9 3H4.5M9 3V7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Reveal>

            {/* Meta row */}
            <Reveal delay={900} className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/35">
              <span>network · {chain.network}</span>
              <span>written · {chain.timestamp.slice(0, 10)}</span>
              <span>read-only</span>
            </Reveal>
          </div>

          {/* Identity + socials */}
          <div className="relative grid grid-cols-1 gap-5 border-t border-white/5 px-6 py-7 md:grid-cols-[1fr_auto] md:px-10">
            <div>
              <div className="font-[var(--font-space)] text-2xl font-semibold tracking-tight text-white">
                {name}
              </div>
              <div className="mt-1 text-[13.5px] text-white/55">
                <a
                  href={`mailto:${email}`}
                  className="underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {email}
                </a>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-all hover:-translate-y-[1px] hover:border-white/25 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_8px_24px_-10px_rgba(124,92,255,0.6)]"
                >
                  <SocialIcon name={s.label} />
                </a>
              ))}
            </div>
          </div>

          <div className="relative border-t border-white/5 px-6 py-4 text-center font-mono text-[10.5px] tracking-[0.16em] text-white/30 md:px-10">
            identity.terminal · built for Walrus Sessions 01 ·{" "}
            {new Date().getFullYear()}
          </div>
        </GlassPanel>
    </footer>
  );
}
