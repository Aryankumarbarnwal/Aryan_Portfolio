import { useEffect, useState } from 'react';
import { scrollToId } from '../lib/scroll.js';

const ids = [['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['contact', 'Contact']];

export default function SideDots() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    ids.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="Sections" className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {ids.map(([id, label]) => (
        <button
          key={id}
          onClick={() => scrollToId(id)}
          aria-label={label}
          aria-current={active === id}
          className={`h-2 w-2 rounded-full transition-all duration-500 ${active === id ? 'scale-150 bg-sky' : 'bg-paper/30 hover:bg-paper/60'}`}
        />
      ))}
    </nav>
  );
}
