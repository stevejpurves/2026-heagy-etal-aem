/**
 * Renders `award` nodes from the `award` directive (see award.mjs).
 *
 * The card takes the site's brand color (`--site-primary`, set under Website & Design), falling
 * back to the Applied Geophysics navy, with a gold medal for the celebration: a light tint of that
 * color on light pages, and a card in that color on dark pages.
 *
 * The theme loads this module in the browser after the page has rendered, so there is no space
 * held for the award: it opens vertically into place (a grid row from 0fr to 1fr), then the
 * medal pops in and a shine crosses the card. Reduced-motion users get it without animation.
 */
const CSS = `
.cn-award {
  --cn-award-primary: var(--site-primary, #0d2443);
  --cn-award-gold: #e8b64c;
  display: grid;
  grid-template-rows: 1fr;
  margin: 1.75rem 0;
  animation: cn-award-open 750ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.cn-award-clip { min-height: 0; overflow: hidden; }
.cn-award-pad { padding: 2px; }
/* light pages: a light card tinted with the site color and a little gold */
.cn-award-card {
  --cn-award-dot-a: rgb(232 182 76 / 0.7);
  --cn-award-dot-b: color-mix(in oklab, var(--cn-award-primary) 30%, transparent);
  --cn-award-shine: rgb(255 255 255 / 0.7);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius, 0.625rem);
  border: 1px solid color-mix(in oklab, var(--cn-award-primary) 16%, transparent);
  color: var(--foreground, #0d2443);
  background:
    radial-gradient(120% 160% at 100% 100%, color-mix(in oklab, var(--cn-award-gold) 14%, transparent) 0%, transparent 60%),
    linear-gradient(135deg, color-mix(in oklab, var(--cn-award-primary) 7%, #fff), color-mix(in oklab, var(--cn-award-primary) 3%, #fff));
  animation: cn-award-rise 600ms 120ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
/* dark pages: the card in the site color */
.dark .cn-award-card {
  --cn-award-dot-a: rgb(232 182 76 / 0.55);
  --cn-award-dot-b: rgb(255 255 255 / 0.3);
  --cn-award-shine: rgb(255 255 255 / 0.16);
  border-color: color-mix(in oklab, var(--cn-award-gold) 35%, transparent);
  color: #fff;
  background:
    radial-gradient(120% 160% at 0% 0%, color-mix(in oklab, var(--cn-award-primary) 75%, #fff) 0%, transparent 55%),
    linear-gradient(135deg, var(--cn-award-primary), color-mix(in oklab, var(--cn-award-primary) 80%, #000));
}
/* scattered confetti on the right of the card */
.cn-award-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(circle at 78% 22%, var(--cn-award-dot-a) 0 2px, transparent 3px),
    radial-gradient(circle at 88% 64%, var(--cn-award-dot-b) 0 1.5px, transparent 2.5px),
    radial-gradient(circle at 70% 78%, var(--cn-award-dot-a) 0 1.5px, transparent 2.5px),
    radial-gradient(circle at 94% 30%, var(--cn-award-dot-b) 0 2px, transparent 3px),
    radial-gradient(circle at 83% 88%, var(--cn-award-dot-b) 0 1px, transparent 2px),
    radial-gradient(circle at 64% 14%, var(--cn-award-dot-b) 0 1px, transparent 2px);
}
/* one shine across the card once it has opened */
.cn-award-card::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(105deg, transparent 35%, var(--cn-award-shine) 50%, transparent 65%);
  transform: translateX(-100%);
  animation: cn-award-shine 1100ms 700ms ease-in-out both;
}
.cn-award-medal {
  position: relative;
  flex: none;
  width: 52px;
  height: 60px;
  animation: cn-award-pop 520ms 420ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.cn-award-medal::before {
  content: '';
  position: absolute;
  inset: 8px -10px -6px;
  border-radius: 9999px;
  background: radial-gradient(closest-side, rgb(232 182 76 / 0.45), transparent);
  z-index: -1;
}
.cn-award-medal svg { display: block; width: 100%; height: 100%; overflow: visible; }
.cn-award-strap-a { fill: var(--cn-award-primary); }
.cn-award-strap-b { fill: color-mix(in oklab, var(--cn-award-primary) 55%, #fff); }
.dark .cn-award-strap-a { fill: rgb(255 255 255 / 0.92); }
.dark .cn-award-strap-b { fill: #c9d6ee; }
.cn-award-sparkle {
  position: absolute;
  width: 10px;
  height: 10px;
  color: var(--cn-award-gold);
  animation: cn-award-twinkle 900ms both;
}
.cn-award-text { min-width: 0; }
.cn-award-eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #a06c14;
}
.cn-award-title {
  margin: 0.15rem 0 0.25rem;
  font-family: var(--font-heading, inherit);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--cn-award-primary);
}
.cn-award-meta { font-size: 0.925rem; line-height: 1.45; color: var(--muted-foreground, #4b5563); }
.cn-award-meta strong { font-weight: 600; color: var(--foreground, #0d2443); }
.cn-award-body { margin-top: 0.5rem; font-size: 0.925rem; line-height: 1.5; }
.dark .cn-award-eyebrow { color: var(--cn-award-gold); }
.dark .cn-award-title, .dark .cn-award-meta strong { color: #fff; }
.dark .cn-award-meta { color: rgb(255 255 255 / 0.78); }
.dark .cn-award-body { color: rgb(255 255 255 / 0.85); }
.cn-award-body p { margin: 0.25rem 0; }
.cn-award-body a { color: inherit; text-decoration: underline; text-underline-offset: 2px; }
@media (max-width: 480px) {
  .cn-award-card { gap: 1rem; padding: 1rem 1.1rem; }
  .cn-award-medal { width: 42px; height: 48px; }
  .cn-award-title { font-size: 1.1rem; }
}
@keyframes cn-award-open {
  from { grid-template-rows: 0fr; margin-block: 0; opacity: 0; }
  to { grid-template-rows: 1fr; margin-block: 1.75rem; opacity: 1; }
}
@keyframes cn-award-rise {
  from { transform: translateY(-10px) scale(0.98); }
  to { transform: none; }
}
@keyframes cn-award-pop {
  from { transform: scale(0.4) rotate(-18deg); opacity: 0; }
  to { transform: none; opacity: 1; }
}
@keyframes cn-award-shine {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}
@keyframes cn-award-twinkle {
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1.25) rotate(45deg); opacity: 1; }
  100% { transform: scale(1) rotate(90deg); opacity: 0.85; }
}
@media (prefers-reduced-motion: reduce) {
  .cn-award, .cn-award-card, .cn-award-medal, .cn-award-sparkle { animation: none; }
  .cn-award-card::after { display: none; }
}
`;

const SPARKLES = [
  { top: '2px', left: '-6px', delay: '800ms', size: '9px' },
  { top: '18px', right: '-8px', delay: '950ms', size: '11px' },
  { bottom: '2px', left: '-4px', delay: '1100ms', size: '7px' },
];

export default function ASTRenderer({ React, ASTComponent }) {
  const { createElement: h, useId } = React;

  function Medal() {
    const id = `cn-award-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    return h(
      'svg',
      { viewBox: '0 0 48 56', 'aria-hidden': true },
      h(
        'defs',
        null,
        h(
          'linearGradient',
          { id, x1: '0', y1: '0', x2: '1', y2: '1' },
          h('stop', { offset: '0%', stopColor: '#fbe39a' }),
          h('stop', { offset: '55%', stopColor: '#e8b64c' }),
          h('stop', { offset: '100%', stopColor: '#c58a22' }),
        ),
      ),
      h('polygon', { className: 'cn-award-strap-a', points: '11,2 19,2 27,24 19,24' }),
      h('polygon', { className: 'cn-award-strap-b', points: '37,2 29,2 21,24 29,24' }),
      h('circle', { cx: 24, cy: 38, r: 15, fill: `url(#${id})` }),
      h('circle', {
        cx: 24,
        cy: 38,
        r: 11.5,
        fill: 'none',
        stroke: '#fff3c4',
        strokeWidth: 1.25,
        opacity: 0.75,
      }),
      h('polygon', {
        points:
          '24,31 25.71,35.65 30.66,35.84 26.76,38.9 28.11,43.66 24,40.9 19.89,43.66 21.24,38.9 17.34,35.84 22.29,35.65',
        fill: '#fff7d6',
      }),
    );
  }

  function Sparkle({ style }) {
    const { delay, size, ...position } = style;
    return h(
      'svg',
      {
        className: 'cn-award-sparkle',
        viewBox: '0 0 10 10',
        'aria-hidden': true,
        style: { ...position, width: size, height: size, animationDelay: delay },
      },
      h('path', {
        d: 'M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8 Z',
        fill: 'currentColor',
      }),
    );
  }

  function Award({ node, className }) {
    const hasContent = Array.isArray(node.content) && node.content.length > 0;
    return h(
      'aside',
      {
        className: ['cn-award', 'not-prose', className].filter(Boolean).join(' '),
        'aria-label': `Award: ${node.title}`,
      },
      h('style', null, CSS),
      h(
        'div',
        { className: 'cn-award-clip' },
        h(
          'div',
          { className: 'cn-award-pad' },
          h(
            'div',
            { className: 'cn-award-card' },
            h(
              'div',
              { className: 'cn-award-medal' },
              h(Medal),
              ...SPARKLES.map((style, i) => h(Sparkle, { key: i, style })),
            ),
            h(
              'div',
              { className: 'cn-award-text' },
              h('div', { className: 'cn-award-eyebrow' }, 'Award'),
              h('div', { className: 'cn-award-title' }, node.title),
              (node.recipient || node.event) &&
                h(
                  'div',
                  { className: 'cn-award-meta' },
                  node.recipient && h('strong', null, node.recipient),
                  node.recipient && node.event && ' · ',
                  node.event,
                ),
              hasContent &&
                h('div', { className: 'cn-award-body' }, h(ASTComponent, { ast: node.content })),
            ),
          ),
        ),
      ),
    );
  }

  return { award: Award };
}
