import { useEffect } from 'react';
import { About } from './components/About';
import { BeyondSoftware } from './components/BeyondSoftware';
import { Contact } from './components/Contact';
import { Elsewhere } from './components/Elsewhere';
import { FocusRoom } from './components/FocusRoom';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { SelectedWork } from './components/SelectedWork';
import { Stack } from './components/Stack';
import { Writing } from './components/Writing';
import { initReveal } from './utils/reveal';

export default function App() {
  useEffect(() => initReveal(), []);

  return (
    <div className="min-h-screen bg-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-ink"
      >
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero />
        <SelectedWork />
        <About />
        <Stack />
        <FocusRoom />
        <Writing />
        <Elsewhere />
        <BeyondSoftware />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
