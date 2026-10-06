import { useEffect, useRef } from 'react';

// The name is built from thousands of dots. They spring back to place when the
// cursor leaves, and they drift apart as you scroll past the hero.
export default function ParticleName({ lines, reduced }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const c = canvasRef.current;
    const g = c.getContext('2d');
    if (!g) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, P = [], raf = 0, dead = false, resizeT = 0;
    const m = { x: -999, y: -999 };

    function build() {
      W = wrap.clientWidth;
      const fs = Math.min(128, Math.max(56, W / 3.6));
      H = Math.round(fs * lines.length * 1.02 + 16);
      c.width = W * dpr; c.height = H * dpr; c.style.height = H + 'px';
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const off = document.createElement('canvas');
      off.width = W; off.height = H;
      const o = off.getContext('2d');
      if (!o) return;
      o.fillStyle = '#000';
      o.font = `600 ${fs}px "Bricolage Grotesque", "Segoe UI", sans-serif`;
      o.textBaseline = 'alphabetic';
      lines.forEach((l, i) => o.fillText(l, 0, fs * (i + 0.86)));
      const data = o.getImageData(0, 0, W, H).data;
      const step = W < 520 ? 4 : 3;
      P = [];
      for (let y = 0; y < H; y += step)
        for (let x = 0; x < W; x += step)
          if (data[(y * W + x) * 4 + 3] > 128)
            P.push({
              x: Math.random() * W, y: Math.random() * H, tx: x, ty: y, vx: 0, vy: 0,
              rx: Math.random() - 0.5, ry: Math.random(),
            });
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      const sp = Math.min(1, window.scrollY / (window.innerHeight * 0.65));
      g.clearRect(0, 0, W, H);
      if (sp >= 1) return;
      g.globalAlpha = 1 - sp * sp;
      g.fillStyle = '#f2f0ea';
      const ox = sp, size = W < 520 ? 2.4 : 2;
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const tx = p.tx + ox * p.rx * 420;
        const ty = p.ty - sp * (80 + p.ry * 260);
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy);
        if (d < 80) { const f = ((80 - d) / 80) * 7; p.vx += (dx / (d + 0.1)) * f; p.vy += (dy / (d + 0.1)) * f; }
        p.vx += (tx - p.x) * 0.045; p.vy += (ty - p.y) * 0.045;
        p.vx *= 0.84; p.vy *= 0.84;
        p.x += p.vx; p.y += p.vy;
        g.fillRect(p.x, p.y, size, size);
      }
    }

    const setPointer = (e) => {
      const r = c.getBoundingClientRect();
      const t = e.touches ? e.touches[0] : e;
      m.x = t.clientX - r.left; m.y = t.clientY - r.top;
    };
    const clearPointer = () => { m.x = -999; m.y = -999; };
    c.addEventListener('pointermove', setPointer);
    c.addEventListener('pointerleave', clearPointer);
    c.addEventListener('pointerup', clearPointer);

    const start = () => { if (!dead) { build(); frame(); } };
    if (document.fonts?.load) document.fonts.load('600 100px "Bricolage Grotesque"').then(start, start);
    else start();

    const ro = new ResizeObserver(() => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => { if (!dead && W && wrap.clientWidth !== W) build(); }, 150);
    });
    ro.observe(wrap);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeT);
      ro.disconnect();
      c.removeEventListener('pointermove', setPointer);
      c.removeEventListener('pointerleave', clearPointer);
      c.removeEventListener('pointerup', clearPointer);
    };
  }, [lines, reduced]);

  return (
    <div ref={wrapRef} className="w-full">
      <h1 className="sr-only">{lines.join(' ')}</h1>
      {reduced ? (
        <p aria-hidden="true" className="font-display text-6xl font-semibold leading-none sm:text-8xl">
          {lines.map((l) => <span key={l} className="block">{l}</span>)}
        </p>
      ) : (
        <canvas ref={canvasRef} aria-hidden="true" className="block w-full touch-pan-y" />
      )}
    </div>
  );
}
