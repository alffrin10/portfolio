import { useEffect, useRef, useCallback } from 'react';

export default function ProjectThumb({ type, theme }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const rafRef = useRef(null);

  const isVoid = theme !== 'luminus';
  const accent  = isVoid ? 'rgba(255,255,255,' : 'rgba(203,166,247,';
  const accent2 = isVoid ? 'rgba(200,200,200,' : 'rgba(137,180,250,';

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const t = frameRef.current * .016;
    frameRef.current++;

    if (type === 'radar') {
      const cx = W/2, cy = H/2, r = 70;
      [r, r*.65, r*.35].forEach((rr, i) => {
        ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI*2);
        ctx.strokeStyle = `${accent}${.18 - i*.05})`; ctx.lineWidth = .8; ctx.stroke();
      });
      ctx.strokeStyle = `${accent}.08)`; ctx.lineWidth = .5;
      ctx.beginPath(); ctx.moveTo(cx-r, cy); ctx.lineTo(cx+r, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy-r); ctx.lineTo(cx, cy+r); ctx.stroke();
      const ang = t * .8;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
      ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,r,0,.5,false); ctx.closePath();
      const g = ctx.createRadialGradient(0,0,0,0,0,r);
      g.addColorStop(0, `${accent}.35)`); g.addColorStop(1, `${accent}0)`);
      ctx.fillStyle = g; ctx.fill(); ctx.restore();
      const bx = cx + Math.cos(ang-1)*r*.7, by = cy + Math.sin(ang-1)*r*.7;
      ctx.beginPath(); ctx.arc(bx, by, 2.5, 0, Math.PI*2);
      ctx.fillStyle = `${accent}.8)`; ctx.fill();

    } else if (type === 'gpr') {
      ctx.strokeStyle = `${accent}.55)`; ctx.lineWidth = 1.2;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const yb = H/4 + (i * H/4);
        ctx.moveTo(0, yb);
        for (let x = 0; x < W; x += 2) {
          const sig = Math.sin((x*.06)+t*(1+i*.3))*18*Math.exp(-((x/W-.5)**2)*4) + Math.sin((x*.2)+t*.5+i)*5;
          ctx.lineTo(x, yb+sig);
        }
        ctx.stroke();
        ctx.strokeStyle = `${accent2}${.2 - i*.06})`;
      }
      ctx.strokeStyle = `${accent}.12)`; ctx.lineWidth = .5; ctx.setLineDash([3,5]);
      [H*.25, H*.5, H*.75].forEach(y => {
        ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
      });
      ctx.setLineDash([]);

    } else if (type === 'neural') {
      const layers = [[W*.2,[H*.2,H*.5,H*.8]], [W*.5,[H*.33,H*.67]], [W*.8,[H*.5]]];
      for (let l = 0; l < layers.length-1; l++) {
        layers[l][1].forEach(y1 => {
          layers[l+1][1].forEach(y2 => {
            const pulse = .5 + .5*Math.sin(t*2 + y1*.01);
            ctx.strokeStyle = `${accent}${.06+pulse*.08})`; ctx.lineWidth = .7;
            ctx.beginPath(); ctx.moveTo(layers[l][0],y1); ctx.lineTo(layers[l+1][0],y2); ctx.stroke();
          });
        });
      }
      layers.forEach(([x, ys]) => {
        ys.forEach(y => {
          const pulse = .5 + .5*Math.sin(t*1.5 + x*.02 + y*.01);
          const g = ctx.createRadialGradient(x,y,0,x,y,12);
          g.addColorStop(0, `${accent}${.3+pulse*.3})`); g.addColorStop(1, `${accent}0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x,y,12,0,Math.PI*2); ctx.fill();
          ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2);
          ctx.fillStyle = `${accent}${.6+pulse*.3})`; ctx.fill();
        });
      });

    } else if (type === 'hex') {
      const S = 22, sw = S*Math.sqrt(3), sh = S*1.5;
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const ox = (row%2)*sw/2;
          const hx = col*sw + ox - sw/2, hy = row*sh - sh/2;
          const dist = Math.sqrt((hx-W/2)**2 + (hy-H/2)**2);
          const pulse = .5 + .5*Math.sin(t*.8 - dist*.02);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = Math.PI/3*i - Math.PI/6;
            ctx.lineTo(hx + S*Math.cos(a), hy + S*Math.sin(a));
          }
          ctx.closePath();
          ctx.strokeStyle = `${accent}${.05+pulse*.1})`; ctx.lineWidth = .7; ctx.stroke();
        }
      }
      const cg = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,60);
      cg.addColorStop(0, `${accent}.15)`); cg.addColorStop(1, `${accent}0)`);
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(W/2,H/2,60,0,Math.PI*2); ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [type, accent, accent2]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    cv.width = 225; cv.height = 200;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!rafRef.current) rafRef.current = requestAnimationFrame(draw);
      } else {
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      }
    }, { threshold: 0 });

    observer.observe(cv);
    return () => { observer.disconnect(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: .55
      }}
    />
  );
}

