import { useState, useEffect, useRef } from 'react';
import { Send, ArrowDown, Download, ExternalLink, Terminal, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { siteConfig } from '../../data/config';
import styles from './Hero.module.css';

const ROLES = [
  'Software Engineering Student',
  'Full-Stack Web Developer',
  'Java Application Developer',
  'Database Systems Builder',
];

function TypedRoles() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const currentRole = ROLES[index];
    const speed = deleting ? 40 : 80;

    timerRef.current = setTimeout(() => {
      if (!deleting && text === currentRole) {
        timerRef.current = setTimeout(() => setDeleting(true), 2000);
        return;
      }
      if (deleting && text === '') {
        setDeleting(false);
        setIndex(prev => (prev + 1) % ROLES.length);
        return;
      }
      setText(prev =>
        deleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timerRef.current);
  }, [text, deleting, index]);

  return (
    <span className={styles.typedContainer}>
      <span className={styles.typedText}>{text}</span>
      <span className={styles.cursor} aria-hidden="true">|</span>
    </span>
  );
}

export default function Hero({ onTriggerToast }) {
  const handleDownloadCV = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = siteConfig.cvPath;
    link.download = 'Petros_Sisay_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onTriggerToast) onTriggerToast('Downloading Resume...', 'info');
  };

  return (
    <section id="home" className={styles.heroSection} aria-label="Hero Introduction">
      {/* Background Technical Grid */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGradientOrb} aria-hidden="true" />

      <div className={`container ${styles.gridContainer}`}>
        {/* Left Side: Copy & CTAs */}
        <div className={styles.contentCol}>
          <div className="badge" aria-label="Availability Status">
            <span className="badge-dot" />
            <span>Open for Internships & Junior Roles</span>
          </div>

          <h1 className={styles.heroName}>
            {siteConfig.name}
          </h1>

          <p className={styles.roleSubhead}>
            <TypedRoles />
          </p>

          <p className={styles.tagline}>
            {siteConfig.tagline} 3rd Year Software Engineering Student at ASTU building responsive web applications, Java desktop systems, and relational databases.
          </p>

          {/* Action CTAs */}
          <div className={styles.ctaGroup}>
            <a href="#projects" className={styles.primaryBtn}>
              <span>View My Projects</span>
              <ExternalLink size={16} />
            </a>
            <button onClick={handleDownloadCV} className={styles.secondaryBtn}>
              <Download size={16} />
              <span>Download CV</span>
            </button>
            <a
              href={siteConfig.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ghostBtn}
            >
              View CV
            </a>
          </div>

          {/* Social Links */}
          <div className={styles.socialBar}>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub profile"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Telegram account"
            >
              <Send size={20} />
            </a>
            <span className={styles.socialDivider} />
            <a href={`mailto:${siteConfig.email}`} className={styles.emailText}>
              {siteConfig.email}
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Developer Code Terminal */}
        <div className={styles.visualCol} aria-hidden="true">
          <div className={styles.terminalWindow}>
            <div className={styles.terminalHeader}>
              <div className={styles.dots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <div className={styles.terminalTitle}>
                <Terminal size={13} />
                <span>petros@astu-dev:~</span>
              </div>
            </div>

            <div className={styles.terminalBody}>
              <p><span className={styles.cKeyword}>const</span> <span className={styles.cVar}>developer</span> = {'{'}</p>
              <p className={styles.indent}><span className={styles.cProp}>name</span>: <span className={styles.cStr}>"{siteConfig.name}"</span>,</p>
              <p className={styles.indent}><span className={styles.cProp}>title</span>: <span className={styles.cStr}>"Full-Stack Developer"</span>,</p>
              <p className={styles.indent}><span className={styles.cProp}>university</span>: <span className={styles.cStr}>"ASTU (Adama, Ethiopia)"</span>,</p>
              <p className={styles.indent}><span className={styles.cProp}>stack</span>: [</p>
              <p className={styles.indent2}>
                <span className={styles.cStr}>"React"</span>, <span className={styles.cStr}>"Node.js"</span>,
              </p>
              <p className={styles.indent2}>
                <span className={styles.cStr}>"Java"</span>, <span className={styles.cStr}>"MySQL"</span>,
              </p>
              <p className={styles.indent}>],</p>
              <p className={styles.indent}><span className={styles.cProp}>status</span>: <span className={styles.cStr}>"Ready for opportunities 🚀"</span>,</p>
              <p>{'}'};</p>

              <div className={styles.terminalPromptLine}>
                <span className={styles.promptArrow}>&gt;</span> <span className={styles.cFn}>console</span>.<span className={styles.cLog}>log</span>(<span className={styles.cStr}>"Welcome to my portfolio!"</span>);
              </div>
              <p className={styles.terminalOutput}>// ✅ Rendered clean code architecture</p>
            </div>
          </div>

          {/* Floating Pill Micro-Badges */}
          <div className={`${styles.floatBadge} ${styles.float1}`}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>React.js</span>
          </div>
          <div className={`${styles.floatBadge} ${styles.float2}`}>
            <span>Java & OOP</span>
          </div>
          <div className={`${styles.floatBadge} ${styles.float3}`}>
            <span>MySQL Database</span>
          </div>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <a href="#about" className={styles.scrollDown} aria-label="Scroll to About section">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
