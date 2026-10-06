import { useEffect, useMemo, useRef, useState } from 'react';
import { getProjects } from '../lib/api.js';
import { lockScroll, unlockScroll } from '../lib/scroll.js';
import { useInView } from '../hooks/useInView.js';
import Reveal from './Reveal.jsx';

const covers = ['#2b4c9b', '#1d3a7c', '#3d63b8', '#16306b'];
// Each card flies in from a different side and angle.
const fan = [
  { x: -90, y: 70, r: -9 },
  { x: 0, y: 110, r: 4 },
  { x: 90, y: 70, r: 9 },
];

function Links({ p, className = '' }) {
  return (
    <div className={`flex gap-4 text-sm ${className}`}>
      {p.github && <a href={p.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper">Code</a>}
      {p.live && <a href={p.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper">Live site</a>}
    </div>
  );
}

function Card({ p, i, onOpen, reduced }) {
  const ref = useRef(null);
  const tilt = useRef(null);
  const seen = useInView(ref, { threshold: 0.12 });
  const on = reduced || seen;
  const f = fan[i % 3];
  const delay = (i % 3) * 110;

  const move = (e) => {
    if (reduced) return;
    const r = tilt.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    tilt.current.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg) translateZ(0)`;
  };
  const leave = () => { if (tilt.current) tilt.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'; };

  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'none' : `translate(${f.x}px, ${f.y}px) rotate(${f.r}deg)`,
        transition: `transform 1.1s cubic-bezier(.2,.9,.2,1) ${delay}ms, opacity .7s ease ${delay}ms`,
      }}
    >
      <article
        ref={tilt}
        role="button"
        tabIndex={0}
        onClick={() => onOpen(p)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(p); } }}
        onPointerMove={move}
        onPointerLeave={leave}
        className="group h-full cursor-pointer overflow-hidden rounded-3xl border border-paper/10 bg-navy text-left"
        style={{ transition: 'transform .25s ease-out' }}
      >
        <div className="relative aspect-[16/10] overflow-hidden" style={{ background: covers[i % covers.length] }}>
          {p.image ? (
            <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <span className="absolute -bottom-6 left-4 font-display text-[9rem] font-semibold leading-none text-paper/15">{(p.title || '?')[0]}</span>
          )}
          {/* {p.sample && <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-brass"></span>} */}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-paper/65">{p.description}</p>
          {p.tags?.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => <li key={t} className="rounded-full bg-paper/10 px-3 py-1 text-xs text-paper/80">{t}</li>)}
            </ul>
          )}
          <Links p={p} className="mt-5" />
        </div>
      </article>
    </div>
  );
}

function Modal({ p, onClose }) {
  useEffect(() => {
    lockScroll();
    const key = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('keydown', key); unlockScroll(); };
  }, [onClose]);
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setShown(true)); return () => cancelAnimationFrame(t); }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center" onClick={onClose} role="dialog" aria-modal="true" aria-label={p.title}>
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" style={{ opacity: shown ? 1 : 0, transition: 'opacity .3s' }} />
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-paper/15 bg-navy p-7"
        style={{ transform: shown ? 'none' : 'translateY(40px) scale(.96)', opacity: shown ? 1 : 0, transition: 'transform .5s cubic-bezier(.2,.9,.2,1), opacity .3s' }}
      >
        <button onClick={onClose} className="absolute right-5 top-5 text-sm text-paper/60 hover:text-paper">Close</button>
        <h3 className="pr-16 text-3xl font-semibold">{p.title}</h3>
        {p.tags?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="rounded-full bg-paper/10 px-3 py-1 text-xs">{t}</li>)}</ul>
        )}
        {p.image && <img src={p.image} alt="" className="mt-6 w-full rounded-2xl" />}
        <p className="mt-6 whitespace-pre-line leading-relaxed text-paper/80">{p.longDescription || p.description}</p>
        {p.images?.map((src) => <img key={src} src={src} alt="" loading="lazy" className="mt-4 w-full rounded-2xl" />)}
        <Links p={p} className="mt-6" />
      </div>
    </div>
  );
}

export default function Projects({ reduced }) {
  const [list, setList] = useState(null);
  const [tag, setTag] = useState('All');
  const [open, setOpen] = useState(null);

  useEffect(() => { getProjects().then(setList); }, []);

  const tags = useMemo(() => ['All', ...new Set((list || []).flatMap((p) => p.tags || []))], [list]);
  const shown = (list || []).filter((p) => tag === 'All' || p.tags?.includes(tag));

  return (
    <section id="projects" className="bg-ink py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal reduced={reduced}>
          <h2 className="text-4xl font-semibold leading-tight sm:text-6xl">Things I have built.</h2>
        </Reveal>

        {tags.length > 2 && (
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                aria-pressed={tag === t}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${tag === t ? 'border-paper bg-paper text-ink' : 'border-paper/25 text-paper/75 hover:border-paper/60'}`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list === null &&
            [0, 1, 2].map((i) => <div key={i} className="aspect-[4/5] rounded-3xl bg-navy" style={{ animation: 'pulse2 1.6s ease-in-out infinite' }} />)}
          {shown.map((p, i) => <Card key={`${tag}-${p.id}`} p={p} i={i} onOpen={setOpen} reduced={reduced} />)}
        </div>

        {list && shown.length === 0 && (
          <p className="mt-10 text-paper/60">No projects here yet. New ones show up as soon as they are added.</p>
        )}
      </div>
      {open && <Modal p={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
