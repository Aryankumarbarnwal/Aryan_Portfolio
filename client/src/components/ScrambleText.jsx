import { useEffect, useRef, useState } from 'react';

const CHARS = 'abcdefghijklmnopqrstuvwxyz#%&*+=?';

export default function ScrambleText({ words, reduced, hold = 2800 }) {
  const [text, setText] = useState(words[0]);
  const timer = useRef(null);

  useEffect(() => {
    if (reduced) { setText(words[0]); return; }
    let i = 0;
    const run = (target) => {
      clearInterval(timer.current);
      let f = 0;
      timer.current = setInterval(() => {
        let out = '';
        for (let k = 0; k < target.length; k++) {
          out += k < f / 1.5 ? target[k] : target[k] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setText(out);
        f++;
        if (f / 1.5 > target.length) { clearInterval(timer.current); setText(target); }
      }, 35);
    };
    run(words[0]);
    const loop = setInterval(() => { i = (i + 1) % words.length; run(words[i]); }, hold);
    return () => { clearInterval(loop); clearInterval(timer.current); };
  }, [words, reduced, hold]);

  return <span className="font-mono" aria-label={words[0]}>{text}</span>;
}
