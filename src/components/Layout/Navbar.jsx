import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Navbar — Full-width (FIX 1) with mobile hamburger menu (MOBILE 2)
 * Desktop:  logo left · dots center · theme toggle + contact right
 * Mobile:   logo left · hamburger right → fullscreen slide-down menu
 */
export default function Navbar({ theme, onToggleTheme, goSec }) {
  const sections = ['hero', 'about', 'skills', 'experience', 'projects'];
  const labels = ['Home', 'About', 'Skills', 'Experience', 'Projects'];
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const menuRef = useRef(null);

  /* ── Startup Theme Tooltip ── */
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  /* ── Active section tracker ── */
  useEffect(() => {
    function updateNav() {
      let cur = 0;
      sections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 260) cur = i;
      });
      setActive(cur);
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
    return () => window.removeEventListener('scroll', updateNav);
  }, []); // eslint-disable-line

  /* ── Close mobile menu on outside tap ── */
  useEffect(() => {
    if (!menuOpen) return;
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
        !e.target.closest('.wbar')) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [menuOpen]);

  /* ── Lock body scroll when menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = useCallback((id) => {
    setMenuOpen(false);
    goSec(id);
  }, [goSec]);

  const ThemeIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {theme === 'void' ? (
        <path d="M12 2L9 7H3l5 3.5L6 16l6-4 6 4-2-5.5L21 7h-6z" />
      ) : (
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
      )}
    </svg>
  );

  return (
    <>
      <nav className="wbar" role="navigation" aria-label="Site navigation">
        {/* Left: logo — pinned far left */}
        <div className="wb-l">
          <span className="wb-logo">alffrin regi</span>
        </div>

        {/* Center: dots (desktop only) */}
        <div className="wb-dots" aria-label="Section navigation">
          {sections.map((id, i) => (
            <button
              key={id}
              className={`wb-dot${i === active ? ' on' : ''}`}
              onClick={() => handleNavClick(id)}
              title={labels[i]}
              aria-label={labels[i]}
            />
          ))}
        </div>

        {/* Right: theme toggle + contact + hamburger */}
        <div className="wb-r">
          <div style={{ position: 'relative' }}>
            <button
              className="theme-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'void' ? 'Luminus' : 'Void'} theme`}
              title={`Switch to ${theme === 'void' ? 'Luminus' : 'Void'} theme`}
            >
              <ThemeIcon />
            </button>
            {showTooltip && (
              <div className="theme-tooltip" aria-live="polite">
                click here to change theme
              </div>
            )}
          </div>


          {/* Mobile-only hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen slide-down menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
      >
        <div className="mobile-menu-inner">
          {sections.map((id, i) => (
            <button
              key={id}
              className={`mobile-nav-link${i === active ? ' active' : ''}`}
              onClick={() => handleNavClick(id)}
            >
              <span className="mn-num">0{i + 1}</span>
              <span>{labels[i]}</span>
            </button>
          ))}

          <div className="mobile-menu-footer">
            <button
              className="theme-btn"
              onClick={() => { onToggleTheme(); setMenuOpen(false); }}
              aria-label={`Switch to ${theme === 'void' ? 'Luminus' : 'Void'} theme`}
            >
              <ThemeIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

