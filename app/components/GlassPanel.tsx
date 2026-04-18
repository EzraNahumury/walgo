"use client";

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from "react";
import { useFocus } from "../lib/focus";
import type { Focus } from "../data/knowledge";

type Props = HTMLAttributes<HTMLDivElement> & {
  strong?: boolean;
  focusKey?: Focus;
};

const GlassPanel = forwardRef<HTMLDivElement, Props>(function GlassPanel(
  { strong, focusKey, className = "", children, ...rest },
  ref
) {
  const { focus } = useFocus();
  const isHighlighted = focusKey !== undefined && focus === focusKey;
  const [rippleKey, setRippleKey] = useState(0);
  const prevFocusedRef = useRef(false);

  useEffect(() => {
    if (isHighlighted && !prevFocusedRef.current) {
      setRippleKey((k) => k + 1);
    }
    prevFocusedRef.current = isHighlighted;
  }, [isHighlighted]);

  return (
    <div
      ref={ref}
      className={[
        strong ? "glass-strong" : "glass",
        "relative rounded-2xl transition-all duration-500 ease-out",
        isHighlighted
          ? "ring-1 ring-[rgba(124,92,255,0.55)] shadow-[0_0_0_1px_rgba(124,92,255,0.4),0_30px_80px_-30px_rgba(124,92,255,0.55)]"
          : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {rippleKey > 0 && (
        <span
          key={rippleKey}
          aria-hidden
          className="focus-ripple"
        />
      )}
      {children}
    </div>
  );
});

export default GlassPanel;
