"use client";

export default function Marquee() {
  const token = "SUI";
  const count = 40;

  return (
    <div
      className="relative border-y border-white/6 bg-[color:var(--color-accent-2)]/[0.04] py-4"
      aria-hidden
    >
      <div className="marquee">
        <div className="marquee-track font-[var(--font-space)] text-[18px] font-bold uppercase tracking-[0.32em] text-[color:var(--color-accent-2)]">
          {Array.from({ length: count * 2 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-6"
              style={{
                textShadow: "0 0 18px rgba(49, 208, 255, 0.45)",
              }}
            >
              <span>{token}</span>
              <span className="text-[color:var(--color-accent-2)]/50">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
