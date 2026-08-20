import { ExternalLink, Star, Code2 } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { siteConfig } from '../../data/config';
import { useIntersection } from '../../hooks/useIntersection';
import styles from './GithubActivity.module.css';

const REPOS = [
  {
    name: 'ACE-Meklit',
    desc: 'Business website for ACE Meklit with responsive HTML/CSS/JS.',
    lang: 'HTML/CSS/JS',
    url: 'https://github.com/petrossisay1646/ACE-Meklit',
    stars: 1,
  },
  {
    name: 'GroupChatApp',
    desc: 'Multi-client Java TCP socket chat desktop application.',
    lang: 'Java',
    url: 'https://github.com/petrossisay1646/GroupChatApp',
    stars: 1,
  },
  {
    name: 'StudentRegisterSystem',
    desc: 'Java Swing & JDBC database CRUD application for student records.',
    lang: 'Java / SQL',
    url: 'https://github.com/petrossisay1646/StudentRegisterSystem',
    stars: 1,
  },
  {
    name: 'Apple-website',
    desc: 'Pixel-accurate replica of Apple product marketing page.',
    lang: 'HTML / CSS',
    url: 'https://github.com/petrossisay1646/Apple-website',
    stars: 1,
  },
];

export default function GithubActivity() {
  const { ref, isVisible } = useIntersection();

  return (
    <section id="github" className="section section--alt">
      <div className="container">
        {/* Heading */}
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <p className="section-label">Developer Activity</p>
          <h2 className="section-title">
            Open Source & <span>GitHub Work</span>
          </h2>
          <p className="section-subtitle">
            Exploring code repositories and practical projects on GitHub. Connect with me @{siteConfig.githubUsername}.
          </p>
        </div>

        {/* GitHub Banner */}
        <div className={`${styles.banner} reveal ${isVisible ? 'visible' : ''}`}>
          <div className={styles.bannerLeft}>
            <div className={styles.ghIconWrap}>
              <GithubIcon size={28} />
            </div>
            <div>
              <h3 className={styles.ghUsername}>@{siteConfig.githubUsername}</h3>
              <p className={styles.ghBio}>Building software projects, exploring backend & database engineering.</p>
            </div>
          </div>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileBtn}
          >
            <span>Visit GitHub Profile</span>
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Repo Cards Grid */}
        <div className={styles.repoGrid}>
          {REPOS.map((repo, idx) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.repoCard} reveal ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className={styles.repoHeader}>
                <Code2 size={18} className={styles.repoIcon} />
                <h4 className={styles.repoName}>{repo.name}</h4>
              </div>
              <p className={styles.repoDesc}>{repo.desc}</p>
              <div className={styles.repoFooter}>
                <span className={styles.repoLang}>{repo.lang}</span>
                <span className={styles.repoMeta}>
                  <Star size={13} /> {repo.stars}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
