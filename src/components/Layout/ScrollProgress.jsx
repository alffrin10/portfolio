import { useEffect, useRef } from 'react';

/**
 * ScrollProgress — horizontal bar (top) + vertical right-edge line (VOID 6)
 * The vertical line fills gold as you scroll, visible in Void theme only.
 * Horizontal bar: both themes (existing behaviour).
 */
export default function ScrollProgress() {
  const barRef  = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    function update() {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;

      // Horizontal bar
      if (barRef.current)  barRef.current.style.width = `${pct * 100}%`;

      // Vertical fill
      if (fillRef.current) fillRef.current.style.height = `${pct * 100}%`;
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      {/* Horizontal bar (both themes) */}
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />

      {/* Vertical right-edge line (VOID 6 — hidden on mobile via CSS) */}
      <div className="scroll-progress-v" aria-hidden="true">
        <div className="scroll-progress-v-track" />
        <div ref={fillRef} className="scroll-progress-v-fill" />
      </div>
    </>
  );
}
