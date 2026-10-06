import { useRef } from 'react';
import { useProgressVar } from '../hooks/useScrollProgress.js';
import Words from './Words.jsx';
import Reveal from './Reveal.jsx';
import { profile } from '../data/profile.js';

export default function About({ reduced }) {
  const ref = useRef(null);
  useProgressVar(ref, { from: 0.95, span: 0.8, reduced });
  const headWords = profile.aboutHeading.split(' ').length;

  return (
    <section id="about" ref={ref} className="relative bg-ink">
      {/* the paper page opens as a circle as you scroll in */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-paper"
        style={{ clipPath: 'circle(calc(var(--p, 0) * 150%) at 50% 30%)' }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-28 text-ink">
        <h2 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
          <Words text={profile.aboutHeading} step={0.03} />
        </h2>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink/80">
          <Words text={profile.about} start={headWords * 0.03} step={0.008} />
        </p>

        <h3 className="mt-24 text-2xl font-semibold">Where I have worked</h3>
        <ol className="relative mt-8 max-w-2xl border-l border-ink/20 pl-8">
          {profile.experience.map((x, i) => (
            <li key={x.role + x.org} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-suit" />
              <Reveal variant="wipe" delay={i * 120} reduced={reduced}>
                <p className="text-sm text-ink/60">{x.duration}</p>
                <p className="mt-1 font-display text-xl font-semibold">{x.role}</p>
                <p className="text-base text-suit">{x.org}</p>
                <p className="mt-2 max-w-md text-base text-ink/75">{x.note}</p>
                {x.Paid && (
                  <p className="mt-2 max-w-md text-base text-ink/75">Paid: {x.Paid}</p>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
