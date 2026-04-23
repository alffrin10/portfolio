import { useEffect, useRef } from 'react';

/**
 * VoidCanvas — Subtle twinkling static star field for Void theme
 * Much more minimal than Luminus's canvas — just static stars that gently twinkle
 * The CSS shooting stars layer on top for the wow effect
 */
export default function VoidCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    const isMobile = window.innerWidth < 768;
    let W = cv.width = window.innerWidth;
    let H = cv.height = window.innerHeight;

    function resize() {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
      initStars();
    }
    window.addEventListener('resize', resize);

    let stars = [];

    function initStars() {
      const n = isMobile ? 120 : 280;
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 0.9 + 0.1,
        a: Math.random() * 0.5 + 0.1,
        tp: Math.random() * Math.PI * 2,
        ts: 0.005 + Math.random() * 0.008
      }));
    }

    function draw() {
      if (document.hidden) { rafRef.current = null; return; }
      cx.clearRect(0, 0, W, H);

      stars.forEach(s => {
        s.tp += s.ts;
        const a = s.a + Math.sin(s.tp) * 0.12;
        cx.beginPath();
        cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        cx.fillStyle = `rgba(255,255,255,${Math.min(0.7, Math.max(0, a))})`;
        cx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    initStars();
    rafRef.current = requestAnimationFrame(draw);

    const onVis = () => {
      if (!document.hidden && !rafRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />;
}

