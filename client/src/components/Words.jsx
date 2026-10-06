// Words slide up out of a mask, driven by the CSS variable --p of the
// nearest ancestor (see useProgressVar). `start` shifts the stagger.
export default function Words({ text, start = 0, step = 0.012, className = '' }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.18em', marginBottom: '-0.18em' }}
        >
          <span
            className="inline-block"
            style={{
              '--d': (start + i * step).toFixed(3),
              transform:
                'translateY(calc((1 - clamp(0, (var(--p, 0) - var(--d)) * 4, 1)) * 115%))',
            }}
          >
            {w}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}
