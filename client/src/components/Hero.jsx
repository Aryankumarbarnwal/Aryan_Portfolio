import ParticleName from './ParticleName.jsx';
import ScrambleText from './ScrambleText.jsx';
import Avatar3D from './Avatar3D.jsx';
import { profile } from '../data/profile.js';
import { scrollToId } from '../lib/scroll.js';

export default function Hero({ reduced }) {
  return (
    <section id="home" className="relative overflow-hidden pb-12 pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-2">
        <div>
          <p className="mb-4 h-7 text-lg text-sky"><ScrambleText words={profile.roles} reduced={reduced} /></p>
          <ParticleName lines={profile.nameLines} reduced={reduced} />
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/70">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => scrollToId('projects')} className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5">
              See my projects
            </button>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="rounded-full border border-paper/25 px-6 py-3 text-sm font-medium transition-colors hover:border-paper/60">
              Open resume
            </a>
          </div>
        </div>
        <Avatar3D reduced={reduced} />
      </div>

      <dl className="mx-auto mt-10 grid max-w-6xl gap-6 border-t border-paper/10 px-6 pt-6 sm:grid-cols-3">
        {profile.stats.map((s) => (
          <div key={s.label}>
            <dt className="font-display text-2xl font-semibold">{s.value}</dt>
            <dd className="mt-1 text-sm text-paper/60">{s.label}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-xs text-paper/40">scroll</span>
        <span className="block h-8 w-px bg-paper/60" style={{ animation: 'cue 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
