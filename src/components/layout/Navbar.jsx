import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Download, Command } from 'lucide-react';
import { siteConfig } from '../../data/config';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = NAV_LINKS.map(l => l.id);

export default function Navbar({ theme, toggleTheme, onOpenPalette, onTriggerToast }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS, 100);

  // Track scroll position for navbar style refinement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scroll when mobile menu is active
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

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
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <a
            href="#home"
            className={styles.logo}
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            aria-label="Petros Sisay Gelan — Back to top"
          >
            <span className={styles.logoMark}>P</span>
            <span className={styles.logoText}>
              Petros<span className={styles.logoDot}>.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {NAV_LINKS.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Command Palette Button */}
            <button
              className={styles.paletteBtn}
              onClick={onOpenPalette}
              aria-label="Open command palette (Ctrl+K)"
              title="Command Palette (Ctrl+K)"
            >
              <Command size={15} />
              <span className={styles.paletteKbd}>Ctrl+K</span>
            </button>

            {/* Theme Toggle */}
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun size={18} aria-hidden="true" />
              ) : (
                <Moon size={18} aria-hidden="true" />
              )}
            </button>

            {/* Resume CTA */}
            <button
              onClick={handleDownloadCV}
              className={styles.resumeBtn}
              aria-label="Download Petros's CV"
            >
              <Download size={15} aria-hidden="true" />
              <span>Resume</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className={styles.menuBtn}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`${styles.mobileOverlay} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Nav */}
      <nav
        id="mobile-nav"
        className={`${styles.mobileNav} ${menuOpen ? styles.open : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileNavInner}>
          <div className={styles.mobileLinks}>
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`${styles.mobileLink} ${activeSection === link.id ? styles.active : ''}`}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className={styles.mobileLinkNum}>0{i + 1}</span>
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.mobileActions}>
            <button
              onClick={(e) => { setMenuOpen(false); handleDownloadCV(e); }}
              className={styles.mobileResumeBtn}
              tabIndex={menuOpen ? 0 : -1}
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
