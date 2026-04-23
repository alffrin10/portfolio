import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useInView } from '../../hooks/useInView';
import SectionHeader from '../common/SectionHeader';
import ProjectThumb from './ProjectThumb';
import { usePortfolio } from '../../context/PortfolioContext';

/* ─────────────────────────────────────────────────────────────
   EXPANDABLE CASE STUDY PANEL  (FEATURE 4)
───────────────────────────────────────────────────────────── */
function CaseStudy({ cs }) {
  if (!cs) return null;
  return (
    <div className="cs-inner">
      {[
        { label: '01 · Problem',  text: cs.problem  },
        { label: '02 · Approach', text: cs.approach },
        { label: '03 · Result',   text: cs.result   },
        { label: '04 · Lessons',  text: cs.lessons  },
      ].map(({ label, text }) => text ? (
        <div key={label} className="cs-block">
          <span className="cs-label">{label}</span>
          <p className="cs-text">{text}</p>
        </div>
      ) : null)}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TAG FILTER BAR  (FEATURE 5)
───────────────────────────────────────────────────────────── */
function FilterBar({ tags, active, onSelect }) {
  return (
    <div className="project-filter-bar" role="toolbar" aria-label="Filter projects by tag">
      {['All', ...tags].map(tag => (
        <button
          key={tag}
          className={`filter-tag${active === tag ? ' active' : ''}`}
          onClick={() => onSelect(tag)}
          aria-pressed={active === tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VOID PROJECT CARD  (with expand + filter)
───────────────────────────────────────────────────────────── */
function VoidProjectCard({ project, index, theme, hidden }) {
  const [ref, inView] = useInView();
  const [open, setOpen] = useState(false);
  const isEven = index % 2 === 0;

  if (hidden) return null;

  return (
    <div
      className={`void-project-card${isEven ? ' vp-even' : ' vp-odd'} fade${inView ? ' in' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * .09}s` }}
    >
      {/* Canvas thumb */}
      <div className="void-project-thumb">
        {project.thumb && <ProjectThumb type={project.thumb} theme={theme} />}
        <div className="void-thumb-icon">{project.icon}</div>
      </div>

      {/* Text body */}
      <div className="void-project-body">
        <div className="void-project-tags">
          {project.tags.map(tag => <span className="void-ptag" key={tag}>{tag}</span>)}
        </div>
        <h3 className="void-project-name">{project.name}</h3>
        <ul className="void-project-details">
          {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>

        {/* Case study toggle */}
        {project.caseStudy && (
          <>
            <button
              className="case-study-toggle"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
            >
              <span className={`cs-chevron${open ? ' open' : ''}`}>▾</span>
              {open ? 'Less Info' : 'More Info'}
            </button>
            <div className={`cs-panel${open ? ' open' : ''}`} aria-hidden={!open}>
              <CaseStudy cs={project.caseStudy} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function VoidProjects({ theme }) {
  const data = usePortfolio();
  const [activeTag, setActiveTag] = useState('All');

  // Collect all unique tags from projects
  const allTags = [...new Set(data.projects.flatMap(p => p.tags))];

  const isHidden = useCallback((project) => {
    return activeTag !== 'All' && !project.tags.includes(activeTag);
  }, [activeTag]);

  return (
    <section id="projects" aria-label="Projects" className="void-section">
      <SectionHeader number="04" title="Projects" />

      <div className="void-projects-list">
        {data.projects.map((p, i) => (
          <VoidProjectCard
            key={i}
            project={p}
            index={i}
            theme={theme}
            hidden={isHidden(p)}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   LUMINUS PROJECT CARD  (with expand + filter)
───────────────────────────────────────────────────────────── */
function LuminusProjectCard({ project, index, theme, hidden }) {
  const [ref, inView] = useInView();
  const [open, setOpen] = useState(false);

  if (hidden) return null;

  return (
    <div
      className={`project-card fade${inView ? ' in' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * .08}s` }}
    >
      <div className="project-thumb" data-thumb={project.thumb || ''}>
        {project.thumb && <ProjectThumb type={project.thumb} theme={theme} />}
        <div className="project-thumb-icon">{project.icon}</div>
      </div>
      <div className="project-body">
        <div className="project-top">
          <span className="project-name">{project.name}</span>
          <div className="project-tags">
            {project.tags.map(tag => <span className="ptag" key={tag}>{tag}</span>)}
          </div>
        </div>
        <ul className="project-details">
          {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>

        {/* Case study toggle */}
        {project.caseStudy && (
          <>
            <button
              className="case-study-toggle"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
            >
              <span className={`cs-chevron${open ? ' open' : ''}`}>▾</span>
              {open ? 'Less Info' : 'More Info'}
            </button>
            <div className={`cs-panel${open ? ' open' : ''}`} aria-hidden={!open}>
              <CaseStudy cs={project.caseStudy} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LuminusProjects({ theme }) {
  const data = usePortfolio();
  const [activeTag, setActiveTag] = useState('All');

  const allTags = [...new Set(data.projects.flatMap(p => p.tags))];

  const isHidden = useCallback((project) => {
    return activeTag !== 'All' && !project.tags.includes(activeTag);
  }, [activeTag]);

  return (
    <section id="projects" aria-label="Projects">
      <SectionHeader number="04" title="Projects" />

      <div className="projects-list">
        {data.projects.map((p, i) => (
          <LuminusProjectCard
            key={i}
            project={p}
            index={i}
            theme={theme}
            hidden={isHidden(p)}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SWITCHER
───────────────────────────────────────────────────────────── */
export default function Projects({ theme }) {
  if (theme === 'void') return <VoidProjects theme={theme} />;
  return <LuminusProjects theme={theme} />;
}

Projects.propTypes = {
  theme: PropTypes.string.isRequired
};
