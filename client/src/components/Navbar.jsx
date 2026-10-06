import { useEffect, useRef, useState } from 'react';
import { scrollToId } from '../lib/scroll.js';
import { profile } from '../data/profile.js';

const links = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['contact', 'Contact'],
];

export default function Navbar() {
  const bar = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);

  const go = (id) => { setOpen(false); scrollToId(id); };

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-ink/70 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <button onClick={() => go('home')} className="font-display text-base font-semibold">{profile.name}</button>
        <ul className="hidden gap-7 text-sm text-paper/70 md:flex">
          {links.map(([id, label]) => (
            <li key={id}><button onClick={() => go(id)} className="transition-colors hover:text-paper">{label}</button></li>
          ))}
        </ul>
        <button className="text-sm md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <ul className="border-t border-paper/10 px-6 pb-4 md:hidden">
          {links.map(([id, label]) => (
            <li key={id}><button onClick={() => go(id)} className="block w-full py-3 text-left text-paper/80">{label}</button></li>
          ))}
        </ul>
      )}
      <div ref={bar} className="h-0.5 origin-left bg-sky" style={{ transform: 'scaleX(0)' }} />
    </header>
  );
}
