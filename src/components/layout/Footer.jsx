import { Send, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { siteConfig } from '../../data/config';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <div className={styles.topRow}>
          {/* Left Brand info */}
          <div className={styles.brand}>
            <a href="#home" className={styles.logo}>
              <span className={styles.logoMark}>P</span>
              <span className={styles.logoText}>
                {siteConfig.name}<span className={styles.logoDot}>.</span>
              </span>
            </a>
            <p className={styles.role}>{siteConfig.title}</p>
            <p className={styles.school}>{siteConfig.university}</p>
          </div>

          {/* Nav links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#journey">Journey</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Social links */}
          <div className={styles.socialCol}>
            <h4 className={styles.colTitle}>Connect</h4>
            <div className={styles.socialIcons}>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className={styles.iconLink}
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className={styles.iconLink}
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Profile"
                className={styles.iconLink}
              >
                <Send size={18} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Send Email"
                className={styles.iconLink}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Designed & Engineered with precision.
          </p>
          <button onClick={scrollToTop} className={styles.topBtn} aria-label="Back to top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
