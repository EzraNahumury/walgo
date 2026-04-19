"use client";

import { useEffect, useRef, useState } from "react";
import GlassPanel from "./GlassPanel";
import { answer, suggestions, type Answer } from "../data/knowledge";
import { useFocus } from "../lib/focus";

type LogEntry =
  | { kind: "user"; text: string }
  | { kind: "system"; text: string }
  | { kind: "assistant"; lines: string[]; typed: string[] };

const initialLog: LogEntry[] = [
  {
    kind: "system",
    text: "identity.terminal · v1.0 · read-only · stream established",
  },
];

export default function AITerminal() {
  const [query, setQuery] = useState("");
  const [log, setLog] = useState<LogEntry[]>(initialLog);
  const [busy, setBusy] = useState(false);
  const { setFocus } = useFocus();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutsRef = useRef<number[]>([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);

  const scrollBottom = () => {
    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });
  };

  useEffect(() => {
    scrollBottom();
  }, [log]);

  const schedule = (fn: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      if (!mountedRef.current) return;
      fn();
    }, delay);
    timeoutsRef.current.push(id);
  };

  const typeOut = (ans: Answer) => {
    const entry: LogEntry = {
      kind: "assistant",
      lines: ans.lines,
      typed: ans.lines.map(() => ""),
    };
    setLog((l) => [...l, entry]);

    let lineIdx = 0;
    let charIdx = 0;

    const tick = () => {
      setLog((l) => {
        const copy = l.slice();
        const last = copy[copy.length - 1];
        if (!last || last.kind !== "assistant") return l;
        const current = ans.lines[lineIdx];
        if (current === undefined) return copy;
        const typed = last.typed.slice();
        typed[lineIdx] = current.slice(0, charIdx + 1);
        copy[copy.length - 1] = { ...last, typed };
        return copy;
      });

      charIdx++;
      const line = ans.lines[lineIdx];
      if (line !== undefined && charIdx >= line.length) {
        lineIdx++;
        charIdx = 0;
      }

      if (lineIdx < ans.lines.length) {
        const delay =
          ans.lines[lineIdx]?.length && charIdx === 0
            ? 90
            : 7 + Math.random() * 12;
        schedule(tick, delay);
      } else {
        setBusy(false);
        scrollBottom();
      }
    };

    schedule(tick, 260);
  };

  const clear = () => {
    if (busy) return;
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
    setLog(initialLog);
    setQuery("");
    inputRef.current?.focus();
  };

  const submit = (value?: string) => {
    const q = (value ?? query).trim();
    if (!q || busy) return;
    setQuery("");
    setBusy(true);
    const ans = answer(q);
    setFocus(ans.focus);
    setLog((l) => [...l, { kind: "user", text: q }]);
    schedule(() => typeOut(ans), 120);
  };

  return (
    <GlassPanel
      strong
      className="relative overflow-hidden p-0"
      id="terminal"
      data-cursor="interactive"
    >
      {busy && <div className="scan-line" aria-hidden />}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
      >
        <div className="techno-grid h-full w-full" />
      </div>

      {/* Header — minimalist, no traffic lights */}
      <div className="relative flex items-center justify-between border-b border-white/5 px-5 py-3">
        <div className="flex items-center gap-3">
          <span
            className={[
              "inline-flex h-1.5 w-1.5 rounded-full transition-colors",
              busy
                ? "bg-amber-300 pulse-dot"
                : "bg-emerald-400 pulse-dot",
            ].join(" ")}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/75">
            identity.terminal
          </span>
          <span className="hidden font-mono text-[11px] text-white/25 sm:inline">
            /
          </span>
          <span className="hidden font-mono text-[11px] text-white/40 sm:inline">
            ask.anything
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <button
            type="button"
            onClick={clear}
            disabled={busy || log.length <= 1}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-white/55 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-white/[0.03] disabled:hover:text-white/55"
            aria-label="Clear terminal"
            title="Clear terminal"
          >
            <svg viewBox="0 0 12 12" width="9" height="9" fill="none" aria-hidden>
              <path
                d="M2.5 2.5l7 7M9.5 2.5l-7 7"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            clear
          </button>
          <span className="hidden text-white/30 sm:inline">TCP · 443</span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span className={busy ? "text-amber-300" : "text-emerald-400"}>
            {busy ? "thinking…" : "ready"}
          </span>
        </div>
      </div>

      {/* Log */}
      <div
        ref={listRef}
        className="relative h-[340px] overflow-y-auto px-5 py-5 font-mono text-[13px] leading-relaxed"
      >
        {log.map((entry, i) => {
          if (entry.kind === "system") {
            return (
              <div key={i} className="text-white/35">
                <span className="mr-1 text-white/25">◇</span>
                {entry.text}
              </div>
            );
          }
          if (entry.kind === "user") {
            return (
              <div key={i} className="mt-3 flex items-baseline gap-2 text-white">
                <span className="text-[color:var(--color-accent-2)]">›</span>
                <span>{entry.text}</span>
              </div>
            );
          }
          return (
            <div key={i} className="mt-2 space-y-0.5 text-white/80">
              {entry.typed.map((t, j) => (
                <div key={j} className="flex items-start gap-2">
                  <span className="mt-[6px] inline-block h-1 w-1 shrink-0 rounded-full bg-white/20" />
                  <span
                    className={
                      j === entry.typed.length - 1 && busy ? "caret" : ""
                    }
                  >
                    {t}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Suggestions */}
      <div className="relative flex flex-wrap gap-2 border-t border-white/5 px-5 py-3">
        <span className="mr-1 self-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
          try
        </span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => submit(s)}
            disabled={busy}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[12px] text-white/70 transition-all hover:-translate-y-[1px] hover:border-white/25 hover:bg-white/[0.06] hover:text-white disabled:opacity-40"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        className="relative flex items-center gap-2 border-t border-white/10 bg-black/35 px-5 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <span className="font-mono text-sm text-[color:var(--color-accent-2)]">
          ›
        </span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about this identity…"
          className="flex-1 bg-transparent font-mono text-sm text-white placeholder:text-white/30 focus:outline-none"
          autoComplete="off"
          spellCheck={false}
          disabled={busy}
        />
        <kbd className="hidden rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/45 md:inline">
          Enter
        </kbd>
        <button
          type="submit"
          disabled={busy || !query.trim()}
          className="rounded-full bg-white px-3 py-1 text-[12px] font-medium text-black transition-all disabled:bg-white/15 disabled:text-white/35"
        >
          Send
        </button>
      </form>
    </GlassPanel>
  );
}
