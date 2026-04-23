import { useInView } from '../../hooks/useInView';
import SectionHeader from '../common/SectionHeader';
import { usePortfolio } from '../../context/PortfolioContext';

/* ─────────────  VOID  ─────────────────────────────────────────
   Open typography layout — no card boxes, no grid.
   Bio as a large quotation-style paragraph, education as a
   single info line at the bottom. Glassmorphism left accent.
──────────────────────────────────────────────────────────────── */
function VoidAbout() {
  const data = usePortfolio();
  const edu  = data.education;
  const meta = data.meta;
  const [ref, inView] = useInView();

  return (
    <section id="about" aria-label="About" className="void-section">
      <SectionHeader number="01" title="About" />
      <div className={`void-about fade${inView ? ' in' : ''}`} ref={ref}>
        <p className="void-bio">{meta.description}</p>
        <div className="void-edu-line">
          <span className="ved-label">education</span>
          <span className="ved-sep">·</span>
          <span className="ved-val">{edu.university}</span>
          <span className="ved-sep">·</span>
          <span className="ved-val">{edu.degree} — {edu.field}</span>
          <span className="ved-sep">·</span>
          <span className="ved-loc">{edu.location}</span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────  LUMINUS  ──────────────────────────────────── */
function LuminusAbout() {
  const data = usePortfolio();
  const meta = data.meta;
  const edu  = data.education;
  const [cardRef, cardIn] = useInView();
  const [eduRef, eduIn]   = useInView();

  return (
    <section id="about" aria-label="About me">
      <SectionHeader number="01" title="About" />
      <div className="about-grid">
        <div className={`card fade${cardIn ? ' in' : ''}`} ref={cardRef}>
          <div className="clbl">profile.md</div>
          <p className="ct">{meta.description}</p>
        </div>
        <div className="about-aside">
          <div className={`mc fade${eduIn ? ' in' : ''}`} ref={eduRef} style={{ transitionDelay: '.1s' }}>
            <div className="clbl">education</div>
            <p style={{ fontSize:'14px', fontWeight:700, color:'var(--blue)', marginBottom:'6px' }}>
              {edu.university}
            </p>
            <p style={{ fontSize:'12.5px', color:'var(--sub1)' }}>{edu.degree} · {edu.field}</p>
            <p style={{ fontSize:'11px', color:'var(--ov1)', marginTop:'6px' }}>{edu.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About({ theme }) {
  return theme === 'void' ? <VoidAbout /> : <LuminusAbout />;
}

