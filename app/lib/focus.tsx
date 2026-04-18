"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Focus } from "../data/knowledge";

type FocusState = {
  focus: Focus;
  setFocus: (f: Focus) => void;
};

const FocusContext = createContext<FocusState | null>(null);

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [focus, setFocus] = useState<Focus>(null);
  const value = useMemo(() => ({ focus, setFocus }), [focus]);
  return (
    <FocusContext.Provider value={value}>{children}</FocusContext.Provider>
  );
}

export function useFocus() {
  const ctx = useContext(FocusContext);
  if (!ctx) throw new Error("useFocus must be used inside FocusProvider");
  return ctx;
}
