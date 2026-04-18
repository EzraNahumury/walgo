"use client";

import AITerminal from "./AITerminal";
import Reveal from "./Reveal";
import { SectionHeader } from "./Projects";
import SectionGlyph from "./SectionGlyph";

export default function TerminalSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-10 pt-14">
      <SectionGlyph>01</SectionGlyph>
      <Reveal>
        <SectionHeader
          label="01 — query the identity"
          title="Terminal"
          subtitle="A small language model that reads only this record. No servers, no tracking."
        />
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-12">
          <AITerminal />
        </div>
      </Reveal>
    </section>
  );
}
