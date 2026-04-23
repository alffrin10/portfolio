import { useEffect, useRef } from 'react';

/**
 * ResumeModal — In-page PDF viewer (FEATURE 7)
 *
 * Opens resume.pdf (served locally from /public/assets/resume.pdf)
 * in a modal iframe overlay with keyboard trap and backdrop click dismiss.
 */
export default function ResumeModal({ onClose }) {
  const modalRef = useRef(null);

  /* ── Close on Escape ── */
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  /* ── Focus trap ── */
  useEffect(() => {
    const el = modalRef.current?.querySelector('.resume-modal-close');
    el?.focus();
  }, []);

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="resume-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Resume viewer"
    >
      <div className="resume-modal" ref={modalRef}>
        <div className="resume-modal-header">
          <span className="resume-modal-title">resume — alffrin regi.pdf</span>
          <div className="resume-modal-actions">
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-modal-newtab"
            >
              Open in new tab ↗
            </a>
            <button
              className="resume-modal-close"
              onClick={onClose}
              aria-label="Close resume viewer"
            >
              ✕
            </button>
          </div>
        </div>
        <iframe
          className="resume-modal-iframe"
          src="/assets/resume.pdf"
          title="Alffrin Regi Resume"
          aria-label="Resume PDF document"
        />
      </div>
    </div>
  );
}
