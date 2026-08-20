import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import styles from './Toast.module.css';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} className={styles.successIcon} />,
    error: <AlertCircle size={18} className={styles.errorIcon} />,
    info: <Info size={18} className={styles.infoIcon} />,
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`} role="alert" aria-live="assertive">
      <div className={styles.iconWrap}>{icons[type]}</div>
      <p className={styles.message}>{message}</p>
      <button onClick={onClose} className={styles.closeBtn} aria-label="Close notification">
        <X size={14} />
      </button>
    </div>
  );
}
