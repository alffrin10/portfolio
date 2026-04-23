import { useEffect, useRef } from 'react';

/**
 * CustomCursor — Upgraded (PREMIUM 2)
 * Void:     32px ring, 4px dot, hover scale 48px + fill, click pulse, color white
 * Luminus: 10px solid black dot + 5 trailing dots fading out
 * Both:     disabled on (pointer: coarse) touch devices
 */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const mx = useRef(0), my = useRef(0);
  const rx = useRef(0), ry = useRef(0);
  const trailPos = useRef(Array(5).fill({x: 0, y: 0}));

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('has-cursor');
    const gColors = ['#ffffff','#e0e0e0','#c0c0c0','#cba6f7','#89b4fa','#74c7ec','#00e5cc'];
    let lastParticle = 0;

    function onMove(e) {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx.current + 'px';
        dotRef.current.style.top  = my.current + 'px';
      }

      const theme = document.documentElement.getAttribute('data-theme');
      if (theme !== 'luminus') {
        const now = Date.now();
        if (now - lastParticle > 32) {
          lastParticle = now;
          spawnParticle(mx.current, my.current);
        }
      }
    }

    function spawnParticle(x, y) {
      const p = document.createElement('div');
      p.className = 'gp';
      const s = Math.random() * 3 + 1.2;
      const c = gColors[Math.floor(Math.random() * gColors.length)];
      const ox = (Math.random() - .5) * 18, oy = (Math.random() - .5) * 18;
      const d  = Math.random() * 280 + 300;
      p.style.cssText = `left:${x+ox}px;top:${y+oy}px;width:${s}px;height:${s}px;background:${c};box-shadow:0 0 ${s*3}px ${c};animation-duration:${d}ms`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), d + 60);
    }

    rx.current = window.innerWidth  / 2;
    ry.current = window.innerHeight / 2;

    /* ── Hover detection ── */
    function onEnterClickable() {
      ringRef.current?.classList.add('hovering');
    }
    function onLeaveClickable() {
      ringRef.current?.classList.remove('hovering');
    }
    function onMouseDown() {
      ringRef.current?.classList.add('clicking');
    }
    function onMouseUp() {
      ringRef.current?.classList.remove('clicking');
    }

    function updateClickableListeners() {
      document.querySelectorAll('a, button, [role="button"], [tabindex]').forEach(el => {
        el.addEventListener('mouseenter', onEnterClickable);
        el.addEventListener('mouseleave', onLeaveClickable);
      });
    }

    /* ── Ring lerp & Trail ── */
    let raf;
    function lerpRing() {
      rx.current += (mx.current - rx.current) * .11;
      ry.current += (my.current - ry.current) * .11;
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + 'px';
        ringRef.current.style.top  = ry.current + 'px';
      }

      const theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'luminus') {
        let pts = [...trailPos.current];
        pts.unshift({x: mx.current, y: my.current});
        pts.pop();
        trailPos.current = pts;

        trailRefs.current.forEach((ref, idx) => {
          if (ref) {
            ref.style.left = pts[idx].x + 'px';
            ref.style.top = pts[idx].y + 'px';
            ref.style.opacity = 0.25 / (idx + 1);
          }
        });
      } else {
        trailRefs.current.forEach((ref) => {
          if (ref) ref.style.opacity = 0;
        });
      }

      raf = requestAnimationFrame(lerpRing);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup',   onMouseUp);
    raf = requestAnimationFrame(lerpRing);
    updateClickableListeners();

    // Re-scan for new clickable elements periodically
    const scanInterval = setInterval(updateClickableListeners, 2000);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup',   onMouseUp);
      cancelAnimationFrame(raf);
      clearInterval(scanInterval);
      document.body.classList.remove('has-cursor');
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      {[0, 1, 2, 3, 4].map(i => (
        <div 
          key={i} 
          ref={el => trailRefs.current[i] = el} 
          className="cursor-trail" 
          aria-hidden="true" 
        />
      ))}
    </>
  );
}

