import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { setLenis } from './lib/scroll.js';
import { useReducedMotion } from './hooks/useReducedMotion.js';
import Navbar from './components/Navbar.jsx';
import SideDots from './components/SideDots.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Admin from './components/Admin.jsx';

export default function App() {
  const reduced = useReducedMotion();
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const on = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  // Inertia scroll: the page keeps gliding a moment after you stop.
  useEffect(() => {
    if (reduced || route === '#/admin') return;
    const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9, touchMultiplier: 1.2 });
    setLenis(lenis);
    let raf = 0;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); setLenis(null); };
  }, [reduced, route]);

  if (route === '#/admin') return <Admin />;

  return (
    <>
      <Navbar />
      <SideDots />
      <main>
        <Hero reduced={reduced} />
        <About reduced={reduced} />
        <Skills reduced={reduced} />
        <Projects reduced={reduced} />
        <Contact reduced={reduced} />
      </main>
      <Footer />
    </>
  );
}
