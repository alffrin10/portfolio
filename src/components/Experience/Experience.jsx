import { useInView } from '../../hooks/useInView';
import SectionHeader from '../common/SectionHeader';
import { usePortfolio } from '../../context/PortfolioContext';

/* ─────────────  VOID  ─────────────────────────────────────────
   Pure typography timeline. No card backgrounds at all.
   Just large company name, role, date, location as open text rows.
   A hairline separates each entry.
──────────────────────────────────────────────────────────────── */
function VoidExpItem({ exp, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      className={`void-exp-item fade${inView ? ' in' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * .1}s` }}
    >
      <div className="vei-top">
        <span className="vei-company">{exp.company}</span>
        <span className="vei-date">{exp.date}</span>
      </div>
      <div className="vei-bottom">
        <span className="vei-role">{exp.role}</span>
        <span className="vei-sep">·</span>
        <span className="vei-loc">{exp.location}</span>
      </div>
      <hr className="vei-hr" />
    </div>
  );
}

function VoidExperience() {
  const data = usePortfolio();
  return (
    <section id="experience" aria-label="Work experience" className="void-section">
      <SectionHeader number="03" title="Experience" />
      <div className="void-exp-list">
        {data.experience.map((exp, i) => (
          <VoidExpItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────  LUMINUS  ──────────────────────────────────── */
function LuminusExpItem({ exp, index }) {
  const [ref, inView] = useInView();
  return (
    <div className={`exp-item fade${inView ? ' in' : ''}`} ref={ref} style={{ transitionDelay: `${index * .1}s` }}>
      <div className="exp-top">
        <span className="exp-company">{exp.company}</span>
        <span className="exp-date">{exp.date}</span>
      </div>
      <div className="exp-role">{exp.role}</div>
      <div className="exp-loc">📍 {exp.location}</div>
    </div>
  );
}

function LuminusExperience() {
  const data = usePortfolio();
  return (
    <section id="experience" aria-label="Work experience">
      <SectionHeader number="03" title="Experience" />
      <div className="exp-wrap">
        {data.experience.map((exp, i) => <LuminusExpItem key={i} exp={exp} index={i} />)}
      </div>
    </section>
  );
}

export default function Experience({ theme }) {
  return theme === 'void' ? <VoidExperience /> : <LuminusExperience />;
}

