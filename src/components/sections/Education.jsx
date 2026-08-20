import { GraduationCap, Calendar, MapPin, BookOpen, Award } from 'lucide-react';
import { siteConfig } from '../../data/config';
import { useIntersection } from '../../hooks/useIntersection';
import styles from './Education.module.css';

const COURSES = [
  'Data Structures & Algorithms',
  'Database Management Systems',
  'Object-Oriented Programming (Java)',
  'Software Engineering Principles',
  'Web Technologies & Standards',
  'Operating Systems',
  'Computer Networks',
  'System Analysis & Design',
];

export default function Education() {
  const { ref, isVisible } = useIntersection();

  return (
    <section id="education" className="section section--alt">
      <div className="container">
        {/* Heading */}
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <p className="section-label">Academic Qualifications</p>
          <h2 className="section-title">
            Education & <span>Academic Background</span>
          </h2>
        </div>

        {/* Education Card */}
        <div className={`${styles.card} reveal ${isVisible ? 'visible' : ''}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrap}>
              <GraduationCap size={32} />
            </div>

            <div className={styles.headerText}>
              <div className={styles.headerTop}>
                <h3 className={styles.degreeTitle}>{siteConfig.degree}</h3>
                <span className={styles.badgeProgress}>In Progress</span>
              </div>
              <p className={styles.uniName}>{siteConfig.university}</p>
              <div className={styles.metaRow}>
                <span className={styles.metaItem}>
                  <Calendar size={14} /> {siteConfig.year} (Expected Graduation: 2027)
                </span>
                <span className={styles.metaItem}>
                  <MapPin size={14} /> {siteConfig.location}
                </span>
              </div>
            </div>
          </div>

          <p className={styles.academicDesc}>
            Covering computer science theories, algorithmic complexity, software development life cycle (SDLC), database schema design, and hands-on laboratory programming assignments.
          </p>

          <div className={styles.coursesBlock}>
            <h4 className={styles.coursesTitle}>
              <BookOpen size={16} />
              <span>Key Coursework Completed</span>
            </h4>
            <div className={styles.courseTags}>
              {COURSES.map(course => (
                <span key={course} className="tag tag--accent">{course}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
