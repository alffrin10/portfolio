import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useInView } from '../../hooks/useInView';
import Neofetch from './Neofetch';
import { usePortfolio } from '../../context/PortfolioContext';

/* ─────────────────────────────────────────
   VOID HERO v2 — Text BLENDS into image
   - No glassmorphism panel
   - Full-viewport BH with CSS float anim
   - Text pinned bottom-left over gradient
───────────────────────────────────────── */
function VoidHero({ goSec, onResumeClick }) {
  const data = usePortfolio();
  const meta = data.meta;
  const [typed, setTyped]           = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = meta.tagline || meta.role;

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= fullText.length) { setTyped(fullText.slice(0, i)); i++; }
      else { clearInterval(t); setTimeout(() => setShowCursor(false), 1800); }
    }, 58);
    return () => clearInterval(t);
  }, [fullText]);

  return (
    <section id="hero" aria-label="Introduction" className="void-hero-section">
      {/* ── Fullscreen background video ── */}
      <video
        className="void-bg-video"
        src="/assets/black_hole.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      {/* ── Bottom fade so text is readable ── */}
      <div className="void-video-fade" aria-hidden="true" />

      {/* ── Text: bottom-left, no panel ── */}
      <div className="void-hero-content">
        <div className="void-hero-text-block">
          <p className="void-eyebrow-label">
            <span className="void-eyebrow-dot" aria-hidden="true" />
            Robotics Engineer · Kerala, India
          </p>

          <h1 className="void-name">
            <span className="void-name-first">Alffrin</span>
            <span className="void-name-last">&nbsp;Regi</span>
          </h1>

          <p className="void-tagline">
            <span aria-label={fullText}>{typed}</span>
            {showCursor && <span className="tw-cursor" aria-hidden="true">|</span>}
          </p>

          <div className="void-btns">
            <button className="btn btn-p void-btn" onClick={() => goSec('projects')}>
              View Projects
            </button>
            <button className="btn btn-s void-btn" onClick={() => goSec('contact')}>
              Get in Touch
            </button>
            <button className="btn btn-gh void-btn" onClick={() => window.open('https://github.com/alffrin10', '_blank')}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ flexShrink: 0 }}><path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"></path></svg>
              GitHub ↗
            </button>
            <button className="btn btn-r void-btn" onClick={onResumeClick}>
              Resume ↗
            </button>
          </div>
        </div>

        {/* Scroll cue — bottom right */}
        <div className="void-scroll-cue" aria-hidden="true">
          <div className="void-scroll-line" />
          <span className="void-scroll-txt">scroll</span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   LUMINUS HERO — Two-column + neofetch
───────────────────────────────────────── */
function LuminusHero({ theme, goSec, onResumeClick }) {
  const data = usePortfolio();
  const meta = data.meta;
  const [typed, setTyped]           = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [leftRef,  leftInView]  = useInView();
  const [rightRef, rightInView] = useInView();

  useEffect(() => {
    const roleText = meta.role;
    let i = 0;
    const t = setInterval(() => {
      if (i <= roleText.length) { setTyped(roleText.slice(0, i)); i++; }
      else { clearInterval(t); setTimeout(() => setShowCursor(false), 1800); }
    }, 65);
    return () => clearInterval(t);
  }, [meta.role]);

  return (
    <section id="hero" aria-label="Introduction">
      <div className="wrap luminus-hero-wrap">
        <div className="hero-grid">
          <div className={`fadeL${leftInView ? ' in' : ''}`} ref={leftRef}>
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-bar" />
              <span className="hero-eyebrow-txt">whoami</span>
            </div>
            <h1 className="hero-name">
              <span className="first">Alffrin</span>
              <span className="last">Regi</span>
            </h1>
            <p className="hero-role">
              <span className="live-dot" aria-hidden="true" />
              <span aria-label={meta.role}>{typed}</span>
              {showCursor && <span className="tw-cursor" aria-hidden="true">|</span>}
            </p>
            <p className="hero-sub">{meta.tagline}</p>
            <div className="hero-btns">
              <button className="btn btn-p" onClick={() => goSec('projects')}>⬡ View Projects</button>
              <button className="btn btn-s" onClick={() => goSec('contact')}>◈ Get in Touch</button>
              <button className="btn btn-gh" onClick={() => window.open('https://github.com/alffrin10', '_blank')}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ flexShrink: 0 }}><path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"></path></svg>
                GitHub
              </button>
              <button className="btn btn-r" onClick={onResumeClick}>📄 View Resume</button>
            </div>
          </div>

          <div
            className={`fadeR${rightInView ? ' in' : ''}`}
            ref={rightRef}
            style={{ transitionDelay: '.18s' }}
          >
            <Neofetch data={data} theme={theme} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero({ theme, goSec, onResumeClick }) {
  if (theme === 'void') {
    return <VoidHero goSec={goSec} onResumeClick={onResumeClick} />;
  }
  return <LuminusHero theme={theme} goSec={goSec} onResumeClick={onResumeClick} />;
}

Hero.propTypes = {
  theme: PropTypes.string.isRequired,
  goSec: PropTypes.func.isRequired,
  onResumeClick: PropTypes.func.isRequired
};

