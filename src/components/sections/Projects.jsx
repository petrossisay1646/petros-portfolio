import { useState, useMemo } from 'react';
import { ExternalLink, X, ChevronRight, Sparkles, Folder, Eye } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { projects, filterCategories } from '../../data/projects';
import { useIntersection } from '../../hooks/useIntersection';
import styles from './Projects.module.css';

// ── Project Modal Dialog ──────────────────────────────
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalContent}>
        {/* Header Image if available */}
        {project.image && (
          <div className={styles.modalImageContainer}>
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className={styles.modalImage}
            />
            <button className={styles.modalCloseFloating} onClick={onClose} aria-label="Close dialog">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Header */}
        <div className={styles.modalHeader}>
          <div>
            <span className={styles.modalCategory}>
              {project.category.map(c => c.toUpperCase()).join(' · ')}
            </span>
            <h3 id="modal-title" className={styles.modalTitle}>{project.title}</h3>
          </div>
          {!project.image && (
            <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Close dialog">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <p className={styles.modalTagline}>{project.tagline}</p>
          <p className={styles.modalLongDesc}>{project.longDescription || project.description}</p>

          {/* Problem & Solution */}
          {project.problem && (
            <div className={styles.problemSolutionGrid}>
              <div className={styles.psBox}>
                <h4 className={styles.psTitle}>The Challenge</h4>
                <p>{project.problem}</p>
              </div>
              <div className={styles.psBox}>
                <h4 className={styles.psTitle}>The Solution</h4>
                <p>{project.solution}</p>
              </div>
            </div>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className={styles.featuresSection}>
              <h4 className={styles.sectionHeading}>Key Features</h4>
              <ul className={styles.featureList}>
                {project.features.map((feat, i) => (
                  <li key={i} className={styles.featureItem}>
                    <ChevronRight size={14} className={styles.featureIcon} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className={styles.techSection}>
            <h4 className={styles.sectionHeading}>Technologies Used</h4>
            <div className={styles.techTags}>
              {project.tech.map(t => (
                <span key={t} className="tag tag--accent">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className={styles.modalFooter}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.modalPrimaryBtn}
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.modalSecondaryBtn}
            >
              <GithubIcon size={16} />
              <span>View Source Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Project Card Component ─────────────────────────────
function ProjectCard({ project, onOpenDetails, featured = false, delay = 0 }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      className={`${featured ? styles.featuredCard : styles.card}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Project Thumbnail Image */}
      {project.image && !imgErr && (
        <div className={styles.cardImageWrapper} onClick={() => onOpenDetails(project)}>
          <div className={styles.browserBar}>
            <span className={`${styles.browserDot} ${styles.dotRed}`} />
            <span className={`${styles.browserDot} ${styles.dotYellow}`} />
            <span className={`${styles.browserDot} ${styles.dotGreen}`} />
            <span className={styles.browserUrl}>{project.liveUrl ? project.liveUrl.replace('https://', '') : project.id}</span>
          </div>
          <div className={styles.imageOverlayContainer}>
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className={styles.cardImage}
              onError={() => setImgErr(true)}
              loading="lazy"
            />
            <div className={styles.imageHoverOverlay}>
              <span className={styles.viewDetailsPrompt}>
                <Eye size={16} /> Quick Preview
              </span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderTop}>
          <div className={styles.folderIcon}>
            <Folder size={20} />
          </div>
          <div className={styles.cardLinks}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className={styles.iconBtn}
                title="GitHub Repo"
              >
                <GithubIcon size={17} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} Live Demo`}
                className={styles.iconBtn}
                title="Live Deployment"
              >
                <ExternalLink size={17} />
              </a>
            )}
          </div>
        </div>

        {featured && (
          <span className={styles.featuredBadge}>
            <Sparkles size={12} /> Featured Work
          </span>
        )}

        <h3 className={styles.cardTitle} onClick={() => onOpenDetails(project)}>
          {project.title}
        </h3>
        <p className={styles.cardDesc}>{project.description}</p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.techList}>
          {project.tech.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <button
          onClick={() => onOpenDetails(project)}
          className={styles.detailsBtn}
        >
          <span>Case Study</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Main Projects Section Component ───────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, isVisible } = useIntersection();

  const featuredProjects = useMemo(() => {
    return projects.filter(p => p.featured);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <>
      <section id="projects" className="section section--alt">
        <div className="container">
          {/* Section Header */}
          <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
            <p className="section-label">Selected Showcase</p>
            <h2 className="section-title">
              Software Projects <span>I've Built</span>
            </h2>
            <p className="section-subtitle">
              Demonstrating full-stack web applications, Java desktop systems, database design, and modern responsive UI.
            </p>
          </div>

          {/* Featured Highlights Showcase */}
          <div className={styles.featuredGrid}>
            {featuredProjects.map((proj, idx) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                featured={true}
                onOpenDetails={setSelectedProject}
                delay={idx * 100}
              />
            ))}
          </div>

          {/* Filter Category Tabs */}
          <div className={styles.filterBar} role="tablist" aria-label="Filter projects">
            {filterCategories.map(cat => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeFilter === cat.id}
                className={`${styles.filterTab} ${activeFilter === cat.id ? styles.activeTab : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* All Filtered Grid */}
          <div className={styles.projectsGrid}>
            {filteredProjects.map((proj, idx) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                featured={false}
                onOpenDetails={setSelectedProject}
                delay={idx * 60}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal Dialog for Project Details */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
