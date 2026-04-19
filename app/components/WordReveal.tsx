"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  text: string;
  stagger?: number;
  delay?: number;
};

export default function WordReveal({
  text,
  stagger = 60,
  delay = 0,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
          } else {
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <div
      ref={ref}
      className={`word-reveal ${className}`}
      aria-label={text}
      {...rest}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span
            style={{
              transitionDelay: `${delay + i * stagger}ms`,
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </div>
  );
}
