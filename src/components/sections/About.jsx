import { useState } from 'react';
import { GraduationCap, MapPin, Code2, BookOpen, CheckCircle, Award, Sparkles } from 'lucide-react';
import { siteConfig } from '../../data/config';
import { useIntersection } from '../../hooks/useIntersection';
import styles from './About.module.css';

export default function About() {
  const { ref, isVisible } = useIntersection();
  const [imgError, setImgError] = useState(false);

  const highlights = [
    '3rd Year Software Engineering Student at ASTU',
    'Full-Stack web development with React & Node.js',
    'Relational database modeling with MySQL & SQL',
    'Java desktop & server-side application development',
    'Clean code principles & responsive UI implementation',
    'Continuously learning through hands-on software projects',
  ];

  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <div ref={ref} className={`${styles.aboutGrid} reveal ${isVisible ? 'visible' : ''}`}>
          {/* Left Column: Narrative */}
          <div className={styles.textCol}>
            <div className="badge" style={{ marginBottom: '0.75rem', alignSelf: 'flex-start' }}>
              <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
              <span>Background & Passion</span>
            </div>

            <p className="section-label">About Me</p>
            <h2 className="section-title">
              Engineering Practical <span>Software Solutions</span>
            </h2>

            <div className={styles.paragraphs}>
              <p>
                Hello! I'm <strong>{siteConfig.name}</strong>, a Software Engineering student currently in my 3rd year of studies at <strong>{siteConfig.university}</strong> in Ethiopia.
              </p>
              <p>
                My passion lies in crafting robust digital experiences — bridging frontend user interfaces with structured backend logic and well-designed relational databases. Whether building responsive web interfaces with React or engineering desktop software in Java with MySQL, I focus on writing clean, maintainable code.
              </p>
              <p>
                As an aspiring Software Engineer, I prioritize continuous learning, problem-solving, and practical execution. I am actively seeking software engineering internships, junior developer roles, and freelance opportunities to apply my skills to real-world projects.
              </p>
            </div>

            {/* Checklist */}
            <div className={styles.checklist}>
              {highlights.map((item, index) => (
                <div key={index} className={styles.checkItem}>
                  <CheckCircle size={16} className={styles.checkIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Profile Specifications Card */}
          <div className={styles.specCol}>
            <div className={styles.specCard}>
              <div className={styles.avatarContainer}>
                {!imgError ? (
                  <img
                    src="/profile.jpg"
                    alt={siteConfig.name}
                    className={styles.avatarImage}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <span className={styles.avatarInitials}>{siteConfig.initials}</span>
                  </div>
                )}
                <span className={styles.avatarTag}>Dev</span>
              </div>

              <h3 className={styles.specName}>{siteConfig.name}</h3>
              <p className={styles.specTitle}>{siteConfig.title}</p>

              <div className={styles.specDivider} />

              <div className={styles.specList}>
                <div className={styles.specRow}>
                  <GraduationCap size={16} className={styles.specIcon} />
                  <div className={styles.specDetails}>
                    <span className={styles.specLabel}>University</span>
                    <span className={styles.specValue}>{siteConfig.university}</span>
                  </div>
                </div>

                <div className={styles.specRow}>
                  <BookOpen size={16} className={styles.specIcon} />
                  <div className={styles.specDetails}>
                    <span className={styles.specLabel}>Degree / Year</span>
                    <span className={styles.specValue}>{siteConfig.degree} ({siteConfig.year})</span>
                  </div>
                </div>

                <div className={styles.specRow}>
                  <Code2 size={16} className={styles.specIcon} />
                  <div className={styles.specDetails}>
                    <span className={styles.specLabel}>Focus</span>
                    <span className={styles.specValue}>Full-Stack & Database Engineering</span>
                  </div>
                </div>

                <div className={styles.specRow}>
                  <MapPin size={16} className={styles.specIcon} />
                  <div className={styles.specDetails}>
                    <span className={styles.specLabel}>Location</span>
                    <span className={styles.specValue}>{siteConfig.location}</span>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.statusDot} />
                <span>Available for Opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
