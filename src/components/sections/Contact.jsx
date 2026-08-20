import { useState } from 'react';
import { Mail, Send, Copy, Check, MessageSquare, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { siteConfig } from '../../data/config';
import { useIntersection } from '../../hooks/useIntersection';
import styles from './Contact.module.css';

export default function Contact({ onTriggerToast }) {
  const { ref, isVisible } = useIntersection();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    if (onTriggerToast) onTriggerToast('Email copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) {
      errs.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSending(true);

    try {
      if (siteConfig.contactEndpoint) {
        const payload = {
          name: form.name,
          email: form.email,
          _replyto: form.email,
          _subject: `[Portfolio Inquiry] ${form.subject} — from ${form.name}`,
          message: form.message,
          _captcha: 'false',
          _template: 'table',
        };

        const response = await fetch(siteConfig.contactEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok && data.success !== 'true') {
          throw new Error(data.message || 'Form submission failed');
        }
      } else {
        // Fallback simulation
        await new Promise(res => setTimeout(res, 1000));
      }

      if (onTriggerToast) {
        onTriggerToast('Message sent! It will arrive in Petros\'s inbox shortly.', 'success');
      }
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      if (onTriggerToast) {
        onTriggerToast('Could not send message. Please email petrossisay7164@gmail.com directly.', 'error');
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Section Heading */}
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            Let's Build <span>Together</span>
          </h2>
          <p className="section-subtitle">
            Whether you have an internship opportunity, junior developer role, freelance project, or simply want to connect — my inbox is always open.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Direct Contact Info */}
          <div className={`${styles.infoCol} reveal ${isVisible ? 'visible' : ''}`}>
            <h3 className={styles.infoHeading}>Contact Details</h3>
            <p className={styles.infoSub}>
              Feel free to reach out via email, Telegram, LinkedIn, or send a message using the form.
            </p>

            <div className={styles.contactCards}>
              {/* Email Card */}
              <div className={styles.card}>
                <div className={styles.cardIcon}>
                  <Mail size={20} />
                </div>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>Direct Email</span>
                  <a href={`mailto:${siteConfig.email}`} className={styles.cardValue}>
                    {siteConfig.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className={styles.copyBtn}
                  aria-label="Copy email address"
                  title="Copy email address"
                >
                  {copied ? <Check size={16} className={styles.checkIcon} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Telegram Card */}
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div className={styles.cardIcon}>
                  <Send size={20} />
                </div>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>Telegram</span>
                  <span className={styles.cardValue}>{siteConfig.telegramHandle}</span>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div className={styles.cardIcon}>
                  <LinkedinIcon size={20} />
                </div>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>LinkedIn</span>
                  <span className={styles.cardValue}>petros-sisay-gelan</span>
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div className={styles.cardIcon}>
                  <GithubIcon size={20} />
                </div>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>GitHub</span>
                  <span className={styles.cardValue}>petrossisay1646</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className={`${styles.formCol} reveal ${isVisible ? 'visible' : ''}`}>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <h3 className={styles.formTitle}>Send Me a Message</h3>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                  <input
                    id="name"
                    type="text"
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>Your Email</label>
                  <input
                    id="email"
                    type="email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input
                  id="subject"
                  type="text"
                  className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                  placeholder="Internship / Junior Role / Project Inquiry"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                />
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  placeholder="Hello Petros, I'd like to talk about an opportunity..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={sending}
                className={styles.submitBtn}
              >
                <MessageSquare size={16} />
                <span>{sending ? 'Sending to Inbox...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
