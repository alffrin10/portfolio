import { useEffect, useRef } from 'react';

/**
 * LuminusCanvas — Subtle pastel gradient mesh for professional Light Theme
 * Uses slowly shifting, soft pastel orbs to create a dynamic but clean background.
 */

const ORBS = [
  { c: 'rgba(116, 185, 255, 0.4)', r: 0.6, spd: 0.002, xOffset: 0.2, yOffset: 0.3 }, // Soft Blue
  { c: 'rgba(85, 239, 196, 0.35)', r: 0.5, spd: 0.0015, xOffset: 0.7, yOffset: 0.6 }, // Mint
  { c: 'rgba(162, 155, 254, 0.3)', r: 0.7, spd: 0.0025, xOffset: 0.8, yOffset: 0.2 }, // Lavender
  { c: 'rgba(253, 121, 168, 0.25)', r: 0.55, spd: 0.0018, xOffset: 0.3, yOffset: 0.8 } // Light Pink
];

export default function LuminusCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    let W = cv.width = window.innerWidth;
    let H = cv.height = window.innerHeight;

    function resize() {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);

    let time = 0;

    function draw() {
      if (document.hidden) { rafRef.current = null; return; }
      cx.clearRect(0, 0, W, H);
      time += 1;

      ORBS.forEach((orb, i) => {
        const x = W * (orb.xOffset + Math.sin(time * orb.spd + i) * 0.15);
        const y = H * (orb.yOffset + Math.cos(time * orb.spd * 0.8 + i) * 0.15);
        const radius = Math.min(W, H) * orb.r;

        const g = cx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, orb.c);
        g.addColorStop(1, 'rgba(255, 255, 255, 0)');

        cx.beginPath();
        cx.arc(x, y, radius, 0, Math.PI * 2);
        cx.fillStyle = g;
        cx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

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

