import { Layout, Server, Database, Code2, Wrench } from 'lucide-react';
import { skillCategories } from '../../data/skills';
import { useIntersection } from '../../hooks/useIntersection';
import styles from './Skills.module.css';

const ICON_MAP = {
  Layout: <Layout size={22} />,
  Server: <Server size={22} />,
  Database: <Database size={22} />,
  Code2: <Code2 size={22} />,
  Wrench: <Wrench size={22} />,
};

export default function Skills() {
  const { ref, isVisible } = useIntersection();

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Section Heading */}
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <p className="section-label">Technical Stack</p>
          <h2 className="section-title">
            Skills & <span>Technologies</span>
          </h2>
          <p className="section-subtitle">
            Organized by functional domains across frontend user interfaces, server logic, database management, and software tooling.
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className={styles.grid}>
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`${styles.card} reveal ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap}>
                  {ICON_MAP[cat.icon] || <Code2 size={22} />}
                </div>
                <div>
                  <h3 className={styles.cardTitle}>{cat.title}</h3>
                  <p className={styles.cardDesc}>{cat.description}</p>
                </div>
              </div>

              <div className={styles.skillList}>
                {cat.skills.map((s, i) => (
                  <div key={i} className={styles.skillItem}>
                    <span className={styles.skillName}>{s.name}</span>
                    <span
                      className={`${styles.skillBadge} ${
                        s.status === 'Proficient'
                          ? styles.statusProficient
                          : styles.statusLearning
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
