import { useState, useEffect, useRef } from 'react';
import { Search, Home, User, Code, FolderGit2, GraduationCap, Mail, Sun, Moon, Download, Command, X } from 'lucide-react';
import { siteConfig } from '../../data/config';
import styles from './CommandPalette.module.css';

export default function CommandPalette({ isOpen, onClose, theme, toggleTheme, onTriggerToast }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const actions = [
    { id: 'home', label: 'Go to Home', icon: <Home size={16} />, type: 'nav' },
    { id: 'about', label: 'Go to About', icon: <User size={16} />, type: 'nav' },
    { id: 'skills', label: 'Go to Skills', icon: <Code size={16} />, type: 'nav' },
    { id: 'projects', label: 'Go to Projects', icon: <FolderGit2 size={16} />, type: 'nav' },
    { id: 'journey', label: 'Go to Journey', icon: <GraduationCap size={16} />, type: 'nav' },
    { id: 'contact', label: 'Go to Contact', icon: <Mail size={16} />, type: 'nav' },
    {
      id: 'theme',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
      type: 'action',
      perform: () => { toggleTheme(); onClose(); },
    },
    {
      id: 'cv',
      label: 'Download Resume (CV)',
      icon: <Download size={16} />,
      type: 'action',
      perform: () => {
        const link = document.createElement('a');
        link.href = siteConfig.cvPath;
        link.download = 'Petros_Sisay_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
        if (onTriggerToast) onTriggerToast('Downloading Resume...', 'info');
      },
    },
  ];

  const filtered = actions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (action) => {
    if (action.type === 'nav') {
      onClose();
      const el = document.getElementById(action.id);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else if (action.perform) {
      action.perform();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Type a command or section..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close command palette">
            <X size={16} />
          </button>
        </div>

        <div className={styles.list}>
          {filtered.length === 0 ? (
            <p className={styles.noResults}>No matching commands found</p>
          ) : (
            filtered.map(action => (
              <button
                key={action.id}
                className={styles.item}
                onClick={() => handleSelect(action)}
              >
                <span className={styles.itemIcon}>{action.icon}</span>
                <span className={styles.itemLabel}>{action.label}</span>
                <span className={styles.itemBadge}>{action.type === 'nav' ? 'Jump' : 'Run'}</span>
              </button>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <span><Command size={12} /> Navigation Shortcut</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
