import { GraduationCap, Code, Database, Layers, Sparkles } from 'lucide-react';
import { journeyItems } from '../../data/journey';
import { useIntersection } from '../../hooks/useIntersection';
import styles from './Journey.module.css';

export default function Journey() {
  const { ref, isVisible } = useIntersection();

  return (
    <section id="journey" className="section">
      <div className="container">
        {/* Section Heading */}
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <p className="section-label">Learning & Growth</p>
          <h2 className="section-title">
            Software Engineering <span>Journey</span>
          </h2>
          <p className="section-subtitle">
            My milestone progression from computer science fundamentals at ASTU to practical web, Java, and database engineering.
          </p>
        </div>

        {/* Timeline List */}
        <div className={styles.timeline}>
          {journeyItems.map((item, idx) => (
            <div
              key={item.id}
              className={`${styles.timelineItem} reveal ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Timeline Marker */}
              <div className={styles.markerCol}>
                <div className={`${styles.markerDot} ${item.category === 'current' ? styles.currentDot : ''}`}>
                  {item.category === 'education' && <GraduationCap size={14} />}
                  {item.category === 'current' && <Sparkles size={14} />}
                  {item.category === 'milestone' && <Code size={14} />}
                </div>
                {idx < journeyItems.length - 1 && <div className={styles.markerLine} />}
              </div>

              {/* Content Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.yearBadge}>{item.year}</span>
                  {item.category === 'current' && (
                    <span className={styles.statusBadge}>Active Focus</span>
                  )}
                </div>

                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.institution}>{item.institution}</p>
                <p className={styles.description}>{item.description}</p>

                <div className={styles.tagList}>
                  {item.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
