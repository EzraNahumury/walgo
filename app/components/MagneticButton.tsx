"use client";

import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
  strength?: number;
};

export default function MagneticButton({
  children,
  variant = "primary",
  strength = 0.25,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const btn = ref.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px)";
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-[transform,background,color,box-shadow] duration-300 ease-out will-change-transform select-none";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:shadow-[0_10px_40px_-10px_rgba(124,92,255,0.8)]"
      : "text-white/85 hover:text-white border border-white/10 bg-white/[0.03] hover:bg-white/[0.06]";

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
