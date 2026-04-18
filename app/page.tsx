import { FocusProvider } from "./lib/focus";
import CustomCursor from "./components/CustomCursor";
import SceneLoader from "./components/SceneLoader";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import CommandHint from "./components/CommandHint";
import BootPreloader from "./components/BootPreloader";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import TerminalSection from "./components/TerminalSection";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Experience from "./components/Experience";
import ChainFooter from "./components/ChainFooter";

export default function Home() {
  return (
    <FocusProvider>
      <BootPreloader />
      <div className="relative isolate">
        <SceneLoader />
        <div
          className="pointer-events-none fixed inset-0 -z-[1] bg-grid"
          aria-hidden
        />
        <div className="noise" aria-hidden />

        <ScrollProgress />
        <CustomCursor />
        <CommandHint />
        <Navigation />

        <main className="relative z-10">
          <Hero />
          <Marquee />
          <TerminalSection />
          <Projects />
          <Skills />
          <Certificates />
          <Experience />
          <ChainFooter />
        </main>
      </div>
    </FocusProvider>
  );
}
