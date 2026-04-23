import PropTypes from 'prop-types';
import { useInView } from '../../hooks/useInView';
import SectionHeader from '../common/SectionHeader';
import styles from './Skills.module.css';
import { usePortfolio } from '../../context/PortfolioContext';

// Core competencies that will be highlighted in bold
const CORE_SKILLS = ['ROS 2', 'C++', 'Python', 'Jetson Nano', 'Computer Vision', 'Embedded Systems'];

function TechnicalGrid() {
  const data = usePortfolio();
  // Format group name: 'robotics_frameworks' -> 'Robotics Frameworks'
  const formatGroup = (str) => {
    return str.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className={`${styles.techGrid} tech-grid`}>
      {data.skills?.map((cat, i) => (
        <div key={i} className={styles.techCategory}>
          <h3 className={styles.techCatTitle}>{formatGroup(cat.group)}</h3>
          <ul className={styles.techList}>
            {cat.items.map((skill, j) => {
              const isCore = CORE_SKILLS.includes(skill);
              return (
                <li key={j} className={`${styles.techItem} ${isCore ? styles.coreSkill : ''}`}>
                  {skill}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

TechnicalGrid.propTypes = {
  data: PropTypes.shape({
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        group: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string).isRequired
      })
    )
  }).isRequired
};

function VoidSkills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" aria-label="Technical skills" className="void-section">
      <SectionHeader number="02" title="Skills" />
      <div className={`fade${inView ? ' in' : ''}`} ref={ref}>
        <TechnicalGrid />
      </div>
    </section>
  );
}

function HyprSkills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" aria-label="Technical skills">
      <SectionHeader number="02" title="Skills" />
      <div className={`fade${inView ? ' in' : ''}`} ref={ref}>
        <TechnicalGrid />
      </div>
    </section>
  );
}

export default function Skills({ theme }) {
  return theme === 'void' ? <VoidSkills /> : <HyprSkills />;
}

Skills.propTypes = {
  theme: PropTypes.string.isRequired
};
