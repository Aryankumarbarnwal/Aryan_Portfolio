import { useEffect, useRef, useState } from 'react';
import { profile, levelLabels } from '../data/profile.js';
import Reveal from './Reveal.jsx';

const groupColor = { Building: '#8fb0f0', 'Problem solving': '#e8b86b', 'Still learning': '#b9c2e0' };
const weight = { main: 9, comfortable: 7, core: 6, basics: 5 };

function Constellation({ skills, reduced }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const c = canvas.current;
    const w = wrap.current;
    const g = c.getContext('2d');
    if (!g) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, N = [], raf = 0, last = null;
    const m = { x: -999, y: -999 };

    const init = () => {
      W = w.clientWidth; H = W < 520 ? 320 : 380;
      c.width = W * dpr; c.height = H * dpr; c.style.height = H + 'px';
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      N = skills.map((s) => ({
        ...s, r0: weight[s.level] || 5, r: weight[s.level] || 5,
        x: 40 + Math.random() * (W - 80), y: 30 + Math.random() * (H - 60),
        vx: reduced ? 0 : (Math.random() - 0.5) * 0.5, vy: reduced ? 0 : (Math.random() - 0.5) * 0.5,
      }));
    };

    const draw = () => {
      g.clearRect(0, 0, W, H);
      let nearest = null, best = 1e9;
      for (const a of N) {
        if (!reduced) {
          const dx = m.x - a.x, dy = m.y - a.y, d = Math.hypot(dx, dy);
          if (d < 160) { a.vx += (dx / (d + 1)) * 0.03; a.vy += (dy / (d + 1)) * 0.03; }
          a.x += a.vx; a.y += a.vy; a.vx *= 0.995; a.vy *= 0.995;
          if (a.x < 14 || a.x > W - 14) a.vx *= -1;
          if (a.y < 14 || a.y > H - 14) a.vy *= -1;
        }
        if (d2(a, m) < best) { best = d2(a, m); nearest = a; }
        const near = d2(a, m) < 28 * 28;
        a.r += ((near ? a.r0 + 4 : a.r0) - a.r) * 0.15;
      }
      g.lineWidth = 1;
      for (let i = 0; i < N.length; i++) for (let j = i + 1; j < N.length; j++) {
        const a = N[i], b = N[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        const same = a.group === b.group;
        const lim = same ? 170 : 90;
        if (d < lim) {
          g.globalAlpha = (1 - d / lim) * (same ? 0.55 : 0.25);
          g.strokeStyle = same ? groupColor[a.group] : '#f2f0ea';
          g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke();
        }
      }
      g.globalAlpha = 1;
      g.font = '13px "DM Sans", sans-serif'; g.textAlign = 'center';
      for (const a of N) {
        g.fillStyle = groupColor[a.group] || '#f2f0ea';
        g.beginPath(); g.arc(a.x, a.y, a.r, 0, Math.PI * 2); g.fill();
        g.fillStyle = 'rgba(242,240,234,.85)';
        g.fillText(a.name, a.x, a.y - a.r - 7);
      }
      const hit = nearest && best < 28 * 28 ? nearest.name : null;
      if (hit !== last) { last = hit; setHover(hit); }
    };
    const d2 = (a, p) => (a.x - p.x) ** 2 + (a.y - p.y) ** 2;

    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    init();
    if (reduced) draw(); else loop();

    const pm = (e) => { const r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; if (reduced) draw(); };
    const pl = () => { m.x = -999; m.y = -999; if (reduced) draw(); };
    c.addEventListener('pointermove', pm);
    c.addEventListener('pointerleave', pl);
    let t = 0;
    const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(() => { if (w.clientWidth !== W) { init(); if (reduced) draw(); } }, 150); });
    ro.observe(w);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(t); ro.disconnect();
      c.removeEventListener('pointermove', pm); c.removeEventListener('pointerleave', pl);
    };
  }, [skills, reduced]);

  const info = hover && skills.find((s) => s.name === hover);
  return (
    <div ref={wrap}>
      <canvas ref={canvas} className="block w-full touch-pan-y rounded-2xl bg-ink/40" role="img" aria-label="Interactive map of my skills" />
      <p className="mt-3 h-6 text-sm text-paper/70" aria-live="polite">
        {info ? `${info.name}: ${levelLabels[info.level]}` : 'Move your cursor or finger over the skills.'}
      </p>
    </div>
  );
}

export default function Skills({ reduced }) {
  const groups = [...new Set(profile.skills.map((s) => s.group))];
  return (
    <section id="skills" className="bg-navy py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal reduced={reduced}>
          <h2 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl">What I build with, and what I am still learning.</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Constellation skills={profile.skills} reduced={reduced} />
          <div className="space-y-8">
            {groups.map((gr) => (
              <div key={gr}>
                <h3 className="flex items-center gap-3 text-lg font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: groupColor[gr] || '#f2f0ea' }} />
                  {gr}
                </h3>
                <ul className="mt-3 space-y-1.5 text-paper/75">
                  {profile.skills.filter((s) => s.group === gr).map((s) => (
                    <li key={s.name} className="flex justify-between gap-4 border-b border-paper/10 pb-1.5 text-sm">
                      <span>{s.name}</span>
                      <span className="text-paper/50">{levelLabels[s.level]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
