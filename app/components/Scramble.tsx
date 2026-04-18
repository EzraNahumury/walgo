"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz0123456789@#$%&*+=<>/\\?!";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  speed?: number; // ms per frame
  lockDelay?: number; // frames each char stays scrambled
};

function initialScramble(text: string) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    out += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }
  return out;
}

export default function Scramble({
  text,
  className,
  delay = 0,
  speed = 42,
  lockDelay = 10,
}: Props) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    setDisplay(initialScramble(text));
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || startedRef.current) return;
          startedRef.current = true;
          setTimeout(() => {
            let frame = 0;
            const total = text.length + lockDelay + 4;
            const tick = () => {
              let out = "";
              for (let i = 0; i < text.length; i++) {
                if (text[i] === " ") {
                  out += " ";
                  continue;
                }
                if (i < frame - lockDelay) {
                  out += text[i];
                } else {
                  out +=
                    GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                }
              }
              setDisplay(out);
              frame++;
              if (frame < total) setTimeout(tick, speed);
              else setDisplay(text);
            };
            tick();
          }, delay);
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, delay, speed, lockDelay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
