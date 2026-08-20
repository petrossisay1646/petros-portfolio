import { useState, useEffect } from 'react';
import { Menu, X, Download, Sun, Moon } from 'lucide-react';
import { siteConfig } from '../data/config';
import { useScrollSpy } from '../hooks/useScrollSpy';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '#home',      label: 'Home'     },
  { href: '#about',     label: 'About'    },
  { href: '#skills',    label: 'Skills'   },
  { href: '#projects',  label: 'Projects' },
  { href: '#journey',   label: 'Journey'  },
  { href: '#contact',   label: 'Contact'  },
];

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1));

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on ESC
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <a href="#home" className={styles.logo} aria-label="Go to top">
            <span className={styles.logoMark}>{siteConfig.initials}</span>
            <span className={styles.logoName}>{siteConfig.shortName} Gelan</span>
          </a>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${activeId === link.href.slice(1) ? styles.active : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            <button
              className={styles.themeBtn}
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href={siteConfig.cvPath}
              download="Petros_Sisay_CV.pdf"
              className={styles.resumeBtn}
              aria-label="Download CV"
            >
              <Download size={15} />
              Resume
            </a>

            {/* Mobile hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(v => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <nav
        id="mobile-nav"
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Navigation</span>
          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.drawerLinks}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.drawerLink} ${activeId === link.href.slice(1) ? styles.drawerActive : ''}`}
              onClick={handleNavClick}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
            >
              <span className={styles.drawerLinkNum}>0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.drawerFooter}>
          <a
            href={siteConfig.cvPath}
            download="Petros_Sisay_CV.pdf"
            className={styles.drawerResume}
            onClick={handleNavClick}
          >
            <Download size={16} />
            Download Resume
          </a>
          <button
            className={styles.drawerTheme}
            onClick={() => { onToggleTheme(); }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>
    </>
  );
}
