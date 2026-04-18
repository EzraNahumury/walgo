"use client";

import {
  createElement,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: keyof HTMLElementTagNameMap;
  delay?: number;
  children: ReactNode;
};

export default function CurtainText({
  as = "div",
  delay = 0,
  className = "",
  children,
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `curtain ${className}`,
      style: { transitionDelay: `${delay}ms`, ...style },
      ...rest,
    },
    children
  );
}
