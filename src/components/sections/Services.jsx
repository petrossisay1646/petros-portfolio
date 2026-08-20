import { LayoutTemplate, Layers, Code2, Database, Server, PenTool } from 'lucide-react';
import { services } from '../../data/services';
import { useIntersection } from '../../hooks/useIntersection';
import styles from './Services.module.css';

const ICON_MAP = {
  LayoutTemplate: <LayoutTemplate size={24} />,
  Layers: <Layers size={24} />,
  Code2: <Code2 size={24} />,
  Database: <Database size={24} />,
  Server: <Server size={24} />,
  PenTool: <PenTool size={24} />,
};

export default function Services() {
  const { ref, isVisible } = useIntersection();

  return (
    <section id="services" className="section">
      <div className="container">
        {/* Heading */}
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <p className="section-label">Capabilities</p>
          <h2 className="section-title">
            Services & <span>What I Can Build</span>
          </h2>
          <p className="section-subtitle">
            Focused engineering services based on my verified technical skills and project experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className={styles.grid}>
          {services.map((item, idx) => (
            <div
              key={item.id}
              className={`${styles.card} reveal ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${idx * 70}ms` }}
            >
              <div className={styles.iconWrap}>
                {ICON_MAP[item.icon] || <Code2 size={24} />}
              </div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.description}</p>
              <div className={styles.tagGroup}>
                {item.tags.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
