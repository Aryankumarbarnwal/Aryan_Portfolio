import { useRef } from 'react';
import { useInView } from '../hooks/useInView.js';

// variant "mask": content slides up out of a clipped box
// variant "wipe": content is uncovered from left to right
export default function Reveal({ variant = 'mask', delay = 0, reduced, className = '', children }) {
  const ref = useRef(null);
  const seen = useInView(ref, { threshold: 0.1 });
  const on = reduced || seen;
  const ease = 'cubic-bezier(.2,.9,.2,1)';

  if (variant === 'wipe') {
    // The observed box (outer) is never clipped, only the inner one is.
    // Observing a clipped element would never report it as visible.
    return (
      <div ref={ref} className={className}>
        <div
          style={{
            clipPath: on ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
            transition: `clip-path 1s ${ease} ${delay}ms`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        style={{
          transform: on ? 'translateY(0)' : 'translateY(105%)',
          transition: `transform 1s ${ease} ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}