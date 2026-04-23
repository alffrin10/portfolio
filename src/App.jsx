import { useState, useCallback, Suspense, lazy } from 'react';
import { useTheme } from './hooks/useTheme';
import { PortfolioProvider } from './context/PortfolioContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import './styles/index.css';

import Navbar            from './components/Layout/Navbar';
import Footer            from './components/Layout/Footer';
import ScrollProgress    from './components/Layout/ScrollProgress';
import CurrentlyBuilding from './components/Layout/CurrentlyBuilding';
import Hero              from './components/Hero/Hero';

import About             from './components/About/About';
import Skills            from './components/Skills/Skills';
import Experience        from './components/Experience/Experience';
import Projects          from './components/Projects/Projects';
import Contact           from './components/Contact/Contact';
import CustomCursor      from './components/Effects/CustomCursor';
import ResumeModal       from './components/common/ResumeModal';

const VoidCanvas = lazy(() => import('./components/Effects/VoidCanvas'));
const LuminusCanvas = lazy(() => import('./components/Effects/LuminusCanvas'));

export default function App() {
  const { theme, toggle } = useTheme();

  const [resumeOpen, setResumeOpen] = useState(false);

  const goSec = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const openResume  = useCallback(() => setResumeOpen(true),  []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  return (
    <PortfolioProvider>
      <ScrollProgress />
      <div className="warp-flash" aria-hidden="true" />
      <CustomCursor />

      {/* ── Noise overlay for Void texture (VOID 2) ── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Theme backgrounds ── */}
      <Suspense fallback={<div className="bg-canvas" />}>
        {theme === 'void' ? <VoidCanvas /> : <LuminusCanvas />}
      </Suspense>

      <div className="scan-overlay"    aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />

      {/* ── Navbar (full-width, hamburger on mobile) ── */}
      <Navbar theme={theme} onToggleTheme={toggle} goSec={goSec} />

      {/* ── Currently Building ticker (FEATURE 3) ── */}
      <CurrentlyBuilding theme={theme} />

      <a href="#hero" className="skip-link">Skip to content</a>

      {/* ── Main site content ── */}
      <div className="site-root">
        <main>
          {/* Hero — no wrap, fills viewport */}
          <Hero
            theme={theme}
            goSec={goSec}
            onResumeClick={openResume}
          />

          {/* All other sections */}
          <div className={theme === 'void' ? 'void-wrap' : 'wrap'}>
            <About theme={theme} />
            <ErrorBoundary>
              <Skills theme={theme} />
            </ErrorBoundary>
            <Experience theme={theme} />
            <ErrorBoundary>
              <Projects theme={theme} />
            </ErrorBoundary>
            <Contact theme={theme} />
          </div>
        </main>
        <Footer theme={theme} />
      </div>

      {/* ── Resume PDF Modal (FEATURE 7) ── */}
      {resumeOpen && <ResumeModal onClose={closeResume} />}
    </PortfolioProvider>
  );
}

