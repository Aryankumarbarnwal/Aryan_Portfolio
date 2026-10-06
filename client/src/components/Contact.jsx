import { useRef } from 'react';
import { useProgressVar } from '../hooks/useScrollProgress.js';
import Words from './Words.jsx';
import { profile } from '../data/profile.js';

export default function Contact({ reduced }) {
  const ref = useRef(null);
  const btn = useRef(null);
  useProgressVar(ref, { from: 1, span: 0.9, reduced });

  const move = (e) => {
    if (reduced) return;
    const r = btn.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    btn.current.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
  };
  const leave = () => { btn.current.style.transform = 'translate(0,0)'; };

  const heading = 'Hiring, or have a project in mind? Let us talk.';
  const others = [
    ['GitHub', profile.github],
    ['LinkedIn', profile.linkedin],
    ['LeetCode', profile.leetcode],
    ['Resume', profile.resume],
  ].filter(([, href]) => href);

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-suit"
        style={{ clipPath: 'circle(calc(var(--p, 0) * 160%) at 50% 100%)' }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-32">
        <h2 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
          <Words text={heading} step={0.03} />
        </h2>

        <div className="mt-14 flex flex-wrap items-center gap-8">
          <div onPointerMove={move} onPointerLeave={leave} className="-m-6 p-6">
            <a
              ref={btn}
              href={`mailto:${profile.email}`}
              className="inline-block rounded-full bg-paper px-8 py-4 text-base font-medium text-ink"
              style={{ transition: 'transform .3s cubic-bezier(.2,.9,.2,1)' }}
            >
              {profile.email}
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base">
            {others.map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="underline decoration-paper/40 underline-offset-4 hover:decoration-paper">{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
