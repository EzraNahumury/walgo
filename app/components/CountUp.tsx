"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export default function CountUp({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  className = "",
}: Props) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (rafRef.current !== null)
              cancelAnimationFrame(rafRef.current);
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(to * eased));
              if (p < 1) rafRef.current = requestAnimationFrame(tick);
              else rafRef.current = null;
            };
            rafRef.current = requestAnimationFrame(tick);
          } else {
            if (rafRef.current !== null) {
              cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
            }
            setValue(0);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
