import { useEffect, useRef, useState } from 'react';

/*
  Avatar
  1. If you add a file at client/public/avatar.png (transparent background
     works best), the site uses it and it tilts in 3D toward your cursor.
  2. Otherwise it shows a blocky 3D character built from CSS that really
     turns 360 degrees. Drag sideways to spin it yourself.
*/

const skin = ['#E2AA85', '#C98F69', '#CF9670', '#CF9670', '#E8B592', '#B67A55'];
const hair = '#1b1511';
const beard = '#2a1d15';

function faces(w, h, d) {
  return [
    { l: 0, t: 0, w, h, tf: `translateZ(${d / 2}px)` },
    { l: 0, t: 0, w, h, tf: `rotateY(180deg) translateZ(${d / 2}px)` },
    { l: (w - d) / 2, t: 0, w: d, h, tf: `rotateY(90deg) translateZ(${w / 2}px)` },
    { l: (w - d) / 2, t: 0, w: d, h, tf: `rotateY(-90deg) translateZ(${w / 2}px)` },
    { l: 0, t: (h - d) / 2, w, h: d, tf: `rotateX(90deg) translateZ(${h / 2}px)` },
    { l: 0, t: (h - d) / 2, w, h: d, tf: `rotateX(-90deg) translateZ(${h / 2}px)` },
  ];
}

function Box({ w, h, d, colors, extra = {} }) {
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, transformStyle: 'preserve-3d' }}>
      {faces(w, h, d).map((f, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', left: f.l, top: f.t, width: f.w, height: f.h,
            background: colors[i], transform: f.tf, backfaceVisibility: 'hidden',
          }}
        >
          {extra[i]}
        </div>
      ))}
    </div>
  );
}

function Part({ x, y, w, h, d, colors, extra, anim }) {
  return (
    <div
      style={{
        position: 'absolute', left: x - w / 2, top: y, width: w, height: h,
        transformStyle: 'preserve-3d', transformOrigin: '50% 0',
        animation: anim ? `${anim} 3s ease-in-out infinite` : undefined,
      }}
    >
      <Box w={w} h={h} d={d} colors={colors} extra={extra} />
    </div>
  );
}

const band = (h, color, pos = 'bottom') => (
  <div style={{ position: 'absolute', left: 0, width: '100%', height: h, background: color, [pos]: 0 }} />
);
const dot = (t) => (
  <span style={{ position: 'absolute', left: '50%', top: t, width: 3, height: 3, marginLeft: -1.5, borderRadius: '50%', background: '#9aa3b8' }} />
);

function Character() {
  const suit = ['#27499a', '#1d3a7c', '#1d3a7c', '#1d3a7c', '#3d63b8', '#12275a'];
  const pants = ['#1e2b58', '#17224a', '#17224a', '#17224a', '#2a3a70', '#3a281e'];
  const sleeve = [suit[0], suit[1], suit[2], suit[3], suit[4], skin[5]];
  const hand = { 0: band(12, skin[0]), 1: band(12, skin[1]), 2: band(12, skin[2]), 3: band(12, skin[3]) };
  const shoe = { 0: band(9, '#1c140f'), 1: band(9, '#1c140f'), 2: band(9, '#1c140f'), 3: band(9, '#1c140f') };

  const headFront = (
    <>
      <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 12, background: hair }} />
      <span style={{ position: 'absolute', left: 9, top: 19, width: 6, height: 6, background: '#17110d' }} />
      <span style={{ position: 'absolute', right: 9, top: 19, width: 6, height: 6, background: '#17110d' }} />
      <span style={{ position: 'absolute', left: 8, top: 15, width: 8, height: 2, background: hair }} />
      <span style={{ position: 'absolute', right: 8, top: 15, width: 8, height: 2, background: hair }} />
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 20, background: beard }} />
      <span style={{ position: 'absolute', left: 14, bottom: 8, width: 16, height: 4, background: '#f4efe6' }} />
    </>
  );
  const headSide = (
    <>
      <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 12, background: hair }} />
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '55%', height: 20, background: beard }} />
    </>
  );
  const torsoFront = (
    <>
      <div style={{ position: 'absolute', left: '50%', top: 0, width: 18, height: '88%', marginLeft: -9, background: '#f3f1ea' }} />
      {dot(14)}{dot(30)}{dot(46)}
      {band(8, '#0d0d10')}
      <span style={{ position: 'absolute', left: '50%', bottom: 1, width: 9, height: 6, marginLeft: -4.5, background: '#aab2c4' }} />
    </>
  );

  return (
    <>
      <Part x={0} y={-8} w={47} h={10} d={47} colors={[hair, hair, hair, hair, hair, hair]} />
      <Part x={0} y={0} w={44} h={44} d={44}
        colors={[skin[0], hair, skin[2], skin[3], hair, skin[5]]}
        extra={{ 0: headFront, 2: headSide, 3: headSide }} />
      <Part x={0} y={42} w={16} h={6} d={16} colors={skin} />
      <Part x={0} y={46} w={54} h={70} d={28} colors={suit} extra={{ 0: torsoFront }} />
      <Part x={-37} y={46} w={18} h={66} d={18} colors={sleeve} extra={hand} anim="swA" />
      <Part x={37} y={46} w={18} h={66} d={18} colors={sleeve} extra={hand} anim="swB" />
      <Part x={-13} y={116} w={26} h={76} d={26} colors={pants} extra={shoe} anim="swB" />
      <Part x={13} y={116} w={26} h={76} d={26} colors={pants} extra={shoe} anim="swA" />
    </>
  );
}

function Spinner({ reduced }) {
  const fig = useRef(null);
  const stage = useRef(null);
  useEffect(() => {
    let ang = 25, drag = false, lx = 0, raf = 0;
    const el = stage.current;
    const down = (e) => { drag = true; lx = e.clientX; el.setPointerCapture?.(e.pointerId); };
    const move = (e) => { if (drag) { ang += (e.clientX - lx) * 0.8; lx = e.clientX; } };
    const up = () => { drag = false; };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    const tick = () => {
      if (!drag && !reduced) ang += 0.7;
      if (fig.current) fig.current.style.transform = `scale(1.3) rotateX(-6deg) rotateY(${ang}deg)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, [reduced]);

  return (
    <div ref={stage} className="relative mx-auto h-[360px] w-full max-w-sm cursor-grab touch-pan-y select-none active:cursor-grabbing" style={{ perspective: 900 }} aria-label="3D avatar, drag sideways to rotate" role="img">
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-suit/25 blur-3xl" />
      <div className="absolute bottom-6 left-1/2 h-8 w-48 -translate-x-1/2 rounded-full border border-sky/30 bg-navy" />
      <div ref={fig} style={{ position: 'absolute', left: '50%', top: 34, width: 0, height: 0, transformStyle: 'preserve-3d' }}>
        <Character />
      </div>
      <p className="absolute inset-x-0 bottom-0 text-center text-xs text-paper/40">drag to rotate</p>
    </div>
  );
}

function PhotoAvatar() {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 22}deg) rotateX(${-y * 14}deg)`;
  };
  const leave = () => { ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0)'; };
  return (
    <div className="relative mx-auto max-w-sm" onPointerMove={move} onPointerLeave={leave}>
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-suit/30 blur-3xl" />
      <div ref={ref} style={{ transition: 'transform .25s ease-out' }}>
        <img src="/avatar.png" alt="Aryan Kumar" className="relative mx-auto max-h-[420px] w-auto" style={{ animation: 'floaty 6s ease-in-out infinite' }} />
      </div>
    </div>
  );
}

export default function Avatar3D({ reduced }) {
  const [mode, setMode] = useState('3d');
  useEffect(() => {
    const img = new Image();
    img.onload = () => setMode('photo');
    img.onerror = () => setMode('3d');
    img.src = '/avatar.png';
  }, []);
  return mode === 'photo' ? <PhotoAvatar /> : <Spinner reduced={reduced} />;
}
