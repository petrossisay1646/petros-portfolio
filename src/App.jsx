import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useCommandPalette } from './hooks/useCommandPalette';

import ScrollProgress from './components/layout/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Journey from './components/sections/Journey';
import Education from './components/sections/Education';
import Services from './components/sections/Services';
import GithubActivity from './components/sections/GithubActivity';
import Contact from './components/sections/Contact';

import CommandPalette from './components/interactive/CommandPalette';
import Toast from './components/common/Toast';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const palette = useCommandPalette();
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <div className="app">
      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Main Header / Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenPalette={palette.open}
        onTriggerToast={triggerToast}
      />

      {/* Page Sections */}
      <main id="main-content">
        <Hero onTriggerToast={triggerToast} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Education />
        <Services />
        <GithubActivity />
        <Contact onTriggerToast={triggerToast} />
      </main>

      {/* Main Footer */}
      <Footer />

      {/* Interactive Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={palette.isOpen}
        onClose={palette.close}
        theme={theme}
        toggleTheme={toggleTheme}
        onTriggerToast={triggerToast}
      />

      {/* Global Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
}
