"use client";

import { identity, projects, skills, certificates } from "../data/identity";

export default function Marquee() {
  const tokens = [
    "stored on Walrus",
    `blob · ${identity.chain.blobId}`,
    `${projects.length} projects shipped`,
    `${certificates.length} credentials verified`,
    `${skills.length} competencies`,
    "Bangkit 2024 · top graduate",
    "front-end · cloud · ML",
    "UKDW graduate",
    "Yogyakarta, ID",
    "open to work",
  ];
  const items = [...tokens, ...tokens];

  return (
    <div
      className="relative border-y border-white/6 bg-white/[0.015] py-4"
      aria-hidden
    >
      <div className="marquee">
        <div className="marquee-track font-mono text-[12px] uppercase tracking-[0.22em] text-white/55">
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-1 w-1 rounded-full"
                  style={{
                    background:
                      i % 3 === 0
                        ? "var(--color-accent-hot)"
                        : i % 3 === 1
                          ? "var(--color-accent-2)"
                          : "var(--color-accent)",
                  }}
                />
                {t}
              </span>
              <span className="text-white/15">/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
